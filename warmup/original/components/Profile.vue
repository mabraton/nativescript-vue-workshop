<template>
    <Page>
        <ActionBar title="Profile"></ActionBar>
        <TabView>
            <TabViewItem title="UI Components">
                <StackLayout>
                    <Label text="Add your code here" />
                </StackLayout>
            </TabViewItem>
            <TabViewItem title="DataForm">
                <GridLayout rows="*, auto, auto">
                    <RadDataForm :source="profile" :metadata="profileMetadata" row="0"></RadDataForm>

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
                profileMetadata:    {
                    propertyAnnotations: [
                        {
                            name:           'name',
                            displayName:    'Name'
                        },
                        {
                            name:           'password',
                            displayName:    'Passwort',
                            editor:         DataFormEditorType.Password
                        },
                        {
                            name:           'dob',
                            displayName:    'Geburtsdatum',
                            editor:         DataFormEditorType.DatePicker
                        },
                        {
                            name:           'codingPower',
                            displayName:    'Prog.Kenntnisse',
                            editor:         DataFormEditorType.Number
                        }
                    ]
                }
            }
        },
        methods:    {
            clear() {
                this.profile       = {
                    name:           '',
                    street:         '',

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

    .drawer-header {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background-color: #53ba82;
        color: #ffffff;
        font-size: 24;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 16;
    }
</style>
