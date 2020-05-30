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
                    <h1 class="title">User Home</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <bar-chart></bar-chart>
            <third-chart-sample></third-chart-sample>
        </div>
    </div>
</template>
<script>
    import {Button, FormGroupInput} from '@/components';
    import BarChart from "./components/BarChart";
    import ThirdChartSample from "./components/ThirdChartSample";

    export default {
        name: 'userhome',
        bodyClass: 'user-home-page',
        components: {
            BarChart,
            ThirdChartSample,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput
        },
        data() {
            return {
                form: {
                    firstName: '',
                    email: '',
                    message: ''
                }
            };
        }
    };
</script>
<style></style>
