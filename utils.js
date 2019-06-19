const axios = require( 'axios' );
const fs    = require( 'fs' );

const getInput = async ( {
	inputUrl  = '',
	isLocal   = false,
	localPath = ''
} ) => {
	let input = '';

	if ( isLocal ) {
		if ( localPath ) {
			input = fs.readFileSync( localPath, 'utf8' );
		}
		return input;
	}

	if ( ! inputUrl ) {
		return input;
	}

	try {
		const response = await axios.get(
			inputUrl,
			{
				headers: {
					Cookie: `session=${process.env.ADVENT_SESSION};`
				}
			}
		);

		if ( response && 200 === response.status ) {
			input = response.data;
		}
	} catch( e ) {
		console.log( e );
	}

	return input;
};

module.exports = { getInput };
