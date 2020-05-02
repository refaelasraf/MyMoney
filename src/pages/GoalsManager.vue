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
            <goal-component></goal-component>
                <goal-component></goal-component>
                <goal-component></goal-component>
                <goal-component></goal-component>
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
