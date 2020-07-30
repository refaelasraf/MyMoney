<template>
    <div>
        <div class="page-header page-header-small">
            <parallax
                    class="page-header-image"
                    style="background-image: url('img/bg6.jpg')"
            >
            </parallax>
            <div class="content-center">
                <div class="container">
                    <h1 class="title">Welcome!</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <GChart
                    type="ColumnChart"
                    :data="expansesBySubject"
                    :options="expansesBySubjectOptions"
                    style="width: 100%"
            />
            <GChart
                    type="PieChart"
                    :data="expansesBySubject"
                    :options="expansesBySubjectOptions"
                    style="width: 100%; height: 500px;"
            />
        </div>
    </div>
</template>
<script>
    import {Button, FormGroupInput} from '@/components';
    import {GChart} from "vue-google-charts";
    import StatisticsService from "../services/StatisticsService";

    export default {
        name: 'landing',
        bodyClass: 'landing-page',
        components: {
            GChart,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput
        },
        data() {
            const expansesBySubjectHeaders = ['Subject', 'Expanses'];
            return {
                expansesBySubjectHeaders,
                expansesBySubject: [expansesBySubjectHeaders],
                expansesBySubjectOptions: {title: 'Expanses By Subject'}
            };
        },
        async created() {
                await this.initializeStats();
        },
        methods: {
            async initializeStats() {
                const stats = await StatisticsService.getUserStats(localStorage.userId);

                if (!!stats && stats.length > 0) {
                    this.expansesBySubject = [this.expansesBySubjectHeaders, ...stats.map(s => [s.categoryId, s.amount])];
                    return;
                }

                setTimeout(() => this.initializeStats(),1000);
            }
        }
    };
</script>