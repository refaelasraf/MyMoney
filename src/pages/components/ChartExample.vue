<template>
    <div id="app">
        <GChart
                type="ColumnChart"
                @ready="onChartReady"
        />
    </div>
</template>

<script>
    import { GChart } from "vue-google-charts";
    export default {
        name: "ChartExample",
        components: {
            GChart
        },
        data() {
            return {
                // Array will be automatically processed with visualization.arrayToDataTable function
            };
        },
        methods: {
            onChartReady(chart, google) {
                const query = new google.visualization.Query(
                    "https://docs.google.com/spreadsheets/d/1gd9_OcRjyGTfFvcY1YAsZd33OSNsqW4IfTvdfevD9Jk/edit?usp=sharing"
                );
                query.send(response => {
                    const options = {
                        title: "Creating a Chart from a Separate Spreadsheet"
                    };
                    const data = response.getDataTable();
                    chart.draw(data, options);
                });
            }
        }
    };
</script>
