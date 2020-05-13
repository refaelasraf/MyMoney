<template>
    <div>
        <div class="page-header page-header-small">
            <parallax
                    class="page-header-image"
                    style="background-image: url('img/bg6.jpg')"
            >
            </parallax>
            <div class="content-center">
                <div class="container"  >
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
            <div class="container"  >
                <transaction-table v-bind:transactions="transactions"></transaction-table>
                <br/>
                <div>
                    Total spending in month {{totalSpending}}$
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import TransactionTable from "./components/TransactionTable";
    import {DatePicker} from "element-ui";
    import TransactionService from "../services/TransactionService";

    export default {
        name: 'transaction',
        bodyClass: 'Transaction-page',
        components: {
            TransactionTable,
            [DatePicker.name]: DatePicker,
        },
        data() {
            return {
                date: null,
                transactions: null,
                totalSpending: 0,
            }
        },
        created() {
            const today = new Date();
            const dt = new Date(today.getFullYear(), today.getMonth(), 1);
            this.date = dt;
            this.getTransactions(dt);
        },
        methods: {
            async getTransactions(event) {
                this.transactions = await TransactionService.getMonth(event);
                this.totalSpending = this.transactions.map(t => t.amount).reduce((accum, curr) => accum + curr, 0);
            },
        }
    };
</script>
<style></style>
