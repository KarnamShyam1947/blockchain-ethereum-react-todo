// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8;

contract ToDoList {

    struct Task {
        string description;
        bool status;
        address userAddress;
    }

    Task[] private tasks;

    modifier checkTaskId(uint _index) {
        require(_index < tasks.length, "Index Out of Bounds");
        _;
    }

    modifier checkUser(uint _index) {
        require(msg.sender == tasks[_index].userAddress, "You are not owner. Cant access");
        _;
    } 

    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }

    function addTask(string memory _description) public  {
        tasks.push(Task(_description, false, msg.sender));
    }

    function changeStatus(uint256 _index) public checkTaskId(_index) checkUser(_index)  {
        tasks[_index].status = true;
    }

    function getTask(uint256 _index) view  public checkTaskId(_index) checkUser(_index) returns (Task memory)  {        
        return tasks[_index];
    }


}