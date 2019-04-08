<template>
    <page>
        <ActionBar title="Service Test" class="action-bar">
        </ActionBar>
        <StackLayout>
            <Button text="Get WM Teams 2018"            @tap="getWMTeams()" class="btn btn-primary"></Button>
            <Button text="Get Spielergebnisse WM2018"   @tap="getWMGames()" class="btn btn-primary"></Button>
            <Button text="Get Tabelle WM2018"           @tap="getWMTable()" class="btn btn-primary"></Button>
            <Button text="Get Bundesliga Teams"         @tap="getBLTeams()" class="btn btn-primary"></Button>
            <Button text="Get Bundesliga Ergebnisse"    @tap="getBLGames()" class="btn btn-primary"></Button>
            <Button text="Get Bundesliga Tabelle"       @tap="getBLTable()" class="btn btn-primary"></Button>
        </StackLayout>
    </page>
</template>

<script>
import { Http } 			from "@billow/nsv-http";

const http			= new Http({
    // Configure a base url for all requests
    baseUrl:    'https://www.openligadb.de',
    headers:    {
        'Content-Type':     'application/json',
        'Accept':           'application/json;charset=utf-8'
    }
});

// WM2018               fifa18
// Bundesliga           bl1
// Champions League     cl2018

// Teams                getavailableteams
// Spielergebnisse      getmatchdata
// Tabelle              getbltable

export default {
	name:           'service-test',
    data()          {
		return {

        };
    },
    methods:        {
		getWMTeams() {
			doRequest( '/api/getavailableteams/fifa18/2018' );
        },
		getWMGames() {
			doRequest( '/api/getmatchdata/fifa18/2018' );
		},
		getWMTable() {
			doRequest( '/api/getbltable/fifa18/2018' );
		},
		getBLTeams() {
			doRequest( '/api/getavailableteams/bl1/2018' );
		},
		getBLGames() {
			doRequest( '/api/getmatchdata/bl1/2018' );
		},
		getBLTable() {
			doRequest( '/api/getbltable/bl1/2018' );
		}
    }
}

function doRequest( url ) {
    http.get(
        url,
        resp => {
            console.log( resp.content );
        },
        err => {
            console.log( 'Error', err );
        }
    );
}
</script>