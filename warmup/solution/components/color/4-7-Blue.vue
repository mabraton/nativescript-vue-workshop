<template>
    <Page>
        <ActionBar title="BLUE" color="white" backgroundColor="blue">
        </ActionBar>

        <StackLayout>
            <Button text="Go Red"   @tap="goRed()"  class="btn red"></Button>
            <Button text="Go Pink"  @tap="goPink()" class="btn pink"></Button>
            <Button text="Go Home"  @tap="goHome()" class="btn btn-primary"></Button>
            <Button text="Go Back"  @tap="goBack()" class="btn btn-outline"></Button>
        </StackLayout>
    </Page>
</template>

<script lang="ts">

export default {
	name:       'blue',
    data()      {
		return {
			pink:       '#FF0088'
        }
    },
    methods:    {
		goRed()     {
            this.$goto( 'blue' );
        },
		goPink()     {
            this.$goto( 'rgb', { props: { color: 'pink' } } );
		},
        goBack()     {
            this.$navigateBack();
        },
        goHome()     {
            this.$goto( 'home', {
                clearHistory:       true
            } );
        }
    },
    created() {
		console.log( 'blue created' );
    }
}
</script>