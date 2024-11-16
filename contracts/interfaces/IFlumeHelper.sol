// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {IFlume} from "./IFlume.sol";
import {
    PositionLiquidity,
    UnderlyingPayload,
    UnderlyingOutput,
    Range
} from "../structs/SFlume.sol";
import {Amount} from "../structs/SFlumeHelper.sol";

interface IFlumeHelper {
    function totalUnderlyingWithFeesAndLeftOver(IFlume vault_)
        external
        view
        returns (UnderlyingOutput memory underlying);

    function totalUnderlyingWithFees(IFlume vault_)
        external
        view
        returns (
            uint256 amount0,
            uint256 amount1,
            uint256 fee0,
            uint256 fee1
        );

    function totalUnderlying(IFlume vault_)
        external
        view
        returns (uint256 amount0, uint256 amount1);

    function totalUnderlyingAtPrice(IFlume vault_, uint160 sqrtPriceX96_)
        external
        view
        returns (uint256 amount0, uint256 amount1);

    function totalLiquidity(IFlume vault_)
        external
        view
        returns (PositionLiquidity[] memory liquidities);

    function token0AndToken1ByRange(
        Range[] calldata ranges_,
        address token0_,
        address token1_,
        address vaultV2_
    )
        external
        view
        returns (Amount[] memory amount0s, Amount[] memory amount1s);

    function token0AndToken1PlusFeesByRange(
        Range[] calldata ranges_,
        address token0_,
        address token1_,
        address vaultV2_
    )
        external
        view
        returns (
            Amount[] memory amount0s,
            Amount[] memory amount1s,
            Amount[] memory fee0s,
            Amount[] memory fee1s
        );
}
