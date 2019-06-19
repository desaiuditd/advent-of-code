const fs = require( 'fs' );
const _ = require( 'lodash' );
const axios = require( 'axios' );

require('dotenv').config();

( async () => {
	// const inputFile = './input/1.2.txt';
	// const input = fs.readFileSync( inputFile, 'utf8' );

	const inputUrl = 'https://adventofcode.com/2018/day/1/input';
	const adventSession = process.env.ADVENT_SESSION;
	let input = '';

	try {
		const response = await axios.get(
			inputUrl,
			{
				headers: {
					Cookie: `session=${adventSession};`
				}
			}
		);

		if ( ! response || 200 !== response.status ) {
			console.log( 'no input found.' );
			return;
		}

		input = response.data;
	} catch( e ) {
		console.log( e );
		return;
	}

	const frequencies = _.map(
		_.filter(
			// Extract out individual frequencies.
			input.split( '\n' ),
			// Filter out the empty lines.
			f => ! _.isEmpty( f )
		),
		// Convert into integers.
		f => parseInt( f, 10 )
	);

	// Start from 0.
	let startFrequency = 0;

	const doSum = ( sum, f ) => ( sum + f );

	const computeResultingFrequency = ( frequencies, callback ) => {
		return _.reduce(
			frequencies,
			// Add into the total.
			callback,
			startFrequency
		)
	};
	const resultingFrequency = computeResultingFrequency( frequencies, doSum );

	console.log( resultingFrequency );

	// Add zero as we are starting with zero as the first resulting frequency.
	const frequencyOccurrence = { 0: true };

	let repeatedFrequency = false;

	const doSumAndCheckRepeated = ( sum, f ) => {
		const total = sum + f;

		if ( false === repeatedFrequency && frequencyOccurrence[ total ] ) {
			repeatedFrequency = total;
		} else {
			frequencyOccurrence[ total ] = true;
		}

		return total;
	};

	do {
		let temp = computeResultingFrequency( frequencies, doSumAndCheckRepeated );
		startFrequency = temp;
	} while ( false === repeatedFrequency );

	console.log( repeatedFrequency );
} )();
