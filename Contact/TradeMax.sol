// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TradeMax {
    struct Trade {
        uint id;
        address trader;
        string asset;
        uint amount;
        uint price;
        bool isBuyOrder;
        bool isExecuted;
    }

    uint public tradeCounter;
    mapping(uint => Trade) public trades;
    address public owner;

    event TradePlaced(uint tradeId, address trader, string asset, uint amount, uint price, bool isBuyOrder);
    event TradeExecuted(uint tradeId, address trader);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function placeTrade(string memory asset, uint amount, uint price, bool isBuyOrder) public {
        tradeCounter++;
        trades[tradeCounter] = Trade(tradeCounter, msg.sender, asset, amount, price, isBuyOrder, false);
        emit TradePlaced(tradeCounter, msg.sender, asset, amount, price, isBuyOrder);
    }

    function executeTrade(uint tradeId) public onlyOwner {
        require(trades[tradeId].isExecuted == false, "Trade already executed");
        trades[tradeId].isExecuted = true;
        emit TradeExecuted(tradeId, trades[tradeId].trader);
    }
}

