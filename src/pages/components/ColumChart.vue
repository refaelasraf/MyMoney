<template>
    <div id="app">
          <GChart
                type="ColumnChart"
                :data="chartData"
                :options="chartOptions"
                style="width: 100%"
        />
        <div style="display: flex">
                <n-radio style="padding: 30px;" v-model="enabledRadio" @input="changeYear('2020')" label="1"> 2020</n-radio>
                <n-radio style="padding: 30px;" v-model="enabledRadio" @input="changeYear('2019')" label="2"> 2019</n-radio>
                <n-radio style="padding: 30px;" v-model="enabledRadio" @input="changeYear('2018')" label="3"> 2018</n-radio>
                <n-radio style="padding: 30px;" v-model="enabledRadio" @input="changeYear('2017')" label="4"> 2017</n-radio>
                <n-radio style="padding: 30px;" v-model="enabledRadio" @input="changeYear('2016')" label="5"> 2016</n-radio>
        </div>
        <ul style="column-count: 3; padding: 10px; line-height: 2em; background: #fff;">
            <li v-for="mainCat in mainCategories">
                <n-checkbox @input="check(mainCat.merchantId, $event)"  id="mainCat.merchantId">Unchecked {{mainCat.merchantId}}</n-checkbox>
            </li>
        </ul>
    </div>
</template>

<script>
    import { GChart } from "vue-google-charts";
    import {  Button ,Checkbox , Radio } from '@/components';
	import StatisticsService from "../../services/StatisticsService";
    
    export default {
        name: "ColumChart",
        components: {
            GChart,
            [Button.name]: Button,
            [Checkbox.name]: Checkbox,
            [Radio.name]: Radio
        },
        created() {
            this.UserStats = StatisticsService.getUserStats();
            //Filter User By month
            this.HevraStats = StatisticsService.getSimilarStats();
            //Filter User By month
        },
        data() {
            return {
                // Array will be automatically processed with visualization.arrayToDataTable function
                chartData: [
                    ['החודש', 'אני', 'החברלך'],
                    ['ינואר', 1000, 200],
                    ['פארבואר', 1170, 250],
                    ['מרץ', 660, 300],
                    ['אפריל', 1030, 350],
                    ['מאי', 1000, 200],
                    ['יוני', 1170, 250],
                    ['יולי', 660, 300],
                    ['אוגוסט', 1030, 350],
                    ['ספטמבר', 1000, 200],
                    ['אוקטובר', 1170, 250],
                    ['נובמבר', 660, 300],
                    ['דצמבר', 1030, 350]
                ],
                chartOptions: {
                    title: 'השוואת נתונים אל חברים אחרים',
                },
                mainCategories: [{
                    merchantId: '1'
                }, {
                    merchantId: '2'
                },{
                    merchantId: '3'
                },{
                    merchantId: '4'
                },{
                    merchantId: '5'
                },{
                    merchantId: '6'
                },{
                    merchantId: '7'
                },{
                    merchantId: '8'
                },{
                    merchantId: '9'
                },{
                    merchantId: '10'
                },{
                    merchantId: '11'
                },{
                    merchantId: '12'
                },{
                    merchantId: '13'
                },{
                    merchantId: '14'
                },{
                    merchantId: '15'
                }],
                unchecked: false,
                checked: true,
                checkedCategories: [],
                mainYears:["2020","2019","2018","2017","2016"],
                enabledRadio: "5",
            };
        },
        methods: {
            changeYear: function(id,e) {
                console.log("changeYear");
                console.log(id);
                this.chartOptions.title= 'נתונים עם חברלך אחרים בשנת ' + id;
            },
            check: function(id,e) {
                console.log("Ohad The King");
                console.log(this.checkedCategories,id,e);
                if(e == true)
                {
                    //Send to server this Categorie
                    this.chartData= [
                        ['החודש', 'אני', 'החברלך'],
                        ['ינואר', 1000, 200],
                        ['פארבואר', 1170, 250],
                        ['מרץ', 660, 300],
                        ['אפריל', 1030, 350],
                        ['מאי', 1000, 200],
                        ['יוני', 1170, 250],
                        ['יולי', 660, 300],
                        ['אוגוסט', 1030, 350],
                        ['ספטמבר', 1000, 200],
                        ['אוקטובר', 1170, 250],
                        ['נובמבר', 660, 300],
                        ['דצמבר', 1030, 350]
                    ];
                }
                else
                {
                    //Remove Send to server this Categorie
                    this.chartData= [
                        ['החודש', 'אני', 'החברלך'],
                        ['ינואר', 1000, 200],
                        ['פארבואר', 1170, 250],
                        ['מרץ', 660, 300],
                        ['אפריל', 1030, 350],
                        ['מאי', 1000, 200],
                        ['יוני', 1170, 250],
                        ['יולי', 660, 300],
                        ['אוגוסט', 1030, 350],
                        ['ספטמבר', 1000, 200],
                        ['אוקטובר', 1170, 250],
                        ['נובמבר', 660, 300],
                        ['דצמבר', 1030, 350]
                    ];
                }
            }
        }
    };
</script>
