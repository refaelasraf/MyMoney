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
                <n-checkbox @input="filterByCat(mainCat.merchantId, $event)" id="mainCat.merchantId">
                    {{mainCat}}
                </n-checkbox>
            </li>
        </ul>
    </div>
</template>

<script>
    import {GChart} from "vue-google-charts";
    import {Button, Checkbox, Radio} from '@/components';
    import StatisticsService from "../../services/StatisticsService";
    import CategoriesService from "../../services/CategoriesService";

    export default {
        name: "ColumChart",
        components: {
            GChart,
            [Button.name]: Button,
            [Checkbox.name]: Checkbox,
            [Radio.name]: Radio
        },
        async created() {
            this.UserStats = await StatisticsService.getUserStats(localStorage.userId);
            //Filter User By month
            // this.HevraStats = await StatisticsService.getSimilarStats(localStorage.userId, [], 2016);
            //Filter User By month

            this.mainCategories = await CategoriesService.getCategories();
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
                mainCategories: [],
                unchecked: false,
                checked: true,
                checkedCategories: ["email"],
                mainYears: ["2020", "2019", "2018", "2017", "2016"],
                enabledRadio: "5",
                year: 2016,
                UserStats: [],
            };
        },
        methods: {
            changeYear: function (yearChoosen, e) {
                console.log("changeYear");
                console.log(yearChoosen);
                this.chartOptions.title = 'נתונים עם חברלך אחרים בשנת ' + yearChoosen;
                this.year = yearChoosen;

                this.CharStats = StatisticsService.getSimilarStats(localStorage.userId, checkedCategories, yearChoosen);
            },
            filterByCat: function (cat, e) {
                console.log("Ohad The King");
                console.log(this.checkedCategories, cat, e);
                if (e == true) {
                    //Send to server this Categorie
                    this.chartData = [
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

                    this.CharStats = StatisticsService.getSimilarStats(localStorage.userId, checkedCategories, this.year);
                } else {
                    //Remove Send to server this Categorie
                    this.chartData = [
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

                    this.checkedCategories = this.checkedCategories.filter(e => e !== cat);
                    this.CharStats = StatisticsService.getSimilarStats(localStorage.userId, checkedCategories, this.year);
                }
            }
        }
    };
</script>
