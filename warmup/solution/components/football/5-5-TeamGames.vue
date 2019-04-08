<template>
    <Page>
        <ActionBar title="Spiele" icon="" class="action-bar">
        </ActionBar>
        <StackLayout>
            <ListView for="game in games">
                <v-template>
                    <Fixture :game="game" />
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
import Fixture                      from './Fixture';
import { footballService }          from '../../services/football.service';

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
    components:     {
    	Fixture
    },
    async beforeMount() {
        let data        = await footballService.getGames( this.competitionId, this.teamId );
        this.games      = data;
    }
}
</script>
