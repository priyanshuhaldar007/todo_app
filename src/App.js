// Importing files and componensts.
import './assets/styles/main.css';
import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';
import { nanoid } from 'nanoid';

// Creating the App component
const App = (props) => {

	// Creating two states to store task list and filters
	const [tasks, setTasks] = useState(props.tasks);
	const [filter, setFilter] = useState('All');

	// Creating a filter object to map accordingly
	const FILTER_MAP = {
		All: () => true,
		Active: (task) => !task.completed,
		Completed: (task) => task.completed,
	};

	const FILTER_NAMES = Object.keys(FILTER_MAP);

	// Function to toggle completion of the task
	function toggleCompleted(id) {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, completed: !task.completed };
			}
			return task;
		});
		setTasks(updatedTasks);
	}

	// Function to delete the task
	function deleteTask(id) {
		const remainingTasks = tasks.filter((task) => id !== task.id);
		setTasks(remainingTasks);
	}

	// Function to edit a task
	function editTask(id, newName) {
		const editedTaskList = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, name: newName };
			}
			return task;
		});
		setTasks(editedTaskList);
	}

	// Function to add a new task
	function addTask(name) {
		const newTask = { id: `todo-${nanoid()}`, name, completed: false };
		setTasks([...tasks, newTask]);
	}

	// Retrieving all the tasks and filtering it based on the option selected
	const taskList = tasks
		.filter(FILTER_MAP[filter])
		.map((task) => (
			<Todo
				id={task.id}
				name={task.name}
				completed={task.completed}
				key={task.id}
				toggleCompleted={toggleCompleted}
				deleteTask={deleteTask}
				editTask={editTask}
			/>
		));

	// Setting the active filter button based on selection
	const filterList = FILTER_NAMES.map((name) => (
		<FilterButton
			key={name}
			name={name}
			isPressed={name === filter}
			setFilter={setFilter}
		/>
	));

	// Rendering based on conditon of filters and qunatity
	const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
	const headingNumText = `${taskList.length} ${tasksNoun}`;
	let headingSubText = 'available';

	switch (filter) {
		case 'Completed':
			headingSubText = 'completed';
			break;
		case 'Active':
			headingSubText = 'remaining';
			break;
		default:
			headingSubText = 'available';
	}

	// Using use effect to save the data on local storage
	useEffect(() => {
		localStorage.setItem('myTaskList', JSON.stringify(tasks));
	}, [tasks]);

	// Rendering the components
	return (
		<div className="todoapp stack-large">
			<h1>To Do List</h1>
			<Form addTask={addTask} />
			<div className="filters btn-group stack-exception">
				{filterList}
			</div>
			<h2 id="list-heading">
				{headingNumText} {headingSubText}
			</h2>
			<ul
				className="todo-list stack-large stack-exception"
				aria-labelledby="list-heading"
			>
				{taskList}
			</ul>
		</div>
	);
};

export default App;
