// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {IFlume} from "./IFlume.sol";
import {RangeWeight, Rebalance} from "../structs/SFlume.sol";

interface IFlumeResolver {
    function standardRebalance(
        RangeWeight[] memory rangeWeights_,
        IFlume vaultV2_
    ) external view returns (Rebalance memory rebalanceParams);

    function getMintAmounts(
        IFlume vaultV2_,
        uint256 amount0Max_,
        uint256 amount1Max_
    )
        external
        view
        returns (
            uint256 amount0,
            uint256 amount1,
            uint256 mintAmount
        );

    function getAmountsForLiquidity(
        uint160 sqrtPriceX96_,
        int24 lowerTick_,
        int24 upperTick_,
        int128 liquidity_
    ) external pure returns (uint256 amount0, uint256 amount1);

    function getPositionId(
        address addr_,
        int24 lowerTick_,
        int24 upperTick_
    ) external pure returns (bytes32 positionId);
}
