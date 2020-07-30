<template>
    <div id="app">
        <GChart
                type="PieChart"
                :data="chartData"
                :options="chartOptions"
                style="width: 100%; height: 500px;"
        />
    </div>
</template>

<script>
    import {GChart} from "vue-google-charts";
    import StatisticsService from "../../services/StatisticsService";

    export default {
        name: "ThirdChartSample",
        components: {
            GChart
        },
        async created() {
            this.UserStats = await StatisticsService.getUserStats(localStorage.userId);

            this.chartDataUpdated = [
                ['Task', 'Hours per Day'],
                ['Work', 11],
                ['', 0],
                    ['', 0],
                    ['',0],
                    ['', 0],
                    ['', 0],

            ];

            for (let i = 0; this.UserStats.length > i; i++) {
                this.chartDataUpdated[i + 1][0] = this.UserStats[i].categoryId;
                this.chartDataUpdated[i + 1][1] = this.UserStats[i].amount;
            }

        },
        data() {
            return {
                // Array will be automatically processed with visualization.arrayToDataTable function
                chartDataa: [
                    ['Task', 'Hours per Day'],
                    ['Work', 11],
                ],
                UserStats: [],
                chartDataUpdated: [],
            };
        },
        computed: {
            chartData() {
                return this.chartDataUpdated;
            }
        },
    };
</script>
