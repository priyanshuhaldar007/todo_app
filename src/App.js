import './assets/styles/main.css';
import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';
import { nanoid } from 'nanoid';

const App = (props) => {
	const [tasks, setTasks] = useState(props.tasks);
	const [filter, setFilter] = useState('All');

	const FILTER_MAP = {
		All: () => true,
		Active: (task) => !task.completed,
		Completed: (task) => task.completed,
	};

	const FILTER_NAMES = Object.keys(FILTER_MAP);

	function toggleCompleted(id) {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, completed: !task.completed };
			}
			return task;
		});
		setTasks(updatedTasks);
	}

	function deleteTask(id) {
		const remainingTasks = tasks.filter((task) => id !== task.id);
		setTasks(remainingTasks);
	}

	function editTask(id, newName) {
		const editedTaskList = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, name: newName };
			}
			return task;
		});
		setTasks(editedTaskList);
	}

	function addTask(name) {
		const newTask = { id: `todo-${nanoid()}`, name, completed: false };
		setTasks([...tasks, newTask]);
	}

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

	const filterList = FILTER_NAMES.map((name) => (
		<FilterButton
			key={name}
			name={name}
			isPressed={name === filter}
			setFilter={setFilter}
		/>
	));

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

	useEffect(() => {
		localStorage.setItem('myTaskList', JSON.stringify(tasks));
	}, [tasks]);

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
