<template>
    <div
            class="section section-signup"
            style="background-image: url('img/bg11.jpg'); background-size: cover; background-position: top center; min-height: 700px;"
    >
        <div class="container">
            <div class="row" v-if="step === 1">
                <card class="card-signup" header-classes="text-center" color="orange">
                    <template slot="header">
                        <h3 class="card-title title-up">Sign Up</h3>
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
                                type="email"
                                class="no-border"
                                placeholder="Email"
                                addon-left-icon="now-ui-icons ui-1_email-85"
                                v-model="email"
                        >
                        </fg-input>
                        <fg-input
                                class="no-border"
                                placeholder="City..."
                                addon-left-icon="now-ui-icons shopping_shop"
                                v-model="city"
                        >
                        </fg-input>
                        <fg-input
                                type="number"
                                class="no-border"
                                placeholder="Distence From Work..."
                                addon-left-icon="now-ui-icons sport_user-run"
                                v-model="DistenceFromWork"
                        >
                        </fg-input>
                        <fg-input
                                type="number"
                                class="no-border"
                                placeholder="Number Of Persons To Take Care Of..."
                                addon-left-icon="now-ui-icons shopping_cart-simple"
                                v-model="numOfPersonsToTakeCareOf"
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
                        <n-button type="neutral" round size="lg" @click="next">
                            next
                        </n-button>
                    </div>
                </card>
            </div>
            <div class="row" v-if="step === 2">
                <card class="card-signup" header-classes="text-center" color="orange">
                    <template slot="header">
                        <h3 class="card-title title-up">Sign Up</h3>
                    </template>
                    <template>
                        <fg-input
                                type="number"
                                class="no-border"
                                placeholder="Num Of Providers..."
                                addon-left-icon="now-ui-icons ui-2_settings-90"
                                v-model="numOfProviders"
                        >
                        </fg-input>
                        <fg-input
                                type="number"
                                class="no-border"
                                placeholder="Study Years..."
                                addon-left-icon="now-ui-icons education_hat"
                                v-model="studyYears"
                        >
                        </fg-input>
                        <fg-input
                                type="number"
                                class="no-border"
                                placeholder="Neto Income..."
                                addon-left-icon="now-ui-icons shopping_credit-card"
                                v-model="netoIncome"
                        >
                        </fg-input>
                        <fg-input
                                type="number"
                                class="no-border"
                                placeholder="Taxes Payment..."
                                addon-left-icon="now-ui-icons business_money-coins"
                                v-model="taxesPayment"
                        >
                        </fg-input>
                        <fg-input
                                type="number"
                                class="no-border"
                                placeholder="Social Care Payment..."
                                addon-left-icon="now-ui-icons health_ambulance"
                                v-model="socialCarePayment"
                        >
                        </fg-input>
                    </template>
                    <div class="card-footer text-center">
                        <n-button type="neutral" round size="lg" @click="prev">
                            prev
                        </n-button>
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
                city: null,
                DistenceFromWork: null,
                numOfPersonsToTakeCareOf: null,
                numOfProviders: null,
                studyYears: null,
                netoIncome: null,
                taxesPayment: null,
                socialCarePayment: null,
                step: 1,
            }
        },
        methods: {
            prev() {
                this.step--;
            },
            next() {
                if(!this.userName || !this.password || !this.email || !this.city || !this.DistenceFromWork || !this.numOfPersonsToTakeCareOf)
                {
                    alert('Please fill all');
                }
                else
                {
                    this.step++;
                }
            },
            async register() {
                if(!this.numOfProviders || !this.studyYears || !this.netoIncome || !this.taxesPayment || !this.socialCarePayment)
                {
                    alert('Please fill all');
                }
                else
                {
                    const id = await UserService.register(this.userName, this.password, this.date, this.email,
                                                        this.city, this.DistenceFromWork, this.numOfPersonsToTakeCareOf,
                                                        this.numOfProviders, this.studyYears, this.netoIncome, this.taxesPayment, this.socialCarePayment);
                    if (!id || id === '') return;
                    PushManager.subscriptionToNotification(id);
                    localStorage.userId = id;
                    await this.$router.push('/landing');
                }
            },
        },
    };
</script>
<style></style>
