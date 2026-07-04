import fs from "fs";
import path from "path";

const artifactPath = path.resolve(
  "artifacts/contracts/ArcitexEarlyAccessNFT.sol/ArcitexEarlyAccessNFT.json",
);

const outputDir = path.resolve(
  "lib/contracts/generated",
);

const outputFile = path.join(
  outputDir,
  "ArcitexEarlyAccessNFT.ts",
);

if (!fs.existsSync(artifactPath)) {
  throw new Error(
    [
      "Artifact not found.",
      "",
      "Compile the contract first:",
      "",
      "npx hardhat compile",
    ].join("\n"),
  );
}

const artifact = JSON.parse(
  fs.readFileSync(
    artifactPath,
    "utf8",
  ),
);

fs.mkdirSync(outputDir, {
  recursive: true,
});

const content = `/* AUTO GENERATED FILE */
/* DO NOT EDIT MANUALLY */

export const arcitexEarlyAccessNFTAbi = ${JSON.stringify(
  artifact.abi,
  null,
  2,
)} as const;

export const arcitexEarlyAccessNFTBytecode =
"${artifact.bytecode}" as const;
`;

fs.writeFileSync(
  outputFile,
  content,
);

console.log(
  "================================",
);

console.log(
  "NFT Contract Generated",
);

console.log(
  outputFile,
);

console.log(
  "================================",
);