// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/// @title ArcEscrow
/// @notice A minimal, reusable escrow registry modeled on Arc's
///         "arc-escrow" sample app (docs.arc.io/build/sample-apps/arc-escrow):
///         a depositor locks ERC20 funds for a beneficiary, the beneficiary
///         submits a deliverable, and the agreement is settled by either
///         releasing the funds to the beneficiary or refunding the
///         depositor.
///
///         Unlike Arc's own sample (which deploys a fresh Refund Protocol
///         contract per agreement via the Circle Smart Contract Platform),
///         this contract is deployed once and tracks every agreement in a
///         mapping, which is far cheaper and simpler to operate while
///         preserving the same trust model:
///
///         - Funds are custodied by this contract, not by any EOA.
///         - Settlement (`release` / `refund`) can be triggered by an
///           `agent` address -- meant to be a backend wallet that only
///           acts after an off-chain validation step (e.g. an AI model
///           checking the deliverable against the agreed criteria) -- or
///           directly by the depositor as a manual override.
contract ArcEscrow is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    enum Status {
        None,
        Funded,
        Submitted,
        Released,
        Refunded
    }

    struct Agreement {
        address depositor;
        address beneficiary;
        address token;
        uint256 amount;
        uint256 deadline;
        Status status;
    }

    /// @notice Backend wallet allowed to settle agreements after
    ///         off-chain (e.g. AI) validation. Rotate with `setAgent`.
    address public agent;

    uint256 public nextId = 1;

    mapping(uint256 => Agreement) public agreements;

    event EscrowFunded(
        uint256 indexed id,
        address indexed depositor,
        address indexed beneficiary,
        address token,
        uint256 amount,
        uint256 deadline
    );

    event DeliverableSubmitted(
        uint256 indexed id,
        string deliverableURI
    );

    event EscrowReleased(
        uint256 indexed id,
        address indexed by
    );

    event EscrowRefunded(
        uint256 indexed id,
        address indexed by
    );

    event AgentUpdated(
        address indexed newAgent
    );

    constructor(
        address initialAgent,
        address initialOwner
    ) Ownable(initialOwner) {
        require(
            initialAgent != address(0),
            "Invalid agent"
        );

        agent = initialAgent;
    }

    /// @notice Rotate the backend agent wallet, e.g. after a key
    ///         rotation. Owner-only.
    function setAgent(
        address newAgent
    ) external onlyOwner {
        require(
            newAgent != address(0),
            "Invalid agent"
        );

        agent = newAgent;

        emit AgentUpdated(newAgent);
    }

    /// @notice Create an agreement and lock `amount` of `token` from the
    ///         caller (the depositor) in the same transaction. Caller
    ///         must have approved this contract for at least `amount`
    ///         beforehand.
    function createAndFund(
        address beneficiary,
        address token,
        uint256 amount,
        uint256 deadline
    ) external nonReentrant returns (uint256 id) {
        require(
            beneficiary != address(0),
            "Invalid beneficiary"
        );

        require(
            beneficiary != msg.sender,
            "Beneficiary must differ from depositor"
        );

        require(
            token != address(0),
            "Invalid token"
        );

        require(amount > 0, "Amount must be > 0");

        require(
            deadline > block.timestamp,
            "Deadline must be in the future"
        );

        id = nextId++;

        agreements[id] = Agreement({
            depositor: msg.sender,
            beneficiary: beneficiary,
            token: token,
            amount: amount,
            deadline: deadline,
            status: Status.Funded
        });

        IERC20(token).safeTransferFrom(
            msg.sender,
            address(this),
            amount
        );

        emit EscrowFunded(
            id,
            msg.sender,
            beneficiary,
            token,
            amount,
            deadline
        );
    }

    /// @notice Beneficiary submits proof of work. `deliverableURI` is
    ///         any off-chain pointer (link, IPFS hash, etc) -- stored only
    ///         in the event log, not in contract storage, to keep gas
    ///         costs down.
    function submitDeliverable(
        uint256 id,
        string calldata deliverableURI
    ) external {
        Agreement storage a = agreements[id];

        require(
            a.status == Status.Funded,
            "Not awaiting a deliverable"
        );

        require(
            msg.sender == a.beneficiary,
            "Only the beneficiary can submit"
        );

        a.status = Status.Submitted;

        emit DeliverableSubmitted(
            id,
            deliverableURI
        );
    }

    /// @notice Release the escrowed funds to the beneficiary. Callable by
    ///         the `agent` (normally after off-chain validation passes)
    ///         or directly by the depositor as a manual approval.
    function release(
        uint256 id
    ) external nonReentrant {
        Agreement storage a = agreements[id];

        require(
            a.status == Status.Funded ||
                a.status == Status.Submitted,
            "Not releasable"
        );

        require(
            msg.sender == agent ||
                msg.sender == a.depositor,
            "Not authorized"
        );

        a.status = Status.Released;

        IERC20(a.token).safeTransfer(
            a.beneficiary,
            a.amount
        );

        emit EscrowReleased(id, msg.sender);
    }

    /// @notice Refund the escrowed funds to the depositor. Callable by
    ///         the `agent` (normally after off-chain validation fails) at
    ///         any time, or by the depositor alone only after the
    ///         deadline has passed -- this stops the depositor from
    ///         unilaterally pulling funds back while a submitted
    ///         deliverable is still awaiting review.
    function refund(
        uint256 id
    ) external nonReentrant {
        Agreement storage a = agreements[id];

        require(
            a.status == Status.Funded ||
                a.status == Status.Submitted,
            "Not refundable"
        );

        bool isAgent = msg.sender == agent;
        bool isDepositor = msg.sender == a.depositor;

        require(
            isAgent || isDepositor,
            "Not authorized"
        );

        if (isDepositor && !isAgent) {
            require(
                block.timestamp > a.deadline,
                "Depositor can only refund after the deadline"
            );
        }

        a.status = Status.Refunded;

        IERC20(a.token).safeTransfer(
            a.depositor,
            a.amount
        );

        emit EscrowRefunded(id, msg.sender);
    }

    function getAgreement(
        uint256 id
    ) external view returns (Agreement memory) {
        return agreements[id];
    }
}
