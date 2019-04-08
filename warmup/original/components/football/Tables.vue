<template>
    <Page>
        <ActionBar title="Football Leagues" icon="" class="action-bar">
        </ActionBar>

        <TabView selectedColor="#FF0000" class="m-l-5 m-r-5">
            <StackLayout *tabItem="{title: 'Premier League'}">
                <Button @tap="$goto( 'fixtures' )"
                        text="View Fixtures"
                        class="btn btn-primary">
                </Button>
<!--                <my-league-table [competitionId]="PremierLeagueId" (teamSelected)="onTeamTap($event)"></my-league-table>-->
            </StackLayout>

            <StackLayout *tabItem="{title: 'Primera Division'}">
                <Button @tap="$goto( 'fixtures' )"
                        text="View Fixtures"
                        class="btn btn-primary">
                </Button>
<!--                <my-league-table [competitionId]="PrimeraDivisionId" (teamSelected)="onTeamTap($event)"></my-league-table>-->
            </StackLayout>

            <StackLayout *tabItem="{title: 'Bundesliga'}">
                <Button @tap="$goto( 'fixtures' )"
                        text="View Fixtures"
                        class="btn btn-primary">
                </Button>
<!--                <my-league-table [competitionId]="BundesligaId" (teamSelected)="onTeamTap($event)"></my-league-table>-->
            </StackLayout>

            <StackLayout *tabItem="{title: 'Serie A'}">
                <Button @tap="$goto( 'fixtures' )"
                        text="View Fixtures"
                        class="btn btn-primary">
                </Button>
<!--                <my-league-table [competitionId]="SerieAId" (teamSelected)="onTeamTap($event)"></my-league-table>-->
            </StackLayout>
        </TabView>
    </Page>
</template>

<script>
import { footballService }          from '../../services/football.service';

export default {
	name:           'tables',
    data()          {
		return {
			WorldChampId:       4198,
		    BundesligaId:       4276,
		    SerieAId:           4280,
		    ChampLeagueId:      4183
		};
    },
    async beforeMount() {
		try {
			let data        = await footballService.getTeams( 'fifa18' );
			console.log( data );
        }
        catch( err ) {
			console.log( err );
        }
    }
}
</script>