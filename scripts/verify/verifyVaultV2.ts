import hre from "hardhat";
import { getAddresses, Addresses } from "../../src/addresses";

async function main() {
  const addresses: Addresses = getAddresses(hre.network.name);

  await hre.run("verify:verify", {
    address: (await hre.ethers.getContract("Flume")).address,
    constructorArguments: [addresses.UniswapV3Factory],
    // other args
    libraries: {
      Underlying: (await hre.ethers.getContract("Underlying")).address,
      Pool: (await hre.ethers.getContract("Pool")).address,
      Position: (await hre.ethers.getContract("Position")).address,
    },
  });
}

main()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  });
