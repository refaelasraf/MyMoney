<template>
    <div>
        <div class="page-header page-header-small">
            <parallax
                    class="page-header-image"
                    style="background-image: url('img/bg5.jpg')"
            >
            </parallax>
            <div class="content-center">
                <div class="container">
                    <h1 class="title">Manage your Goals</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <center>
                <goal-component label="Goal 1" :red-from="60" :red-to="80" :yellow-from="40" :yellow-to="59" :value="43"></goal-component>
                <goal-component label="Goal 2" :red-from="90" :red-to="100" :yellow-from="40" :yellow-to="89" :value="10"></goal-component>
                <goal-component label="Goal 3" :red-from="60" :red-to="80" :yellow-from="40" :yellow-to="59" :value="25"></goal-component>
                <goal-component label="Goal 4" :red-from="60" :red-to="80" :yellow-from="40" :yellow-to="59" :value="80"></goal-component>
            </center>
        </div>
    </div>
</template>
<script>
    import { Button, FormGroupInput } from '@/components';
    import GoalComponent from "./components/GoalComponent";

    export default {
        name: 'goalManager',
        bodyClass: 'goal-manager-page',
        components: {
            GoalComponent,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput
        },
        data() {
            return {
            };
        }
    };
</script>
<style></style>
