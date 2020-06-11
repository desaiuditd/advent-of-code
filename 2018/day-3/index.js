const _ = require( 'lodash' );

const { getInput } = require( '../../utils' );

( async () => {
	console.log( `${__dirname}/input/3.1.txt` );
	const input = await getInput( {
		isLocal: true,
		localPath: `${__dirname}/input/3.1.txt`
		// inputUrl: 'https://adventofcode.com/2018/day/3/input'
	} );

	const claims = _.map(
		_.filter(
			// Extract out individual frequencies.
			input.split( '\r\n' ),
			// Filter out the empty lines.
			f => ! _.isEmpty( f )
		),
		claim => {
			const attrs  = claim.split( ' ' );
			const id     = attrs[0].slice( 1 );
			let   offset = attrs[2].slice( 0, attrs[2].length - 1 ).split( ',' );
			let   dims   = attrs[3].split( 'x' );

			offset = { left: offset[0], top: offset[1] };
			dims   = { w: dims[0], h: dims[1] };

			return { id, offset, dims };
		}
	);

	console.log( claims );
} )();
