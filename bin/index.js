#!/usr/bin/env node
import chalk from 'chalk';
import arg from 'arg';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const day = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
];
const dotw = day[new Date().getDay()];

const usage = () => {
	console.log(chalk.greenBright('Organize your week!'));
	console.log(
		`${chalk.yellow('Add a task or a chore for a day of the week!')}`
	);
	console.log(
		`${chalk.cyanBright('Example:')} ${chalk.magentaBright(
			'planned --add "medical appointment" --day monday'
		)}`
	);
	console.log(
		`${chalk.yellow('Add info to a task')}`
	)
	console.log(
		`${chalk.cyanBright('Example:')} ${chalk.magentaBright(
			'planned --add "medical appointment" --day monday --info "Dr. Smith at 2pm"'
		)}`
	)
	console.log(chalk.yellow('Check your schedule for the day'));
	console.log(
		`${chalk.cyanBright('Example:')} ${chalk.magentaBright('planned')}`
	);
	console.log(chalk.yellow('Check your schedule for the week'));
	console.log(
		`${chalk.cyanBright('Example:')} ${chalk.magentaBright(
			'planned --week'
		)}`
	);
	console.log(chalk.yellow('Check your schedule for a specific day'));
	console.log(
		`${chalk.cyanBright('Example:')} ${chalk.magentaBright(
			'planned --day monday'
		)}`
	);
	console.log(
		chalk.yellow(
			'Remember to clear your schedule after finishing all tasks for the week!'
		)
	);
	console.log(
		chalk.cyanBright('Example:'),
		chalk.magentaBright('planned --clear')
	);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tasksPath = path.join(__dirname, 'tasks.json');

const clearTasksForWeek = () => {
	const tasks = {};
	fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
	console.log('Tasks for the week have been cleared.');
};

try {
	const todaySetup = (params) => {
		try {
			if (params['--add']) {
				const tasks = JSON.parse(fs.readFileSync(tasksPath, 'utf8')) || {};
				const { '--add': task, '--day': inputDay, '--info': info } = params; // Changed variable name to inputDay
				if (
					!inputDay || // Updated condition
					!inputDay.toLowerCase() || // Updated condition
					!day.includes(inputDay.toLowerCase()) // Updated condition
				) {
					console.log('Invalid day specified.');
					return;
				}
				if (!tasks[inputDay.toLowerCase()]) {
					tasks[inputDay.toLowerCase()] = [];
				}
				const taskInfo = info ? `: "${info}"` : ''; // Updated line
				tasks[inputDay.toLowerCase()].push(`${task}${taskInfo}`);
				fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
				if (info) {
					console.log(`Task "${task}"${taskInfo} added for ${inputDay}.`); // Updated variable name
				} else {
					console.log(`Task "${task}" added for ${inputDay}.`); // Updated variable name
				}
			} else {
				console.log('Invalid parameter. Please specify a task to add.');
				usage();
			}
		} catch (error) {
			console.error('Error:', error.message);
			usage();
		}
	};

	const readTasksForDay = (params) => {
		const tasks = JSON.parse(fs.readFileSync(tasksPath, 'utf8')) || {};
		const taskList = tasks[params.toLowerCase()];
		if (day.includes(params.toLowerCase())) {
			if (taskList && taskList.length > 0) {
				console.log(`Tasks for ${params}:`);
				taskList.forEach((task, index) => {
					const [taskName, taskInfo] = task.split(':');
					const taskInfoMessage = taskInfo ? `info: "${taskInfo.trim()}"` : '';
					console.log(`${index + 1}: ${taskName.trim()}, ${taskInfoMessage}`);
				});
			} else {
				console.log(
					`No tasks found for ${params === dotw ? 'today' : params}.`
				);
			}
		} else {
			console.log('Invalid parameter. Please specify a day of the week.');
			usage();
		}
	};
	
	const readTasksForWeek = () => {
		const tasks = JSON.parse(fs.readFileSync(tasksPath, 'utf8')) || {};
		for (let i = 0; i < day.length; i++) {
			const taskList = tasks[day[i]];
			if (taskList && taskList.length > 0) {
				console.log(`Tasks for ${day[i]}:`);
				taskList.forEach((task, index) => {
					const [taskName, taskInfo] = task.split(':');
					const taskInfoMessage = taskInfo ? `info: "${taskInfo.trim()}"` : '';
					console.log(`${index + 1}: ${taskName.trim()}, ${taskInfoMessage}`);
				});
			} else {
				console.log(`No tasks found for ${day[i]}.`);
			}
		}
	};
	
	const args = arg({
		'--list': Boolean,
		'--day': String,
		'--info': String,
		'--add': String,
		'--week': Boolean,
		'--help': Boolean,
		'--clear': Boolean,
	});
	
	if (args['--week']) {
		readTasksForWeek();
	} else if (args['--add']) {
		todaySetup(args);
	} else if (args['--day']) {
		const day = args['--day'].toLowerCase();
		readTasksForDay(day);
	} else if (args['--help']) {
		usage();
	} else if (args['--clear']) {
		clearTasksForWeek();
	} else {
		readTasksForDay(dotw);
	}
} catch (error) {
	console.error('Error:', error.message);
	usage();
}
