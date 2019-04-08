<template>
    <Page>
        <ActionBar title="Profile"></ActionBar>
        <TabView>
            <TabViewItem title="UI Components">
                <ScrollView>
                    <StackLayout class=""form m-l-5>
                        <Label text="Name:" class="text-primary"></Label>
                        <TextField
                                v-model="profile.name"
                                hint="name">
                        </TextField>

                        <Label text="Passwort:" class="text-primary"></Label>
                        <TextField
                                v-model="profile.password"
                                hint="password"
                                secure="true">
                        </TextField>

                        <Label :text="'Vue Pro: ' + (profile.vuePro ? 'Ja' : 'Nein')" class="text-primary"></Label>
                        <Switch
                                v-model="profile.vuePro"
                                class="switch"
                                horizontalAlignment="center">
                        </Switch>

                        <Label :text="'Geburtsdatum: ' + profile.dob.toLocaleDateString()" class="text-primary"></Label>
                        <DatePicker
                                v-model="profile.dob">
                        </DatePicker>

                        <Label :text="'Coding power:' + profile.codingPower" class="text-primary" :class="{ spin: profile.codingPower > 7 }"></Label>
                        <Slider
                                v-model="profile.codingPower"
                                :minValue="0"
                                :maxValue="10"
                                class="slider"
                                :class="{ 'danger-slider': profile.codingPower > 7 }">
                        </Slider>

                        <Button text="Save" @tap="save()" class="btn btn-primary"></Button>
                        <Button text="Clear" @tap="clear()" class="btn btn-outline"></Button>
                    </StackLayout>
                </ScrollView>
            </TabViewItem>
            <TabViewItem title="DataForm">
                <GridLayout rows="*, auto, auto">
                    <RadDataForm :source="feedback" row="0"></RadDataForm>

                    <Button text="Save" @tap="save()" class="btn btn-primary" row="1"></Button>
                    <Button text="Clear" @tap="clear()" class="btn btn-primary" row="2"></Button>
                </GridLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script lang="ts">
    import { DataFormEditorType, DataFormValidationMode, DataFormCommitMode } from 'nativescript-ui-dataform';

    export default {
        data() {
            return {
                profile:        {
                    name:           'Joe',
                    password:       'bl0gs',
                    vuePro:         false,
                    dob:            new Date(),
                    codingPower:    1
                },
                feedback:        {
                    title:      'Amazing Results',
                    score:      5,
                    date:       new Date(),
                    component:  'DataForm',
                    note:       `This looks really great, I was really amazed how little effort it took to implement it. I can't wait to see other components`,
                    test:       false
                },
                components:     [
                    'DataForm',
                    'SideDrawer',
                    'Calendar',
                    'ListView',
                    'Gauge',
                    'AutoComplete'
                ]
            }
        },
        methods:    {
            clear() {
                this.profile       = {
                    name:           '',
                    street:         '',
                    vuePro:         false,
                    dob:            new Date(),
                    codingPower:    1
                };
            }
        }
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .title {
        text-align: left;
        padding-left: 16;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .danger-slider {
        background-color: red;
    }

    .spin {
        animation-name: spin;
        animation-duration: 2s;
    }

    @keyframes zoom {
        from { transform: scale(0.5, 0.5) }
        40% { transform: scale(1.6, 1.6) }
        to {  transform: scale(1.0,1.0) }
    }

    @keyframes spin {
        from { transform: rotate(-30) }
        40% { transform: rotate(420) }
        to {  transform: rotate(0)}
    }
</style>
