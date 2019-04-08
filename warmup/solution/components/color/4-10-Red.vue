<template>
    <Page>
        <ActionBar title="RED" color="white" backgroundColor="blue">
        </ActionBar>

        <StackLayout>
            <Button text="Go Blue"  @tap="goBlue()" class="btn blue"></Button>
            <Button text="Go Gray"  @tap="goGray()" class="btn gray"></Button>
            <Button text="Go Home"  @tap="goHome()" class="btn btn-primary"></Button>
            <Button text="Go Back"  @tap="goBack()" class="btn btn-outline"></Button>
        </StackLayout>
    </Page>
</template>

<script>

export default {
	name:       'blue',
    data()      {
		return {
			pink:       '#FF0088'
        }
    },
    methods:    {
		goBlue()     {
            this.$goto( 'blue', {
            	transition:         {
            		name:               'slideTop',
                    duration:           2000,
                    curve:              'spring'
				}
            } );
        },
		goGray()     {
            this.$goto( 'rgb', {
            	props:              {
            		color:              'gray'
            	},
				transition: {
					name:               'fade',
					duration:           1000
				}
            } );
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