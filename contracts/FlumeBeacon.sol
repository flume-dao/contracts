// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {
    UpgradeableBeacon
} from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

/// @title FlumeBeacon stores vault implementation.
contract FlumeBeacon is UpgradeableBeacon {
    // solhint-disable-next-line no-empty-blocks
    constructor(address implementation_, address owner_)
        UpgradeableBeacon(implementation_)
    {
        require(
            implementation_ != address(0),
            "implementation is address zero"
        );
        require(owner_ != address(0), "owner is address zero");
        _transferOwnership(owner_);
    }
}
