const fs = require( 'fs' );
const _ = require( 'lodash' );
const axios = require( 'axios' );

require('dotenv').config();

( async () => {
	// const inputFile = './input/2.2.txt';
	// const input = fs.readFileSync( inputFile, 'utf8' );

	const inputUrl = 'https://adventofcode.com/2018/day/2/input';
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

	const ids = _.filter(
		// Extract out individual frequencies.
		input.split( '\n' ),
		// Filter out the empty lines.
		f => ! _.isEmpty( f )
	);

	let twos = 0;
	let threes = 0;

	for ( id of ids ) {
		const letterMap = {};
		for( letter of id ) {
			if ( ! letterMap[ letter ] ) {
				letterMap[ letter ] = 0;
			}
			letterMap[ letter ] = letterMap[ letter ] + 1;
		}

		if ( _.includes( letterMap, 2 ) ) { twos++; }
		if ( _.includes( letterMap, 3 ) ) { threes++; }
	}

	console.log( twos * threes );

	const sortedIds = _.clone( ids ).sort();

	for ( let i = 1; i < sortedIds.length; i++ ) {

		const cur  = sortedIds[ i ];
		const prev = sortedIds[ i - 1 ];

		if ( prev.length !== cur.length ) {
			continue;
		}

		let commonLetters = '';
		let diffLettersCnt = 0;
		for ( let j = 0; j < cur.length; j++ ) {
			if ( prev[ j ] === cur[ j ] ) {
				commonLetters += cur[ j ];
			} else {
				diffLettersCnt++;
			}

			if ( diffLettersCnt > 1 ) {
				break;
			}
		}

		if ( 1 === diffLettersCnt ) {
			console.log( commonLetters );
			break;
		}
	}
} )();
