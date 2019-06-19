#!/usr/bin/env node

const chalk    = require( 'chalk' );
const figlet   = require( 'figlet' );
const inquirer = require('inquirer');
const minimist = require( 'minimist' );

const validYears = [ 2018 ];
const validDays  = [ 1, 2, 3 ];

const yearQuestion = {
	type: 'list',
	name: 'year',
	message: 'Which year\'s event do you want to run?',
	choices: validYears,
	default: 2018,
	validate: input => {
		if ( ! input ) {
			return 'Choosing a year is mandatory. Choose a year.';
		}

		return true;
	}
};

const dayQuestion = {
	type: 'list',
	name: 'day',
	message: 'Which day\'s puzzle do you want to run?',
	choices: validDays,
	default: 2018,
	validate: input => {
		if ( ! input ) {
			return 'Choosing a day is mandatory. Choose a day.';
		}

		return true;
	}
};

const promptYear = async ( y, year ) => {
	if (
		(
			// y is not passed
			false === y &&
			(
				// year is not passed
				false === year ||
				// invalid year passed
				'number' !== typeof year
			)
		) ||
		(
			// year not passed
			false === year &&
			(
				// y not passed
				false === y ||
				// invalid y passed
				'number' !== typeof y
			)
		)
	) {
		const answers = await inquirer.prompt( [ yearQuestion ] );
		year = answers.year;
	} else if ( false === year ) {
		// hopefully, y is guaranteed to be present and guaranteed to be a number.
		year = y;
	}

	if ( ! validYears.includes( year ) ) {
		const answers = await inquirer.prompt( [ yearQuestion ] );
		year = answers.year;
	}

	return year;
}

const promptDay = async ( d, day ) => {
	if (
		(
			// d is not passed
			false === d &&
			(
				// day is not passed
				false === day ||
				// invalid day passed
				'number' !== typeof day
			)
		) ||
		(
			// day not passed
			false === day &&
			(
				// d not passed
				false === d ||
				// invalid d passed
				'number' !== typeof d
			)
		)
	) {
		const answers = await inquirer.prompt( [ dayQuestion ] );
		day = answers.day;
	} else if ( false === day ) {
		// hopefully, d is guaranteed to be present and guaranteed to be a number.
		day = d;
	}

	if ( ! validDays.includes( day ) ) {
		const answers = await inquirer.prompt( [ dayQuestion ] );
		day = answers.day;
	}

	return day;
}

( async () => {
	console.log(
		chalk.bold.blueBright(
			figlet.textSync( 'Advent of Code' )
		)
	);

	const args = minimist( process.argv.slice( 2 ) );

	let {
		d    = false,
		day  = false,
		y    = false,
		year = false,
	} = args;

	year = await promptYear( y, year );
	day  = await promptDay( d, day );

	require( `./${year}/day-${day}` );
} )();
