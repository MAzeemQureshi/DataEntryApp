// Connect to the Ethereum network using Web3.js
const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

// Contract address and ABI
const contractAddress = '0x2f679044931771e665722Caa2FbDf84a2FeAC61D';
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "designation",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "phoneNumber",
				"type": "uint256"
			}
		],
		"name": "addUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "deleteUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllUsers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "designation",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "salary",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "phoneNumber",
						"type": "uint256"
					}
				],
				"internalType": "struct DataStorage.User[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "designation",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "phoneNumber",
				"type": "uint256"
			}
		],
		"name": "updateUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

// Instantiate the contract object
const contract = new web3.eth.Contract(contractABI, contractAddress);

function validate(event) {
	event.preventDefault();

	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	if (username === "azeem" && password === "123") {
		window.location.href = "add.html";
	} else {
		alert("Username or password incorrect");
	}
}


// Function to add a new user
async function addUser() {
    const id = parseInt(document.getElementById('addId').value);
    const name = document.getElementById('addName').value;
    const designation = document.getElementById('addDesignation').value;
    const salary = parseInt(document.getElementById('addSalary').value);
    const phoneNumber = parseInt(document.getElementById('addPhoneNumber').value);

    try {
        // Send the transaction to the contract's addUser function
        const accounts = await web3.eth.getAccounts();
        await contract.methods.addUser(id, name, designation, salary, phoneNumber).send({ from: accounts[0], gas: 3000000 });

        alert('User added successfully!');
        clearAddUserFields();
    } catch (error) {
        console.error('Error:', error);
		alert('User id Already Occupied!');
    }
}

// Function to retrieve user data
async function retrieveUser() {
    const id = parseInt(document.getElementById('retrieveId').value);

    try {
        // Call the contract's getUser function
        const result = await contract.methods.getUser(id).call();

        const userData = document.getElementById('userData');
        userData.innerHTML = `<strong>Name:</strong> ${result[0]}<br>
                              <strong>Designation:</strong> ${result[1]}<br>
                              <strong>Salary:</strong> ${result[2]}<br>
                              <strong>Phone Number:</strong> ${result[3]}`;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to update user data
async function updateUser() {
    const id = parseInt(document.getElementById('updateId').value);
    const name = document.getElementById('updateName').value;
    const designation = document.getElementById('updateDesignation').value;
    const salary = parseInt(document.getElementById('updateSalary').value);
    const phoneNumber = parseInt(document.getElementById('updatePhoneNumber').value);

    try {
        // Send the transaction to the contract's updateUser function
        const accounts = await web3.eth.getAccounts();
        await contract.methods.updateUser(id, name, designation, salary, phoneNumber).send({ from: accounts[0], gas: 3000000 });

        alert('User updated successfully!');
        clearUpdateUserFields();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to delete user data
async function deleteUser() {
    const id = parseInt(document.getElementById('deleteId').value);

    try {
        // Send the transaction to the contract's deleteUser function
        const accounts = await web3.eth.getAccounts();
        await contract.methods.deleteUser(id).send({ from: accounts[0] , gas: 3000000 });

        alert('User deleted successfully!');
        clearDeleteUserFields();
    } catch (error) {
        console.error('Error:', error);
    }
}


// ...

// Function to retrieve a list of all users
async function getAllUsers() {
    try {
        // Call the contract's getUserCount function to get the total user count
        const count = await contract.methods.getUserCount().call();

        // Loop through each user ID and retrieve their data
        const userList = [];
        for (let i = 1; i <= count; i++) {
            const result = await contract.methods.getUser(i).call();
            userList.push(result);
        }

        // Display the list of users
        const userContainer = document.getElementById('userList');
        userContainer.innerHTML = '';
        for (const user of userList) {
            const userElement = document.createElement('div');
            userElement.innerHTML = `<strong>Name:</strong> ${user[0]}<br>
                                      <strong>Designation:</strong> ${user[1]}<br>
                                      <strong>Salary:</strong> ${user[2]}<br>
                                      <strong>Phone Number:</strong> ${user[3]}<br><br>`;
            userContainer.appendChild(userElement);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// ...


// Helper function to clear input fields for adding a user
function clearAddUserFields() {
    document.getElementById('addId').value = '';
    document.getElementById('addName').value = '';
    document.getElementById('addDesignation').value = '';
    document.getElementById('addSalary').value = '';
    document.getElementById('addPhoneNumber').value = '';
}

// Helper function to clear input fields for updating a user
function clearUpdateUserFields() {
    document.getElementById('updateId').value = '';
    document.getElementById('updateName').value = '';
    document.getElementById('updateDesignation').value = '';
    document.getElementById('updateSalary').value = '';
    document.getElementById('updatePhoneNumber').value = '';
}

// Helper function to clear input fields for deleting a user
function clearDeleteUserFields() {
    document.getElementById('deleteId').value = '';
}
