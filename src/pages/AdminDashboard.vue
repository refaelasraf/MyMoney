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
            <admin-dashboard-component/>
        </div>

    </div>
</template>
<script>
    import AdminDashboardComponent from "./components/AdminDashboardComponent";

    export default {
        name: 'admindashboard',
        bodyClass: 'admin-dashboard-page',
        components: {
            AdminDashboardComponent,
        },
    };
</script>