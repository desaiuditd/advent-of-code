#!/usr/bin/env node

const chalk    = require( 'chalk' );
const figlet   = require( 'figlet' );
const inquirer = require('inquirer');
const minimist = require( 'minimist' );

const validChoices = {
	day:  [ 1, 2, 3 ],
	year: [ 2018 ]
};

/**
 * @param {*} short short argument. d or y.
 * @param {*} long  long argument. day or year.
 * @param {*} type  day or year.
 */
const prompt = async ( short, long, type ) => {
	const question = {
		type: 'list',
		name: type,
		message: `Which ${type}'s puzzle do you want to run?`,
		choices: validChoices[ type ],
		validate: input => {
			if ( ! input ) {
				return `Choosing a ${type} is mandatory. Choose a ${type}.`;
			}

			return true;
		}
	};

	if (
		(
			// short is not passed
			false === short &&
			(
				// long is not passed
				false === long ||
				// invalid long passed
				'number' !== typeof long
			)
		) ||
		(
			// long not passed
			false === long &&
			(
				// short not passed
				false === short ||
				// invalid short passed
				'number' !== typeof short
			)
		)
	) {
		const answers = await inquirer.prompt( [ question ] );
		long = answers[ type ];
	} else if ( false === long ) {
		// hopefully, short is guaranteed to be present and guaranteed to be a number.
		long = short;
	}

	if ( ! validChoices[ type ].includes( long ) ) {
		const answers = await inquirer.prompt( [ question ] );
		long = answers[ type ];
	}

	return long;
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

	year = await prompt( y, year, 'year' );
	day  = await prompt( d, day, 'day' );

	require( `./${year}/day-${day}` );
} )();
