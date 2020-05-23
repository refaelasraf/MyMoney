<template>
    <div>
        <div class="page-header page-header-small">
            <parallax
                    class="page-header-image"
                    style="background-image: url('img/bg5.jpg')"
            >
            </parallax>
            <div class="content-center">
                <div class="container">
                    <h1 class="title">Admin Dashboard</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <center>
                <admin-dashboard-component label="Goal 1" :red-from="60" :red-to="80" :yellow-from="40" :yellow-to="59" :value="43"></admin-dashboard-component>
                <admin-dashboard-component label="Goal 2" :red-from="90" :red-to="100" :yellow-from="40" :yellow-to="89" :value="10"></admin-dashboard-component>
            </center>
        </div>

        <GChart
                type="Table"
                :data="chartData"
                :options="chartOptions"
                :settings="{ packages: ['corechart', 'table'] }"
                style="width: 100%"
        />

    </div>
</template>
<script>
    import { Button, FormGroupInput } from '@/components';
    import AdminDashboardComponent from "./components/AdminDashboardComponent";
	import AdminService from "../services/AdminService";
    import { GChart } from "vue-google-charts";

    export default {
        name: 'admindashboard',
        bodyClass: 'admin-dashboard-page',
        components: {
            GChart,
            AdminDashboardComponent,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput
        },
        created() {
            this.Users = AdminService.getUserList();
            //TODO: insert Users into chartData
        },
        data() {
            return {
                //TODO: Get data as: await AdminService.getUserList();
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
                    width: 480, height: 380,
                },
                packages:['table'],
            };
        }
    };
</script>
<style></style>
