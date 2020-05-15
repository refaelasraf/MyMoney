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

        <card style="width: 20rem;">
            <ul slot="raw-content" class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Vestibulum at eros</li>
                <li class="list-group-item">EZ7</li>
                <li class="list-group-item">AN8</li>
                <li class="list-group-item">KOLOLOLOLO</li>
            </ul>
        </card>
    </div>
</template>
<script>
    import { Button, FormGroupInput } from '@/components';
    import AdminDashboardComponent from "./components/AdminDashboardComponent";

    export default {
        name: 'admindashboard',
        bodyClass: 'admin-dashboard-page',
        components: {
            AdminDashboardComponent,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput
        },
        data() {
            return {
            };
        }
    };
</script>
<style></style>
