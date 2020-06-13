<template>
    <div id="app">
        <GChart
                type="BarChart"
                :data="chartData"
                :options="chartOptions"
                style="width: 100%; height: 500px;"
        />
    </div>
</template>

<script>
    import {GChart} from "vue-google-charts";

    export default {
        name: "BarChart",
        components: {
            GChart
        },
        data() {
            return {
                // Array will be automatically processed with visualization.arrayToDataTable function
                //TODO: Get stats from server
                chartData: [
                    ['Task', ''],
                    ['Your Expeness in this month', 11],
                ]
            };
        }
    };
</script>
