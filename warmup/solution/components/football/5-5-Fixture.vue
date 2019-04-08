<template>
    <GridLayout rows="auto" columns="*, auto, *" class="list-group-item">
        <Label col="0" text="homeTeamName" class="h4 text-right"></Label>

        <StackLayout col="1"  horizontalAlignment="center">

            <StackLayout orientation="horizontal">
                <Label text="0" class="score m-r-5"></Label>
                <Label text="0" class="score"></Label>
            </StackLayout>

        </StackLayout>

        <Label col="2" text="guestTeamName" class="h4 text-left"></Label>
    </GridLayout>
</template>

<script>
import * as moment                  from 'moment';

moment.locale('de');

export default {
    name:           "Fixture",
    data()          {
        return {
        	game:       {}
        };
    },
    methods:            {
        timeFormat( item ) {
            return moment( item ).format( 'HH:mm' );
        },
        dateFormat( item ) {
            return moment( item ).format( 'dd-MMM' );
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