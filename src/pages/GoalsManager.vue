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
                    <fg-input placeholder="title" maxlength="10" v-model="modals.addGoal.goal.title"></fg-input>
                    <fg-input placeholder="trigger value" type="number"   v-model="modals.addGoal.goal.triggerValue"></fg-input>
                    <el-select class="select-danger"
                               placeholder="Single Select"
                               v-model="modals.addGoal.goal.category">
                        <el-option v-for="option in categories.all"
                                   class="select-danger"
                                   :value="option.value"
                                   :label="option.label"
                                   :key="option.label">
                        </el-option>
                    </el-select>
                    <template slot="footer">
                        <n-button @click="addGoal">Add goal</n-button>
                        <n-button type="danger" @click.native="modals.addGoal.isVisible = false">Close</n-button>
                    </template>
                </modal>
                <modal :show.sync="modals.editGoal.isVisible" headerClasses="justify-content-center">
                    <h4 slot="header" class="title title-up">Edit goal</h4>
                    <fg-input placeholder="title" maxlength="10" v-model="modals.editGoal.goal.title"></fg-input>
                    <fg-input placeholder="trigger value" type="number" v-model="modals.editGoal.goal.triggerValue"></fg-input>
                    <el-select class="select-danger"
                               placeholder="Single Select"
                               v-model="modals.editGoal.goal.category">
                        <el-option v-for="option in categories.all"
                                   class="select-danger"
                                   :value="option.value"
                                   :label="option.label"
                                   :key="option.label">
                        </el-option>
                    </el-select>
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
    import {Option, Select} from "element-ui"
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
            [Modal.name]: Modal,
            [Select.name]: Select,
            [Option.name]: Option
        },
        data() {
            return {
                categories: {
                    all: [
                        {value: 'all', label: 'all'},
                        {value: 'clothing', label: 'clothing'},
                        {value: 'food', label: 'food'},
                        {value: 'electronics', label: 'electronics'},
                        {value: 'fule', label: 'fule'},
                        {value: 'culture', label: 'culture'}]
                },
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
                            category: "all",
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
                            category: "all",
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
                this.modals.addGoal.goal.category = "all"
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
                this.currentMonthSum = result;
                this.goals = this.mapGoalsToViewElements(pureGoals, this.currentMonthSum);
                this.isLoading = false;
            }
            ,
            mapGoalsToViewElements(goals, currentAmount) {
                return goals.map((goal) => {
                    let currentAmountNumber = currentAmount[goal.category] ? currentAmount[goal.category] : 0;

                    return ({
                        pureGoal: goal,
                        title: goal.title,
                        category: goal.category,
                        id: goal._id,
                        value: currentAmountNumber,
                        redFrom: Math.floor(goal.triggerValue),
                        max: Math.floor(Math.max(goal.triggerValue * 1.30, currentAmountNumber)),
                        yellowFrom: Math.floor(goal.triggerValue * 0.75),
                        yellowTo: Math.floor(goal.triggerValue)
                    })
                })
            }
        }
    }
    ;
</script>
<style></style>
