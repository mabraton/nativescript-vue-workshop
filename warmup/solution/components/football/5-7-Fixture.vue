<template>
    <GridLayout rows="auto" columns="*, auto, *" class="list-group-item" @tap="selectGame()">
        <Label col="0" :text="game.Team1.TeamName" class="h4 text-right"></Label>

        <StackLayout col="1"  horizontalAlignment="center">

            <StackLayout orientation="horizontal">
                <Label :text="game.MatchResults[1].PointsTeam1" class="score m-r-5"></Label>
                <Label :text="game.MatchResults[1].PointsTeam2" class="score"></Label>
            </StackLayout>

        </StackLayout>

        <Label col="2" :text="game.Team2.TeamName" class="h4 text-left"></Label>
    </GridLayout>
</template>

<script>
import EventBus                     from '../../helpers/EventBus';

import * as moment                  from 'moment';

moment.locale('de');

export default {
    name:           "Fixture",
    data()          {
        return {
        };
    },
    props:          {
        game:           Object
    },
    methods:            {
        timeFormat( item ) {
            return moment( item ).format( 'HH:mm' );
        },
        dateFormat( item ) {
            return moment( item ).format( 'dd-MMM' );
        },
        selectGame() {
            EventBus.$emit( 'selectGame', this.game );
        }
    }
}
</script>

<style>

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