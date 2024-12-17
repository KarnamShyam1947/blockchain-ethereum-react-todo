import { ethers } from "ethers";
import ToDoList from './../../artifacts/contracts/ToDoList.sol/ToDoList.json'

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Request MetaMask account access
async function requestAccount() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else {
    alert("Please install MetaMask!");
  }
}

export async function fetchToDoList() {
  await requestAccount();

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      ToDoList.abi,
      provider
    );

    try {
      const data = await contract.getTasks();
      console.log("Tasks List :", data); 
      return data; 
    } catch (error) {
      console.error("Error fetching Tasks List:", error);
    }
  }
}

export async function addTask(description) {
  await requestAccount();

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ToDoList.abi, signer);
    
    try {
      const transaction = await contract.addTask(description); 
      console.log("Transaction sent:", transaction);
      await transaction.wait(); 

      alert("Added Successfully");
      let data = await fetchToDoList();
      return data;
      
    } catch (error) {
      alert(error.data.message);
      console.error("Error add the task :", error);
    }
  }
}

export async function changeStatus(taskId) {
  await requestAccount();

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ToDoList.abi, signer);
    
    try {
      const transaction = await contract.changeStatus(taskId); 
      console.log("Transaction sent:", transaction);
      await transaction.wait(); 

      alert("Changed Successfully");
      let data = await fetchToDoList();
      return data;
      
    } catch (error) {
      alert(error.data.message);
      console.error("Error change status of task :", error.data.message);
    }
  }
}


