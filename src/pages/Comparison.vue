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
                    <h1 class="title">Comparison</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <colum-chart></colum-chart>
            <!--<second-chart></second-chart>-->
            <third-chart-sample></third-chart-sample>
        </div>
    </div>
</template>
<script>
    import {Button, FormGroupInput} from '@/components';
    import ColumChart from "./components/ColumChart";
    import SecondChart from "./components/SecondChart";
    import ThirdChartSample from "./components/ThirdChartSample";

    export default {
        name: 'comparison',
        bodyClass: 'comparison-page',
        components: {
            ThirdChartSample,
            SecondChart,
            ColumChart,
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
