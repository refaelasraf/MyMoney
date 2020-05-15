<template>
    <div>
        <GChart
                type="Table"
                :data="chartData"
                :options="chartOptions"
                :settings="{ packages: ['corechart', 'table'] }"
                style="width: 100%"
        />
    </div>
</template>

<script>
    import { GChart } from "vue-google-charts";

    const headers = ['action', 'company', 'date'];

    export default {
        props: ['transactions'],
        name: "TransactionTable",
        components: {
            GChart
        },
        data() {
            return {
                chartData: [
                    headers
                ],
                chartOptions: {
                    width: 480, height: 380,
                },
                packages:['table'],
            };
        },
        watch: {
            transactions: function(newVal) {
                if (!newVal) return;

                this.chartData = [
                        headers,
                        ...newVal.map(v => [v.amount, v.storeName, v.eventTime])
                ];
            }
        }
    };
</script>
