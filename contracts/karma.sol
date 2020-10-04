pragma solidity ^0.5.0;
import "./ConvertLib.sol";

contract Karma {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() public {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}

    //claim a task
address[16] public neighbors;

function claim(uint taskId) public returns (uint) {
    require(taskId >= 0 && taskId <= 15);
    neighbors[taskId] = msg.sender;
    return taskId;
}
// Retrieving the tasks
function getNeighbors() public view returns (address[16] memory) {
  return neighbors;
}

}
