import React, { useState } from "react";
import { Text, View, Keyboard } from "react-native";
import TaskList from "../components/home/TaskList";
import AddTaskBar from '../components/home/AddTaskBar';
import SearchBar from '../components/home/SearchBar';
import { screen, fonts } from '../constants/styles'

export default function Home() {
  const [todoTasks, setTodoTasks] = useState([]); // default value is [] (empty array)
  const [completedTasks, setCompletedTasks] = useState([]);
  const [allTasks, setAllTasks] = useState(todoTasks.concat(completedTasks));
  const [search, onChangeSearch] = useState();

  // adds a new task to list of todoTasks
  const handleAddTask = (task) => {
    Keyboard.dismiss();
    setTodoTasks([...todoTasks, task]); // creates a new array of everything in already taskItems + task
    console.log("Todo:", todoTasks)
    // setAllTasks(todoTasks.concat(completedTasks));
    // console.log("Task:", task)
    // console.log("Todo:", todoTasks)
    // console.log("Completed:", completedTasks)
    // console.log("All:", allTasks)
  };

  // deletes task from either completeTasks list or todoTasks list
  const handleDeleteTask = (index, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    } else {
      setTodoTasks(todoTasks.filter((_, i) => i !== index));
    }
    // setAllTasks(todoTasks.concat(completedTasks));
  };

  // checks/completes task if previously not complete, unchecks task if already complete
  const handleCompleteTask = (index, isCompleted) => {
    // modularizing!
    const list = isCompleted ? completedTasks : todoTasks;
    const setter = isCompleted ? setCompletedTasks : setTodoTasks;
    const otherList = isCompleted ? todoTasks : completedTasks;
    const otherSetter = isCompleted ? setTodoTasks : setCompletedTasks;

    let item = list[index];
    let itemsCopy = [...list];
    itemsCopy.splice(index, 1);
    setter(itemsCopy);
    otherSetter([...otherList, item]);

    // setAllTasks(todoTasks.concat(completedTasks));
  };

  const handleSearchTask = (searchPhrase) => {};

  return (
    <View style={screen.container}>
      <View style={{ flex: 1 }}>
        {/* header section */}
        <Text style={fonts.largeTitle}>Hi Tina</Text>
        <Text style={fonts.sectionTitle}>To-do</Text>

        {/* search tasks section */}
        <SearchBar text={search} searchHandler={handleSearchTask} />

        {/* task list section */}
        <TaskList todoTasks={todoTasks} completedTasks={completedTasks} completeHandler={handleCompleteTask} deleteHandler={handleDeleteTask} />
      </View>

      {/* add a task section */}
      <AddTaskBar addHandler={handleAddTask} />

    </View>
  );
}
