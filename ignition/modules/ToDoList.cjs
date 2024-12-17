const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ToDoModule", (m) => {

  const toDoList = m.contract("ToDoList", [], { });

  return { toDoList };
});
