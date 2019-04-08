<template>
    <StackLayout>
        <GridLayout rows="auto" columns="30, *, 30, 30, 30, 30, 40, 40">
            <Label col="0" text="#" class="text-center text-primary"></Label>
            <Label col="1" text="Name"class="text-left text-primary"></Label>
            <Label col="2" text="P" class="text-center text-primary"></Label>
            <Label col="3" text="W" class="text-center text-primary"></Label>
            <Label col="4" text="D" class="text-center text-primary"></Label>
            <Label col="5" text="L" class="text-center text-primary"></Label>
            <Label col="6" text="GD" class="text-center text-primary"></Label>
            <Label col="7" text="PT" class="text-center text-primary"></Label>
        </GridLayout>

        <!-- attach to itemTap event and call onTeamSelected($event) -->
        <ListView for="team in teams" class="list-group" @itemTap="getTeam($event)">
            <v-template>
                <GridLayout rows="30" columns="30, *, 30, 30, 30, 30, 40, 40">
                    <Label col="0" :text="team.position" class="text-center"></Label>
                    <Label col="1" :text="team.TeamName"></Label>
                    <Label col="2" :text="team.Matches" class="text-center"></Label>
                    <Label col="3" :text="team.Won" class="text-center"></Label>
                    <Label col="4" :text="team.Draw" class="text-center"></Label>
                    <Label col="5" :text="team.Lost" class="text-center"></Label>
                    <Label col="6" :text="team.GoalDiff" class="text-center"></Label>
                    <Label col="7" :text="team.Points" class="text-center"></Label>
                </GridLayout>
            </v-template>
        </ListView>

    </StackLayout>
</template>

<script>
import { footballService }          from '../../services/football.service';

import _                            from 'underscore';

export default {
    name:           "TableLeague",
    data()          {
    	return {
            teams:      []
        };
    },
    props:          {
		competitionId:      String
    },
    methods:        {
        getTeam( event ) {
            this.$goto( 'teamGames', { props: { competitionId: this.competitionId, teamId: event.item.TeamInfoId } } );
        }
    },
    async beforeMount() {
    	let data        = await footballService.getTable( this.competitionId );
    	this.teams      = _.map( data, (item, index) => {
    		item.position       = index;
    		return item;
        });
    }
}
</script>
