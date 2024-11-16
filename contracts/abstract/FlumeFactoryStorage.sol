// SPDX-License-Identifier: BSL-2.0
pragma solidity 0.8.27;

import {IFlumeFactory} from "../interfaces/IFlumeFactory.sol";
import {IFlumeBeacon} from "../interfaces/IFlumeBeacon.sol";
import {
    ITransparentUpgradeableProxy
} from "../interfaces/ITransparentUpgradeableProxy.sol";
import {
    OwnableUpgradeable
} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {
    EnumerableSet
} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

/// @title Flume Factory Storage Smart Contract
// solhint-disable-next-line max-states-count
abstract contract FlumeFactoryStorage is
    IFlumeFactory,
    OwnableUpgradeable
{
    using EnumerableSet for EnumerableSet.AddressSet;

    IFlumeBeacon public immutable arrakisV2Beacon;
    EnumerableSet.AddressSet internal _vaults;

    // #region constructor.

    constructor(IFlumeBeacon arrakisV2Beacon_) {
        arrakisV2Beacon = arrakisV2Beacon_;
    }

    // #endregion constructor.

    function initialize(address _owner_) external initializer {
        require(_owner_ != address(0), "owner is address zero");
        _transferOwnership(_owner_);
        emit InitFactory(_owner_);
    }

    // #region admin set functions
    /// @notice upgrade vaults instance using transparent proxy
    /// with the current implementation
    /// @param vaults_ the list of vault.
    /// @dev only callable by owner
    function upgradeVaults(address[] memory vaults_) external onlyOwner {
        address implementation = arrakisV2Beacon.implementation();
        require(implementation != address(0), "implementation is address zero");
        for (uint256 i = 0; i < vaults_.length; i++) {
            ITransparentUpgradeableProxy(vaults_[i]).upgradeTo(implementation);
        }
    }

    /// @notice upgrade vaults instance using transparent proxy
    /// with the current implementation and call the instance
    /// @param vaults_ the list of vault.
    /// @param datas_ payloads of instances call.
    /// @dev only callable by owner
    function upgradeVaultsAndCall(
        address[] memory vaults_,
        bytes[] calldata datas_
    ) external onlyOwner {
        address implementation = arrakisV2Beacon.implementation();
        require(implementation != address(0), "implementation is address zero");
        require(vaults_.length == datas_.length, "mismatching array length");
        for (uint256 i = 0; i < vaults_.length; i++) {
            ITransparentUpgradeableProxy(vaults_[i]).upgradeToAndCall(
                implementation,
                datas_[i]
            );
        }
    }

    /// @notice make the vault immutable
    /// @param vaults_ the list of vault.
    /// @dev only callable by owner
    function makeVaultsImmutable(address[] memory vaults_) external onlyOwner {
        for (uint256 i = 0; i < vaults_.length; i++) {
            ITransparentUpgradeableProxy(vaults_[i]).changeAdmin(address(1));
        }
    }

    // #endregion admin set functions

    // #region admin view call.

    /// @notice get vault instance admin
    /// @param proxy instance of Flume.
    /// @return admin address of Flume instance admin.
    function getProxyAdmin(address proxy) external view returns (address) {
        // We need to manually run the static call since the getter cannot be flagged as view
        // bytes4(keccak256("admin()")) == 0xf851a440
        (bool success, bytes memory returndata) = proxy.staticcall(
            hex"f851a440"
        );
        require(success, "PA");
        return abi.decode(returndata, (address));
    }

    /// @notice get vault implementation
    /// @param proxy instance of Flume.
    /// @return implementation address of Flume implementation.
    function getProxyImplementation(address proxy)
        external
        view
        returns (address)
    {
        // We need to manually run the static call since the getter cannot be flagged as view
        // bytes4(keccak256("implementation()")) == 0x5c60da1b
        (bool success, bytes memory returndata) = proxy.staticcall(
            hex"5c60da1b"
        );
        require(success, "PI");
        return abi.decode(returndata, (address));
    }

    // #endregion admin view call.
}
