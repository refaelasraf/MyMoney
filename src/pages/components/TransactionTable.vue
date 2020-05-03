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
    export default {
        props:{
        },
        name: "TransactionTable",
        components: {
            GChart
        },
        data() {
            return {
                // Array will be automatically processed with visualization.arrayToDataTable function
                chartData: [
                    ['action', 'company', 'date'],
                    ["400$+", "my money", '20-Mar'],
                    ["500$-", "my money", '21-Mar'],
                        ["200$-", "my money", '22-Mar'],
                        ["600$-", "my money", '23-Mar'],
                        ["800$+", "my money", '24-Mar']

                ],
                chartOptions: {
                    width: 480, height: 380,
                },
                packages:['table']

            };
        }
    };
</script>
