<template>
    <div id="app">
        <GChart
                type="ColumnChart"
                :data="chartData"
                :options="chartOptions"
                :settings="{ packages: ['corechart', 'columnchart'] }"
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
        props:{
          label:String,
          value:Number,
          redFrom:Number,
          redTo: Number,
          yellowFrom: Number,
          yellowTo:Number
        },
        name: "AdminDashboardComponent",
        components: {
            GChart,
            [Button.name]: Button
        },
        data() {
            return {
                // Array will be automatically processed with visualization.arrayToDataTable function
                chartData: [
                    ['Label', 'Value'],
                    [this.label, this.value],
                ],
                chartOptions: {
                    width: 280, height: 280,
                    redFrom: this.redFrom, redTo: this.redTo,
                    yellowFrom:this.yellowFrom, yellowTo: this.yellowTo,
                    minorTicks: 5
                },
                packages:['gauge']

            };
        }
    };
</script>
