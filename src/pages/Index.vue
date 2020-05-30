<template>
    <div>
        <div class="page-header clear-filter" filter-color="orange">
            <parallax
                    class="page-header-image"
                    style="background-image:url('img/header.jpg')"
            >
            </parallax>
            <div class="container">
                <div class="content-center brand">
                    <img class="n-logo" src="img/now-logo.png" alt=""/>
                    <h1 class="h1-seo">My Money.</h1>
                    <h3>Manage your balances.</h3>
                    <div>
                        <router-link to="/login">
                            <n-button type="primary" style="width: 200px" outline round>
                                <i class="fa fa-key"></i> Login
                            </n-button>
                        </router-link>
                    </div>
                    <div>
                        <router-link to="/signup">

                            <n-button type="primary" style="width: 200px" outline round>
                                <i class="fa fa-user"></i> sign up
                            </n-button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {Button, Parallax} from '@/components';
    import BasicElements from './components/BasicElementsSection';
    import Navigation from './components/Navigation';
    import TabsSection from './components/Tabs';
    import ProgressPagination from './components/ProgressPagination';
    import Notifications from './components/Notifications';
    import Typography from './components/Typography';
    import JavascriptComponents from './components/JavascriptComponents';
    import CarouselSection from './components/CarouselSection';
    import NucleoIconsSection from './components/NucleoIconsSection';
    import ExamplesSection from './components/ExamplesSection';
    import DownloadSection from './components/DownloadSection';

    export default {
        name: 'index',
        bodyClass: 'index-page',
        components: {
            Parallax,
            BasicElements,
            Navigation,
            TabsSection,
            ProgressPagination,
            Notifications,
            Typography,
            JavascriptComponents,
            CarouselSection,
            NucleoIconsSection,
            ExamplesSection,
            DownloadSection,
            [Button.name]: Button
        }
    };
</script>
<style></style>
