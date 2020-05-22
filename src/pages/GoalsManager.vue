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
        <div class="container" v-if="goals!=null">
            <center>
                <goal-component v-for="(goal, index) in goals" :label="goal.title" :red-from="goal.redFrom" :red-to="goal.max" :max="goal.max" :yellow-from="goal.yellowFrom" :yellow-to="goal.yellowTo"
                                :value="goal.value"></goal-component>
                <h1>{{currentMonthSum}}</h1>
            </center>
        </div>
    </div>
</template>
<script>
    import {Button, FormGroupInput} from '@/components';
    import GoalComponent from "./components/GoalComponent";
    import TransactionService from "../services/TransactionService";
    import GoalsService from "../services/GoalsService";

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
                currentMonthSum: null,
                goals: null
            };
        },
        created() {
            this.getMonthSum();
        },
        methods: {
            async getMonthSum() {
                const pureGoals = await GoalsService.getUserGoals();
                const result = (await TransactionService.getCurrentMonthSum());
                this.currentMonthSum = result.data.amountSum.value;
                this.goals = this.mapGoalsToViewElements(pureGoals, this.currentMonthSum);
            },

            mapGoalsToViewElements(goals, currentAmount) {
                return goals.map((goal) => ({
                    title: goal.title,
                    id: goal._id,
                    value : currentAmount,
                    redFrom: Math.floor(goal.triggerValue),
                    max: Math.floor(Math.max(goal.triggerValue * 1.30, currentAmount)),
                    yellowFrom: Math.floor(goal.triggerValue * 0.75),
                    yellowTo: Math.floor(goal.triggerValue)
                }))
            }
        }
    };
</script>
<style></style>
