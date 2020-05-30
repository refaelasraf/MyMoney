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
        <div class="container" v-if="!isLoading">
            <center>
                <n-button @click.native="modals.addGoal.isVisible = true">Add Goal</n-button>
                <modal :show.sync="modals.addGoal.isVisible" headerClasses="justify-content-center">
                    <h4 slot="header" class="title title-up">Add goal</h4>
                    <fg-input placeholder="title" v-model="modals.addGoal.goal.title"></fg-input>
                    <fg-input placeholder="trigger value" v-model="modals.addGoal.goal.triggerValue"></fg-input>
                    <template slot="footer">
                        <n-button @click="addGoal">Add goal</n-button>
                        <n-button type="danger" @click.native="modals.addGoal.isVisible = false">Close</n-button>
                    </template>
                </modal>
                <modal :show.sync="modals.editGoal.isVisible" headerClasses="justify-content-center">
                    <h4 slot="header" class="title title-up">Edit goal</h4>
                    <fg-input placeholder="title" v-model="modals.editGoal.goal.title"></fg-input>
                    <fg-input placeholder="trigger value" v-model="modals.editGoal.goal.triggerValue"></fg-input>
                    <template slot="footer">
                        <n-button @click="editGoal">Edit goal</n-button>
                        <n-button type="danger" @click="hideUpdateModal">Close</n-button>
                    </template>
                </modal>
                <goal-component v-for="(goal, index) in goals" :delete-func="deleteGoal" :update-func="showUpdateModal"
                                :goal="goal.pureGoal"
                                :label="goal.title" :red-from="goal.redFrom" :red-to="goal.max" :max="goal.max"
                                :yellow-from="goal.yellowFrom" :yellow-to="goal.yellowTo"
                                :value="goal.value"></goal-component>
            </center>
        </div>
    </div>
</template>
<script>
    import {Button, FormGroupInput, Modal} from '@/components';
    import GoalComponent from "./components/GoalComponent";
    import TransactionService from "../services/TransactionService";
    import GoalsService from "../services/GoalsService";

    export default {
        name: 'goalManager',
        bodyClass: 'goal-manager-page',
        components: {
            GoalComponent,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput,
            [Modal.name]: Modal
        },
        data() {
            return {
                isLoading: false,
                currentMonthSum: null,
                goals: null,
                modals: {
                    classic: false,
                    editProfile: false,
                    editGoal: {
                        isVisible: false,
                        goal: {
                            _id: null,
                            title: null,
                            triggerValue: 0,
                            owner: null,
                            type: null,
                            isActivated: false
                        }
                    },
                    addGoal: {
                        isVisible: false,
                        goal: {
                            title: null,
                            triggerValue: 0,
                            owner: localStorage.userId,
                            type: "amount",
                            isActivated: true
                        }
                    }
                }
            };
        }
        ,
        created() {
            this.getMonthSum();
        }
        ,
        methods: {
            async addGoal() {
                await GoalsService.addGoal(this.modals.addGoal.goal);
                await this.getMonthSum();
                this.restoreAddGoalModal();
            },
            showUpdateModal(goal) {
                this.modals.editGoal.isVisible = true;
                this.modals.editGoal.goal = goal;
            },
            hideUpdateModal() {
                this.modals.editGoal.isVisible = false;
            },
            async editGoal() {
                await GoalsService.editGoal(this.modals.editGoal.goal._id, this.modals.editGoal.goal);
                this.hideUpdateModal();
                await this.getMonthSum()
            },
            restoreAddGoalModal() {
                this.modals.addGoal.isVisible = false;
                this.modals.addGoal.goal.title = null;
                this.modals.addGoal.goal.triggerValue = 0;
            },
            async deleteGoal(id) {
                await GoalsService.deleteGoal(id);
                await this.getMonthSum();
            }
            ,
            async getMonthSum() {
                this.isLoading = true;
                const pureGoals = await GoalsService.getUserGoals();
                const result = (await TransactionService.getCurrentMonthSum());
                this.currentMonthSum = result.data.amountSum.value;
                this.goals = this.mapGoalsToViewElements(pureGoals, this.currentMonthSum);
                this.isLoading = false;
            }
            ,
            mapGoalsToViewElements(goals, currentAmount) {
                return goals.map((goal) => ({
                    pureGoal: goal,
                    title: goal.title,
                    id: goal._id,
                    value: currentAmount,
                    redFrom: Math.floor(goal.triggerValue),
                    max: Math.floor(Math.max(goal.triggerValue * 1.30, currentAmount)),
                    yellowFrom: Math.floor(goal.triggerValue * 0.75),
                    yellowTo: Math.floor(goal.triggerValue)
                }))
            }
        }
    }
    ;
</script>
<style></style>
