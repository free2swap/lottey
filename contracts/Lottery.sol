pragma solidity ^0.4.24;
contract Lottery {
    address public manager;
    address [] public plays;
    address public winner;
    uint256 public roud;
    constructor()public{
        manager=msg.sender;
    }

    function play() payable public {
        require(msg.value== 1 ether);
        plays.push(msg.sender);

    }
    modifier OnlyManager(){
        require(msg.sender==manager);
        _;
    }

    function KaiJiang() OnlyManager public returns(address){
        bytes memory dataBytes=abi.encodePacked(block.timestamp,block.difficulty,plays.length);
        bytes32 hash=keccak256(dataBytes);
        uint256 roudInt=uint256(hash);
        uint256 index=roudInt%plays.length;
        winner=plays[index];
        uint256 money1=address(this).balance * 99 / 100;
        uint256 money2=address(this).balance - money1;
        winner.transfer(money1);
        manager.transfer(money2);
        roud++;
        delete plays;
        return winner;
    }

    function TuiJiang() OnlyManager public{
        for (uint256 i=0;i<plays.length;i++){
            plays[i].transfer(1 ether);
        }
        roud++;
        delete plays;
    }


    function getPlayBalance(address input)public view returns(uint256){
        return uint256(input.balance);
    }

    function getBlance()public view returns(uint256){
        return uint256(address(this).balance);
    }

    function playerCounts() public view returns(uint256){
        return plays.length;
    }
}