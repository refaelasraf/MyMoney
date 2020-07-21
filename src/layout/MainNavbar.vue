<template>
    <navbar
            position="fixed"
            type="primary"
            :transparent="transparent"
            :color-on-scroll="colorOnScroll"
            menu-classes="ml-auto"
    >
        <template slot-scope="{ toggle, isToggled }">

            <el-popover
                    ref="popover1"
                    popper-class="popover"
                    placement="bottom"
                    width="200"
                    trigger="hover"
            >
                <div class="popover-body">
                    Designed by Invision. Coded by Creative Tim
                </div>
            </el-popover>
        </template>
        <template slot="navbar-menu">

            <drop-down
                    tag="li"
                    title="Pages"
                    icon="now-ui-icons design_image"
                    class="nav-item"
            >
                <nav-link to="/landing">
                    <i class="now-ui-icons education_paper"></i> Charts Exampels
                </nav-link>
                <nav-link to="/login">
                    <i class="now-ui-icons users_circle-08"></i> Login
                </nav-link>
                <nav-link to="/transaction">
                    <i class="now-ui-icons ui-1_calendar-60 "></i> transactions
                </nav-link>
                <nav-link to="/goals">
                    <i class="now-ui-icons ui-2_time-alarm"></i> Goals
                </nav-link>
                <nav-link to="/managedata">
                    <i class="now-ui-icons ui-2_time-alarm"></i> Mange Financial data
                </nav-link>
                <nav-link to="/comparison">
                    <i class="now-ui-icons education_paper"></i> Comparison
                </nav-link>
                
                <nav-link to="/">
                    <i class="now-ui-icons ui-2_settings-90"></i> Home
                </nav-link>
            </drop-down>

        </template>
    </navbar>
</template>

<script>
    import {DropDown, Navbar, NavbarToggleButton, NavLink} from '@/components';
    import {Popover} from 'element-ui';

    export default {
        name: 'main-navbar',
        props: {
            transparent: Boolean,
            colorOnScroll: Number
        },
        components: {
            DropDown,
            Navbar,
            NavbarToggleButton,
            NavLink,
            [Popover.name]: Popover
        }
    };
</script>

<style scoped></style>
