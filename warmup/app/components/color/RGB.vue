<template>
    <Page>
        <ActionBar :title="'RGB ' + color" color="white" backgroundColor="blue">
        </ActionBar>

        <StackLayout>
            <Button text="Go Blue"  @tap="goBlue()" class="btn blue"></Button>
            <Button text="Go Red"   @tap="goRed()"  class="btn red"></Button>
            <Button text="Go Home"  @tap="goHome()" class="btn btn-primary"></Button>
            <Button text="Go Back"  @tap="goBack()" class="btn btn-outline"></Button>
        </StackLayout>
    </Page>
</template>

<script>

export default {
	name:       'rgb',
    data()      {
		return {
			pink:       '#FF0088'
        }
    },
    props:      {
		color:      String
    },
    methods:    {
		goBlue()     {
			this.$goto( 'blue' );
		},
		goGray()     {
			this.$goto( 'red' );
		},
		goBack()     {
			this.$navigateBack();
		},
		goHome()     {
			this.$goto( 'home', {
				clearHistory:       true
			} );
		}
    }
}
</script>