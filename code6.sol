// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataStorage {
    struct User {
        string name;
        string designation;
        uint256 salary;
        uint256 phoneNumber;
    }

    mapping(uint256 => User) private users;
    uint256 private userCount;

    function addUser(uint256 id, string memory name, string memory designation, uint256 salary, uint256 phoneNumber) public {
        require(users[id].salary == 0, "User with the specified id already exists.");
        users[id] = User(name, designation, salary, phoneNumber);
        userCount++;
    }

    function getUser(uint256 id) public view returns (string memory, string memory, uint256, uint256) {
        User memory user = users[id];
        return (user.name, user.designation, user.salary, user.phoneNumber);
    }

    function updateUser(uint256 id, string memory name, string memory designation, uint256 salary, uint256 phoneNumber) public {
        require(users[id].salary != 0, "User with the specified id does not exist.");
        users[id] = User(name, designation, salary, phoneNumber);
    }

    function deleteUser(uint256 id) public {
        require(users[id].salary != 0, "User with the specified id does not exist.");
        delete users[id];
        userCount--;
    }

    function getUserCount() public view returns (uint256) {
        return userCount;
    }

    function getAllUsers() public view returns (User[] memory) {
        User[] memory allUsers = new User[](userCount);

        for (uint256 i = 0; i < userCount; i++) {
            allUsers[i] = users[i+1];
        }

        return allUsers;
    }
}
