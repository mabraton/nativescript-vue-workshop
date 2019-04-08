/* global */
import { Http } 			from "@billow/nsv-http";
import _					from 'underscore';

const http			= new Http({
	// Configure a base url for all requests
	baseUrl:    'https://www.openligadb.de',
	headers:    {
		'Content-Type':     'application/json',
		'Accept':           'application/json;charset=utf-8'
	}
});

export const footballService = {
	getTeams,
	getTable,
	getGames
};

async function getTeams( leagueId ) {

	try {
		let data    = await doRequest( `/api/getavailableteams/${leagueId}/2018` );

		return data;
	}
	catch(err) {
		log( 'Error login', err );
		throw err;
	}
}

async function getTable( leagueId ) {

	try {
		let data    = await doRequest( `/api/getbltable/${leagueId}/2018` );

		return data;
	}
	catch(err) {
		throw err;
	}
}

async function getGames( leagueId, teamId ) {

	try {
		let data    = await doRequest( `/api/getmatchdata/${leagueId}/2018` );
		return _.filter( data, (game) => game.Team1.TeamId == teamId || game.Team2.TeamId == teamId );
	}
	catch(err) {
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