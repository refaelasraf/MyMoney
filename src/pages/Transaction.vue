<template>
    <div>
        <div class="page-header page-header-small">
            <parallax
                    class="page-header-image"
                    style="background-image: url('img/bg6.jpg')"
            >
            </parallax>
            <div class="content-center">
                <div class="container">
                    <h1 class="title">Your Transactions</h1>
                    <el-date-picker v-model="date"
                                    popper-class="date-picker-primary"
                                    type="date"
                                    @change="getTransactions($event)"
                                    placeholder="Start Date...">
                    </el-date-picker>
                </div>
            </div>
        </div>
        <div class="content-center">
            <modal :show.sync="modals.add.isVisible" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up">Add Transaction</h4>
                <fg-input placeholder="Store Name" maxlength="10" v-model="modals.add.transaction.storeName"></fg-input>
                <fg-input placeholder="amount" type="number"   v-model="modals.add.transaction.amount"></fg-input>
                <el-date-picker v-model="modals.add.transaction.eventTime"
                                popper-class="date-picker-primary"
                                type="date"
                                placeholder="Start Date...">
                </el-date-picker>
                <el-select class="select-danger"
                           placeholder="Single Select"
                           v-model="modals.add.transaction.categoryId">
                    <el-option v-for="option in categories.all"
                               class="select-danger"
                               :value="option.value"
                               :label="option.label"
                               :key="option.label">
                    </el-option>
                </el-select>
                <template slot="footer">
                    <n-button @click="addTransaction">Add Transaction</n-button>
                    <n-button type="danger" @click.native="modals.add.isVisible = false">Close</n-button>
                </template>
            </modal>
            <div class="container">
                <transaction-table v-bind:transactions="transactions"/>
                <br/>
                <div>
                    Total spending in month {{totalSpending}}$
                </div><br/>
                <n-button @click.native="modals.add.isVisible = true">Add Transaction</n-button>
            </div>
        </div>
    </div>
</template>
<script>
    import TransactionTable from "./components/TransactionTable";
    import TransactionService from "../services/TransactionService";
    import {Option, Select} from "element-ui"
    import {Button, FormGroupInput, Modal} from '@/components';
    import {DatePicker} from 'element-ui';
    export default {
        name: 'transaction',
        bodyClass: 'Transaction-page',
        components: {
            TransactionTable,
            [DatePicker.name]: DatePicker,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput,
            [Modal.name]: Modal,
            [Select.name]: Select,
            [Option.name]: Option
        },
        data() {
            return {
                date: null,
                transactions: null,
                totalSpending: 0,
                categories: {
                    all: [
                        {value: 'clothing', label: 'clothing'},
                        {value: 'food', label: 'food'},
                        {value: 'electronics', label: 'electronics'},
                        {value: 'fule', label: 'fule'},
                        {value: 'culture', label: 'culture'}]
                },
                modals: {
                    classic: false,
                    editProfile: false,
                    add: {
                        isVisible: false,
                        transaction: {
                            categoryId: "food",
                            amount: 0,
                            storeName: "Store Name",
                            clientId: localStorage.userId,
                            eventTime: Date.now()
                        }
                    }
                }
            }
        },
        created() {
            const today = new Date();
            const dt = new Date(today.getFullYear(), today.getMonth(), 1);
            this.date = dt;
            this.getTransactions(dt);
        },
        methods: {
            async addTransaction(){
                await TransactionService.upsert(this.modals.add.transaction);
                this.modals.add.isVisible = false
                this.modals.add.transaction.categoryId = "food";
                this.modals.add.transaction.eventTime = Date.now();
                this.modals.add.transaction.amount = 0;
                this.modals.add.transaction.storeName = "Store Name"
                await this.getTransactions(this.date);
            },
            async getTransactions(event) {
                this.transactions = await TransactionService.getMonthByUser(event);
                this.totalSpending = this.transactions.map(t => t.amount).reduce((accum, curr) => parseInt(accum) + parseInt(curr), 0);
            },
        }
    };
</script>
<style></style>
