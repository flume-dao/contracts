import { expect } from "chai";
import hre = require("hardhat");
import { MockFFlumeFactory, IUniswapV3Pool } from "../../typechain";
import { Signer } from "ethers";

const { ethers, deployments } = hre;

describe("Flume Factory smart contract internal functions unit test", function () {
  this.timeout(0);

  let user: Signer;
  let mockFFlumeFactory: MockFFlumeFactory;
  let poolContract: IUniswapV3Pool;

  beforeEach("Setting up for Vault V2 functions unit test", async function () {
    if (hre.network.name !== "hardhat") {
      console.error("Test Suite is meant to be run on hardhat only");
      process.exit(1);
    }

    [user] = await ethers.getSigners();

    await deployments.fixture();

    mockFFlumeFactory = (await ethers.getContract(
      "MockFFlumeFactory"
    )) as MockFFlumeFactory;

    poolContract = (await ethers.getContractAt(
      "IUniswapV3Pool",
      "0x45dDa9cb7c25131DF268515131f647d726f50608",
      user
    )) as IUniswapV3Pool;
  });

  it("#0: Test Token Order", async () => {
    const tokenA = await poolContract.token1();
    const tokenB = await poolContract.token0();

    const result = await mockFFlumeFactory.getTokenOrder(tokenA, tokenB);

    expect(result.token0).to.be.eq(tokenB);
    expect(result.token1).to.be.eq(tokenA);
  });

  it("#1: Test Append", async () => {
    const a = "a";
    const b = "b";
    const c = "c";
    const d = "d";

    const appendString = await mockFFlumeFactory.append(a, b, c, d);

    expect(a + b + c + d).to.be.eq(appendString);
  });
});
