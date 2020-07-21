<template>
    <div id="app">
        <GChart
                v-if="isVisible"
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
                <n-checkbox @input="filterByCat(mainCat, $event)" id="mainCat.merchantId">
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

            this.changeYear(2018);

            this.mainCategories = await CategoriesService.getCategories();
        },
        data() {
            return {
                // Array will be automatically processed with visualization.arrayToDataTable function
                chartDataa: [
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
                chartZero: [
                    ['החודש', 'אני', 'החברלך'],
                    ['ינואר', 0, 0],
                    ['פארבואר', 0, 0],
                    ['מרץ', 0, 0],
                    ['אפריל', 0, 0],
                    ['מאי', 0, 0],
                    ['יוני', 0, 0],
                    ['יולי', 0, 0],
                    ['אוגוסט', 0, 0],
                    ['ספטמבר', 0, 0],
                    ['אוקטובר', 0, 0],
                    ['נובמבר', 0, 0],
                    ['דצמבר', 0, 0]
                ],
                chartOptions: {
                    title: 'השוואת נתונים אל חברים אחרים',
                },
                mainCategories: [],
                unchecked: false,
                checked: true,
                checkedCategories: [],
                mainYears: ["2020", "2019", "2018", "2017", "2016"],
                enabledRadio: "5",
                year: 2020,
                HevraStats: [],
                UserStats: [],
                CharStats: [],
                isVisible: true,
                chartDataUpdated: [],
            };
        },
        computed: {
                chartData (){ 
                    return this.chartDataUpdated;
                }
        },
        methods: {
            changeYear: async function (yearChoosen, e) {
                console.log("changeYear");
                console.log(yearChoosen);
                this.chartOptions.title = 'נתונים עם חברלך אחרים בשנת ' + yearChoosen;
                this.year = yearChoosen;

                this.isVisible = false;
                this.CharStats = await StatisticsService.getSimilarStats(localStorage.userId, this.checkedCategories, parseInt(yearChoosen));

                this.chartDataUpdated = [
                    ['החודש', 'אני', 'החברלך'],
                    ['ינואר', 0, 0],
                    ['פארבואר', 0, 0],
                    ['מרץ', 0, 0],
                    ['אפריל', 0, 0],
                    ['מאי', 0, 0],
                    ['יוני', 0, 0],
                    ['יולי', 0, 0],
                    ['אוגוסט', 0, 0],
                    ['ספטמבר', 0, 0],
                    ['אוקטובר', 0, 0],
                    ['נובמבר', 0, 0],
                    ['דצמבר', 0, 0]
                ];
                for(let i = 0 ; this.CharStats.user.length > i; i++)
                {
                    for(let j = 0 ; this.CharStats.user[i].expense.length > j; j++)
                    {
                        this.chartDataUpdated[this.CharStats.user[i].month + 1][1] = this.CharStats.user[i].expense[j].amount;
                    }
                }

                
                for(let i = 0 ; this.CharStats.other.length > i; i++)
                {
                    for(let j = 0 ; this.CharStats.other[i].expense.length > j; j++)
                    {
                        this.chartDataUpdated[this.CharStats.other[i].month + 1][2] = this.CharStats.other[i].expense[j].amount;
                    }
                }


                this.isVisible = true;
            },
            filterByCat: async function (cat, e) {
                console.log(this.checkedCategories, cat, e);
                if (e == true) {
                    //Send to server this Categorie

                    // this.CharStats = StatisticsService.getSimilarStats(localStorage.userId, checkedCategories, this.year);

                    this.checkedCategories.push(cat);
                    this.isVisible = false;
                    this.CharStats = await StatisticsService.getSimilarStats(localStorage.userId, this.checkedCategories, parseInt(this.year));

                    this.chartDataUpdated = [
                        ['החודש', 'אני', 'החברלך'],
                        ['ינואר', 0, 0],
                        ['פארבואר', 0, 0],
                        ['מרץ', 0, 0],
                        ['אפריל', 0, 0],
                        ['מאי', 0, 0],
                        ['יוני', 0, 0],
                        ['יולי', 0, 0],
                        ['אוגוסט', 0, 0],
                        ['ספטמבר', 0, 0],
                        ['אוקטובר', 0, 0],
                        ['נובמבר', 0, 0],
                        ['דצמבר', 0, 0]
                    ];

                    for(let i = 0 ; this.CharStats.user.length > i; i++)
                    {
                        for(let j = 0 ; this.CharStats.user[i].expense.length > j; j++)
                        {
                            this.chartDataUpdated[this.CharStats.user[i].month + 1][1] = this.CharStats.user[i].expense[j].amount;
                        }
                    }

                    
                    for(let i = 0 ; this.CharStats.other.length > i; i++)
                    {
                        for(let t = 0 ; this.CharStats.other[i].expense.length > t; t++)
                        {
                            this.chartDataUpdated[this.CharStats.other[i].month + 1][2] = this.CharStats.other[i].expense[t].amount;
                        }
                    }


                    this.isVisible = true;

                } else {

                    this.checkedCategories = this.checkedCategories.filter(e => e !== cat);
                    // this.CharStats = StatisticsService.getSimilarStats(localStorage.userId, checkedCategories, this.year);

                    this.isVisible = false;
                    this.CharStats = await StatisticsService.getSimilarStats(localStorage.userId, this.checkedCategories, parseInt(this.year));

                    this.chartDataUpdated = [
                        ['החודש', 'אני', 'החברלך'],
                        ['ינואר', 0, 0],
                        ['פארבואר', 0, 0],
                        ['מרץ', 0, 0],
                        ['אפריל', 0, 0],
                        ['מאי', 0, 0],
                        ['יוני', 0, 0],
                        ['יולי', 0, 0],
                        ['אוגוסט', 0, 0],
                        ['ספטמבר', 0, 0],
                        ['אוקטובר', 0, 0],
                        ['נובמבר', 0, 0],
                        ['דצמבר', 0, 0]
                    ];

                    for(let i = 0 ; this.CharStats.user.length > i; i++)
                    {
                        for(let j = 0 ; this.CharStats.user[i].expense.length > j; j++)
                        {
                            this.chartDataUpdated[this.CharStats.user[i].month + 1][1] = this.CharStats.user[i].expense[j].amount;
                        }
                    }

                    
                    for(let i = 0 ; this.CharStats.other.length > i; i++)
                    {
                        for(let j = 0 ; this.CharStats.other[i].expense.length > j; j++)
                        {
                            this.chartDataUpdated[this.CharStats.other[i].month + 1][2] = this.CharStats.other[i].expense[j].amount;
                        }
                    }

                    this.isVisible = true;
                }
            }
        }
    };
</script>
