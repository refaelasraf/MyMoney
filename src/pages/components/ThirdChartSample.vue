<template>
    <div id="app">
        <GChart
                type="PieChart"
                :data="chartData"
                :options="chartOptions"
                style="width: 900px; height: 500px;"
        />
    </div>
</template>

<script>
    import { GChart } from "vue-google-charts";
    export default {
        name: "ThirdChartSample",
        components: {
            GChart
        },
        data() {
            return {
                // Array will be automatically processed with visualization.arrayToDataTable function
                chartData: [
                    ['Task', 'Hours per Day'],
                    ['Work',     11],
                    ['Eat',      2],
                    ['Commute',  2],
                    ['Watch TV', 2],
                    ['Sleep',    7]
                ]
            };
        }
    };
</script>
