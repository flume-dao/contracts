import { HardhatUserConfig } from "hardhat/config";

// PLUGINS
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-deploy";
import "solidity-coverage";
import "hardhat-gas-reporter";

import { ethers } from "ethers";

// Process Env Variables
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
const ALCHEMY_ID = process.env.ALCHEMY_ID;
const PK = process.env.PK;
const TEST_PK = process.env.TEST_PK;

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",

  // hardhat-deploy
  namedAccounts: {
    deployer: {
      default: 0,
    },
    arrakisMultiSig: {
      default: 1,
      polygon: "0xd06a7cc1a162fDfB515595A2eC1c47B75743C381",
      mainnet: "0xb9229ea965FC84f21b63791efC643b2c7ffB77Be",
      optimism: "0x283824e5A6378EaB2695Be7d3cb0919186e37D7C",
      arbitrum: "0x64520Dc190b5015E7d48E87273f6EE69197Cd798",
      goerli: "0xB4fa2C382dAf08531F8BA4515F409A129beCFd02",
      sepolia: "0x81a1e7F34b9bABf172087cF5df8A4DF6500e9d4d",
      base: "0x463a4a038038DE81525f55c456f071241e0a3E66",
      base_goerli: "0x0F83FFe2d0779550E74D96B3871216132D527eF5", // eslint-disable-line @typescript-eslint/naming-convention
      binance: "0x2CcDA3A99A41342Eb5Ff3c8173828Ac0C5311fba",
      gnosis: "0x05b1811546e65Dec3Eb703a13aA2885B4f51a32f",
    },
    owner: {
      default: 2,
      polygon: "0xDEb4C33D5C3E7e32F55a9D6336FE06010E40E3AB",
      mainnet: "0x5108EF86cF493905BcD35A3736e4B46DeCD7de58",
      optimism: "0x8636600A864797Aa7ac8807A065C5d8BD9bA3Ccb",
      arbitrum: "0x77BADa8FC2A478f1bc1E1E4980916666187D0dF7",
      goerli: "0xDb651b0C70C67181B1807B29d9097DD556b2eC4b",
      sepolia: "0x09E60942D910D3399961b845d4479627F0FE2C43",
      base: "0x25CF23B54e25daaE3fe9989a74050b953A343823",
      base_goerli: "0x4788290e1fb26c537cBfBb5a8b4E1432795BeEbD", // eslint-disable-line @typescript-eslint/naming-convention
      binance: "0x7ddBE55B78FbDe1B0A0b57cc05EE469ccF700585",
      gnosis: "0x969cA3961FCeaFd3Cb3C1CA9ecdd475babcD704D",
    },
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },

  networks: {
    hardhat: {
      forking: {
        url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`,
        blockNumber: 25594591, // ether price $4,168.96
      },
      accounts: {
        accountsBalance: ethers.utils.parseEther("10000").toString(),
      },
    },
    mainnet: {
      accounts: PK ? [PK] : [],
      chainId: 1,
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_ID}`,
    },
    polygon: {
      accounts: PK ? [PK] : [],
      chainId: 137,
      url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`,
    },
    optimism: {
      accounts: PK ? [PK] : [],
      chainId: 10,
      url: `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`,
    },
    arbitrum: {
      accounts: PK ? [PK] : [],
      chainId: 42161,
      url: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`,
    },
    binance: {
      accounts: PK ? [PK] : [],
      chainId: 56,
      url: "https://bsc-dataseed.binance.org/",
    },
    base: {
      accounts: PK ? [PK] : [],
      chainId: 8453,
      url: "https://mainnet.base.org",
    },
    gnosis: {
      accounts: PK ? [PK] : [],
      chainId: 100,
      url: `https://rpc.gnosischain.com`,
    },
    sepolia: {
      accounts: TEST_PK ? [TEST_PK] : [],
      chainId: 11155111,
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_ID}`,
    },
    goerli: {
      accounts: TEST_PK ? [TEST_PK] : [],
      chainId: 5,
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_ID}`,
    },
  },

  solidity: {
    compilers: [
      {
        version: "0.8.27",
        settings: {
          optimizer: { enabled: true, runs: 833 },
        },
      },
    ],
  },

  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
