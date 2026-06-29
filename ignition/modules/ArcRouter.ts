import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EURC =
  "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a";

export default buildModule(
  "ArcRouterModule",
  (m) => {
    const router = m.contract(
      "ArcRouter",
      [EURC]
    );

    return {
      router,
    };
  }
);