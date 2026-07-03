// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ITexToken {
    function balanceOf(address account)
        external
        view
        returns (uint256);
}

contract TexGovernance is Ownable {
    ITexToken public immutable tex;

    struct Proposal {
        uint256 id;
        string title;
        string description;
        uint256 deadline;
        uint256 yesVotes;
        uint256 noVotes;
        bool executed;
    }

    uint256 public proposalCount;

    mapping(uint256 => Proposal) public proposals;

    mapping(uint256 => mapping(address => bool))
        public voted;

    event ProposalCreated(
        uint256 indexed id,
        string title
    );

    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        bool support,
        uint256 votingPower
    );

    constructor(
        address texToken,
        address owner
    ) Ownable(owner) {
        tex = ITexToken(texToken);
    }

    function createProposal(
        string calldata title,
        string calldata description,
        uint256 duration
    ) external onlyOwner {
        proposalCount++;

        proposals[proposalCount] = Proposal({
            id: proposalCount,
            title: title,
            description: description,
            deadline: block.timestamp + duration,
            yesVotes: 0,
            noVotes: 0,
            executed: false
        });

        emit ProposalCreated(
            proposalCount,
            title
        );
    }

    function vote(
        uint256 proposalId,
        bool support
    ) external {
        Proposal storage proposal =
            proposals[proposalId];

        require(
            proposal.id != 0,
            "Proposal not found"
        );

        require(
            block.timestamp <
                proposal.deadline,
            "Voting ended"
        );

        require(
            !voted[proposalId][msg.sender],
            "Already voted"
        );

        uint256 votingPower =
            tex.balanceOf(msg.sender);

        require(
            votingPower > 0,
            "No voting power"
        );

        voted[proposalId][msg.sender] =
            true;

        if (support) {
            proposal.yesVotes +=
                votingPower;
        } else {
            proposal.noVotes +=
                votingPower;
        }

        emit VoteCast(
            proposalId,
            msg.sender,
            support,
            votingPower
        );
    }

    function getProposal(
        uint256 proposalId
    )
        external
        view
        returns (Proposal memory)
    {
        return proposals[proposalId];
    }
}