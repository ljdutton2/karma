// pragma solidity ^0.5.0;
// import "./ConvertLib.sol";
// import "./karma.sol";

// event NewTask( string title, uint value, uint distance,);

// 	struct task {
// 		string title;
// 		uint value;
// 		uint32 distance;
// 	}

//     //

//     Task[] public tasks;
//     function _createTask(string memory title, uint value) public {
//     uint id = tasks.push(Task(_title, _value);
//     TaskToOwner[id] = msg.sender;
//     ownerTaskCount[msg.sender] = ownerTaskCount[msg.sender].add(1);
//     emit NewTask(id, _title, _value);
//   }

// 	function claim(uint taskId) public returns (uint) {
//     require(taskId >= 0 && taskId <= 15);
//     neighbors[taskId] = msg.sender;
//     return taskId;
// 	}
// 	// Retrieving the tasks
// 	function getNeighbors() public view returns (address[16] memory) {
//   return neighbors;
// 	}