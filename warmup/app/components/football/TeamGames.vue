<template>
    <Page>
        <ActionBar title="Spiele" icon="" class="action-bar">
        </ActionBar>

        <StackLayout>
            <ListView for="game in games" class="list-group">
                <v-template>
                    <Fixture :game="game" />
                </v-template>
            </ListView>

            <GridLayout rows="20, 20, *" columns="140, *" v-if="actGame.Group">
                <Label text="Gruppe:" class="text-primary" row="0" col="0"></Label>
                <TextField :text="actGame.Group.GroupName" row="0" col="1" />
                <Label text="Mannschaften:" class="text-primary" row="1" col="0"></Label>
                <TextField :text="`${actGame.Team1.TeamName} : ${actGame.Team2.TeamName}`" row="1" col="1" />
                <ScrollView row="2" col="0" colSpan="2">
                    <StackLayout>
                        <ListView for="tor in actGame.Goals" class="list-group">
                            <v-template>
                                <GridLayout rows="auto" columns="50, 50, 50, *" class="list-group-item">
                                    <Label col="0" :text="tor.ScoreTeam1" class="text-primary"></Label>
                                    <Label col="1" :text="tor.ScoreTeam2" class="text-primary"></Label>
                                    <Label col="2" :text="tor.MatchMinute" class="text-primary"></Label>
                                    <Label col="3" :text="tor.GoalGetterName" class="text-primary"></Label>
                                </GridLayout>
                            </v-template>
                        </ListView>
                    </StackLayout>
                </ScrollView>
            </GridLayout>

        </StackLayout>
    </Page>
</template>

<script>
import EventBus                     from '../../helpers/EventBus';

import Fixture                      from './Fixture';
import { footballService }          from '../../services/football.service';

export default {
    name:           'TableGames',
    data()          {
        return {
            games:      [],
            actGame:    {}
        };
    },
    props:          {
        competitionId:      String,
        teamId:             Number
    },
    components:     {
    	Fixture
    },
    methods:        {
        showGame( game ) {
        	console.log( game.MatchID );
        	this.actGame    = game;
        }
    },
    async beforeMount() {
        // add listeners
        EventBus.$on( 'selectGame',    this.showGame );

        let data        = await footballService.getGames( this.competitionId, this.teamId );
        this.games      = data;
    },
    destroyed() {
        // remove listeners
        EventBus.$off( 'selectGame',    this.showGame );
    }
}
</script>
