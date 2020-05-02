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
        title="Components"
        icon="now-ui-icons design_app"
        class="nav-item"
      >
        <nav-link to="/">
          <i class="now-ui-icons business_chart-pie-36"></i> All components
        </nav-link>
        <a
          href="https://demos.creative-tim.com/vue-now-ui-kit/documentation"
          target="_blank"
          class="dropdown-item"
        >
          <i class="now-ui-icons design_bullet-list-67"></i> Documentation
        </a>
      </drop-down>
      <drop-down
              tag="li"
              title="Examples"
              icon="now-ui-icons design_image"
              class="nav-item"
      >
        <nav-link to="/landing">
          <i class="now-ui-icons education_paper"></i> Charts Exampels
        </nav-link>
        <nav-link to="/login">
          <i class="now-ui-icons users_circle-08"></i> Login
        </nav-link>
        <nav-link to="/signup">
          <i class="now-ui-icons users_circle-08"></i> signup
        </nav-link>
        <nav-link to="/profile">
          <i class="now-ui-icons users_single-02"></i> Profile
        </nav-link>
        <nav-link to="/goals">
          <i class="now-ui-icons ui-2_time-alarm"></i> Goals
        </nav-link>
        <nav-link to="/">
          <i class="now-ui-icons ui-2_settings-90"></i> Home
        </nav-link>
      </drop-down>

    </template>
  </navbar>
</template>

<script>
import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
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
