<template>
    <Page>
        <ActionBar title="Color" class="action-bar">
        </ActionBar>

        <StackLayout>
            <Button @tap="$goto( 'blue', { transition: 'curl' } )"
                    text="Open Blue"
                    class="btn blue">
            </Button>

            <Button @tap="$goto( 'red', { transition: 'fade' } )"
                    text="Open Red"
                    class="btn red">
            </Button>

            <Button @tap="$goto( 'rgb', { transition: 'flip', props: { color: 'pink' } } )"
                    text="Open RGB (pink)"
                    class="btn pink">
            </Button>

            <Button @tap="$goto( 'rgb', { transition: 'flip', props: { color: 'gray' } } )"
                    text="Open RGB (gray)"
                    class="btn gray">
            </Button>

        </StackLayout>
    </Page>
</template>

<script>

	export default {
		name:       'myColor',
        data()      {
			return {};
        }
	}

</script>

<style>
    .blue {
        background-color: blue;
        color: white;
    }

    .red {
        background-color: red;
        color: white;
    }

    .pink {
        background-color: #ff0088;
        color: white;
    }

    .gray {
        background-color: gray;
        color: white;
    }

    /* styles with outline

    .blue {
      border-color: blue;
      color: blue;
      border-width:1;
    }

    .red {
      border-color: red;
      color: red;
      border-width:1;
    }

    .pink {
      border-color: #ff0088;
      color: #ff0088;
      border-width:1;
    }

    .gray {
      border-color: gray;
      color: gray;
      border-width:1;
    }
    */
</style>