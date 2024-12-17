import React, { useState } from 'react';
import * as smartContract from './services/ToDoSmartContract';

function App() {
  const [description, setDescription] = useState("");
  const [taskId, setTaskId] = useState(0);
  const [tasks, setTasks] = useState([]);

  const getToDoList = async () => {
    const list = await smartContract.fetchToDoList();
    setTasks(list);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await smartContract.addTask(description);
    } catch (error) {
      console.log(error);
    }
  }

  const changeStatus = async (e) => {
    e.preventDefault();
    
    try {
      await smartContract.changeStatus(taskId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Hello, World</h1>
      <hr />
    
      <table>
        <thead>
          <tr>
            <th>Task Id</th>
            <th>Description</th>
            <th>Owner Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            tasks && tasks.map((element, idx) => (
              <tr key={idx}>
                <td>{idx}</td>
                <td>{element[0]}</td>
                <td>{element[2]}</td>
                <td>{element[1] ? "Completed" : "Not Completed"}</td>
              </tr>
            ))
          }
        </tbody>    
      </table>

      <button onClick={getToDoList}>Fetch List</button>
      <hr />
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          name='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input type="submit" value="Add Task" />
      </form>
      <hr />
      <form onSubmit={changeStatus}>
        <input
          required
          type="text"
          name='id'
          value={taskId}
          onChange={e => setTaskId(e.target.value)}
        />
        <input type="submit" value="Change Status" />
      </form>
    </>
  );
}

export default App;
