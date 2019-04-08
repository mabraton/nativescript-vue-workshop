/* global */
import { Http } 			from "@billow/nsv-http";

const http			= new Http({
	// Configure a base url for all requests
	baseUrl:    'https://www.openligadb.de',
	headers:    {
		'Content-Type':     'application/json',
		'Accept':           'application/json;charset=utf-8'
	}
});

export const footballService = {
	getTeams
};

async function getTeams( teamId ) {

	try {
		let data    = await doRequest( `/api/getavailableteams/${teamId}/2018` );

		return data;
	}
	catch(err) {
		log( 'Error login', err );
		throw err;
	}
}

function doRequest( url ) {
	return new Promise( function( resolve, request ) {
		http.get(
			url,
			resp => {
				resolve( resp.content );
			},
			err => {
				reject( err );
			}
		);
	});
}