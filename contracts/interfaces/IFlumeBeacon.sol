// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IFlumeBeacon {
    function upgradeTo(address newImplementation) external;

    function implementation() external view returns (address);
}
