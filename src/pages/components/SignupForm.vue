<template>
    <div
            class="section section-signup"
            style="background-image: url('img/bg11.jpg'); background-size: cover; background-position: top center; min-height: 700px;"
    >
        <div class="container">
            <div class="row">
                <card class="card-signup" header-classes="text-center" color="orange">
                    <template slot="header">
                        <h3 class="card-title title-up">Sign Up</h3>
                        <div class="social-line">
                            <a
                                    href="#pablo"
                                    class="btn btn-neutral btn-facebook btn-icon btn-round"
                            >
                                <i class="fab fa-facebook-square"></i>
                            </a>
                            <a
                                    href="#pablo"
                                    class="btn btn-neutral btn-twitter btn-icon btn-lg btn-round"
                            >
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a
                                    href="#pablo"
                                    class="btn btn-neutral btn-google btn-icon btn-round"
                            >
                                <i class="fab fa-google-plus"></i>
                            </a>
                        </div>
                    </template>
                    <template>
                        <fg-input
                                class="no-border"
                                placeholder="Username..."
                                addon-left-icon="now-ui-icons users_circle-08"
                                v-model="userName"
                        >
                        </fg-input>

                        <fg-input
                                class="no-border"
                                placeholder="Password..."
                                addon-left-icon="now-ui-icons text_caps-small"
                                v-model="password"
                                type="password"
                        >
                        </fg-input>

                        <fg-input
                                class="no-border"
                                placeholder="Email"
                                addon-left-icon="now-ui-icons ui-1_email-85"
                                v-model="email"
                        >
                        </fg-input>

                        <fg-input>
                            <el-date-picker v-model="date"
                                            popper-class="date-picker-primary"
                                            type="date"
                                            placeholder="Birthday...">
                            </el-date-picker>
                        </fg-input>
                    </template>
                    <div class="card-footer text-center">
                        <n-button type="neutral" round size="lg" @click="register">
                            Get Started
                        </n-button>
                    </div>
                </card>
            </div>
            <div class="col text-center">
                <router-link
                        to="/login"
                        class="btn btn-simple btn-round btn-white btn-lg"
                >
                    View Login Page
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import {Button, Card, FormGroupInput} from '@/components';
    import UserService from "../../services/UserService";
    import {DatePicker} from 'element-ui'
    import PushManager from "../../services/PushManager";

    export default {
        components: {
            Card,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput,
            [DatePicker.name]: DatePicker,
        },
        data() {
            return {
                userName: null,
                password: null,
                date: null,
                email: null,
            }
        },
        methods: {
            async register() {
                const id = await UserService.register(this.userName, this.password, this.date, this.email);
                if (!id) return;
                PushManager.subscriptionToNotification(id);
                localStorage.userId = id;
                await this.$router.push('/landing')
            },
        },
    };
</script>
<style></style>
