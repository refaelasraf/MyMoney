<template>
    <div id="app">
        <GChart
                type="Gauge"
                :data="chartData"
                :options="chartOptions"
                :settings="{ packages: ['corechart', 'gauge'] }"
                style="width: 100%; height:280px;"
        />
        <n-button type="danger">  <i class="now-ui-icons ui-1_simple-remove"></i> </n-button>
        <n-button type="success"> <i class="now-ui-icons design-2_ruler-pencil"></i></n-button>
    </div>

</template>

<script>
    import { GChart } from "vue-google-charts";
    import {  Button} from '@/components';
    export default {

        name: "GoalComponent",
        components: {
            GChart,
            [Button.name]: Button
        },
        data() {
            return {
                // Array will be automatically processed with visualization.arrayToDataTable function
                chartData: [
                    ['Label', 'Value'],
                    ['Goal', 80],
                ],
                chartOptions: {
                    width: 280, height: 280,
                    redFrom: 90, redTo: 100,
                    yellowFrom:75, yellowTo: 90,
                    minorTicks: 5
                },
                packages:['gauge']

            };
        }
    };
</script>
