<template>
    <Page>
        <ActionBar title="Football Leagues" icon="" class="action-bar">
        </ActionBar>

        <TabView selectedColor="#FF0000" class="m-l-5 m-r-5">
            <TabViewItem title="WM">
                <StackLayout>
                    <Button @tap="$goto( 'fixtures' )"
                            text="View Fixtures"
                            class="btn btn-primary">
                    </Button>
                    <TableLeague :competitionId="WorldChampId" @teamSelected="onTeamTap($event)"></TableLeague>
                </StackLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
import TableLeague                  from './TableLeague';

export default {
	name:           'tables',
    data()          {
		return {
			WorldChampId:       'fifa18',
		    BundesligaId:       'bl1',
		    ChampLeagueId:      'cl2018'
		};
    },
    components:         {
		TableLeague
    },
    methods:            {
		onTeamTap( team ) {
			console.log( team );
        }
    }
}
</script>