<template>
    <Page>
        <ActionBar title="Wizard Profile" class="action-bar">
        </ActionBar>

        <DockLayout>
            <StackLayout dock="top">
                <Button text="Take Profile Picture" @tap="takeProfilePicture()" class="btn btn-primary"></Button>
                <Image v-show="profilePicture"
                       :src="profilePicture"
                       class="img-rounded wizardPicture"
                       @tap="takeProfilePicture()">
                </Image>

                <Label text="Name:" class="text-primary"></Label>
                <TextField hint="name" v-model="name"></TextField>

                <Label text="Powers:" class="text-primary"></Label>
            </StackLayout>

            <Button dock="bottom" text="Share Picture" @tap="sharePicture()" class="btn btn-primary"></Button>
            <Button dock="bottom" text="Share" @tap="share()" class="btn btn-primary"></Button>

            <!--tns plugin add nativescript-pulltorefresh/-->
            <!-- Make sure to register in main.ts -->

            <ListView for="power in powers" class="list-group" @itemTap="onPowerTap($event)">
                <v-template>
                    <StackLayout>
                        <Label :text="`${power.name} : ${power.level}`" class="list-group-item"></Label>
                    </StackLayout>
                </v-template>
            </ListView>

        </DockLayout>
    </Page>
</template>

<script>
import { ImageSource }          from 'tns-core-modules/image-source';

import * as camera              from 'nativescript-camera';
import * as SocialShare         from 'nativescript-social-share';

export default {
	name:       'Wizard',
    data() {
		return {
			name:               '',
			profilePicture:     undefined,
            powers:             [
				{ name: 'Cosmic Manipulation', level: 1, description: 'The power to manipulate all cosmic forces.'},
				{ name: 'Magic Resistance', level: 1, description: 'The power to be highly resistant to Magic. Not to be confused with Magic Immunity.'},
				{ name: 'Telekinesis', level: 1, description: 'User can influence/manipulate/move objects/matter with their mind.'},
				{ name: 'Alchemy', level: 1, description: 'The mystic and scientific pursuit of the power of the Philosopher\'s Stone and Universal Panacea.'},
				{ name: 'Invocation', level: 1, description: 'The ability to gain control over the target\'s life or actions by speaking their name or phrases.'},
				{ name: 'Magic Detection', level: 1, description: 'The ability to sense the presence of magic in one\'s vicinity.'},
				{ name: 'Fiction Manipulation', level: 1, description: 'The power to manipulate anything invented through imaginative and theoretical ideologies.'}
            ]
        };
    },
    methods:    {
		takeProfilePicture() {
			const options = {
                    width:              300,
                    height:             300,
                    keepAspectRatio:    true,
                    saveToGallery:      false
                };

			camera.takePicture( options )
				.then( ( imageAsset ) => {
					this.updateProfilePicture( imageAsset );
				})
                .catch( err => {
				    console.log(err.message);
			    });
		},
		updateProfilePicture( asset ) {
			const imageSource   = new ImageSource();
			imageSource.fromAsset( asset )
				.then( image => {
					this.profilePicture = image;
				});
		},
        share() {
            const messageBody   = `name: ${this.name}, powers: ${JSON.stringify(this.powers)}`;

            // Add social shareText code here

        }

    },
    mounted() {
		camera.requestPermissions();
    }
}

</script>

<style scoped>

.wizardPicture {
    height: 25%;
}

</style>
