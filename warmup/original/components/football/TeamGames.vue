<template>
    <Page>
        <ActionBar title="Spiele" icon="" class="action-bar">
        </ActionBar>
        <StackLayout>
            <ListView for="game in games">
                <v-template>
                    <GridLayout rows="auto" columns="*, auto, *" class="list-group-item">
                        <Label col="0" :text="game.Team1.TeamName" class="h4 text-right"></Label>

                        <StackLayout col="1"  horizontalAlignment="center">

                            <StackLayout orientation="horizontal">
                                <Label :text="game.MatchResults[0].PointsTeam1" class="score m-r-5"></Label>
                                <Label :text="game.MatchResults[0].PointsTeam2" class="score"></Label>
                            </StackLayout>

                        </StackLayout>

                        <Label col="2" :text="game.Team2.TeamName" class="h4 text-left"></Label>
                    </GridLayout>
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
	import { footballService }          from '../../services/football.service';

	import _                            from 'underscore';
	import * as moment                  from 'moment';

	moment.locale('de');

	export default {
		name:           "TableGames",
		data()          {
			return {
				games:      []
			};
		},
		props:          {
			competitionId:      String,
			teamId:             Number
		},
		methods:            {
			timeFormat( item ) {
				return moment( item ).format( 'HH:mm' );
			},
			dateFormat( item ) {
				return moment( item ).format( 'dd-MMM' );
			}
		},
		async beforeMount() {
			console.log( 'games', this.competitionId, this.teamId );
			let data        = await footballService.getGames( this.competitionId, this.teamId );
			this.games      = data;
			console.log( this.games.length );
		}
	}
</script>

<style scoped>

    .h4 {
        font-size: large;
        margin-left: 10px;
        margin-right: 10px;
    }

    .score {
        border-color: blue;
        color: blue;
        border-width:1;
        width: 20;
        text-align: center;
        padding: 2;
    }


</style>