# Planned

Organize your week with ease!

Planned is a command-line tool that helps you plan and manage your tasks for the week in a minimalistic approach to avoid distractions and overwhelming schedules.

Stay organized by adding tasks and chores for specific days, checking your daily or weekly schedule.

## Features

-   Add tasks or chores for a specific day of the week
-   Check your schedule for the day
-   Check your schedule for the entire week
-   Clear your weekly tasks when you're ready to start fresh

## Installation

To install Planned, use the following command:

```shell
npm install -g planned
```

## Usage

### Add a Task

To add a task or chore for a specific day of the week, use the add command:

```shell
planned add --task "Fix icons on iOS" --day monday
```

This will add the task "Fix icons on iOS" for Monday.

### Check Daily Schedule

To check your schedule for the day, simply run the planned command without any additional parameters:

```shell
planned
```

This will display your tasks for the current day.

### Check Weekly Schedule

To check your schedule for the entire week, use the week option:

```shell
planned --week
```

This will display your tasks for each day of the week.

### Clear Weekly Tasks

```shell
planned --clear
```

This will clear your weekly tasks.

## Help

For additional information and available options, use the --help command:

```shell
planned --help
```

## License

This project is licensed under the MIT License.

## Contributing

The amount of code is small but feel free to contribute to this project by submitting a pull request to the [GitHub repository](https://github.com/thiago-lcarvalho/planned)!
