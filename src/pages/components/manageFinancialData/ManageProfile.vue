<template>
    <div>
        <h3 class="title">Profile</h3>
        <h5 class="description">
            <div>
                <i class="now-ui-icons users_single-02">   {{user.userName}}</i>
            </div>
            <div>
                <i class="now-ui-icons ui-1_email-85">  {{user.email}}</i>
            </div>
            <div>
                <i class="now-ui-icons shopping_shop">  {{user.city}}</i>
            </div>
            <div>
                <i class="now-ui-icons sport_user-run">  {{user.DistenceFromWork}}</i>
            </div>
            <div>
                <i class="now-ui-icons shopping_cart-simple">  {{user.numOfPersonsToTakeCareOf}}</i>
            </div>
            <div>
                <i class="now-ui-icons ui-2_settings-90">  {{user.numOfProviders}}</i>
            </div>
            <div>
                <i class="now-ui-icons shopping_credit-card">  {{user.netoIncome}}</i>
            </div>
            <div>
                <i class="now-ui-icons business_money-coins">  {{user.taxesPayment}}</i>
            </div>
        </h5>
        <n-button type="info" @click.native="isEditProfileModalVisible = true">Edit</n-button>

        <modal :show.sync="isEditProfileModalVisible" headerClasses="justify-content-center">
            <h4 slot="header" class="title title-up">Modal title editProfile</h4>
            <p>Here will be good good.</p>
            <fg-input placeholder="Name" v-model="user.userName"></fg-input>
            <fg-input placeholder="Email" v-model="user.email"></fg-input>
            <fg-input placeholder="City" v-model="user.city"></fg-input>
            <fg-input placeholder="Distence From Work" v-model="user.DistenceFromWork"></fg-input>
            <fg-input placeholder="Number Of Persons To Take Care Of" v-model="user.numOfPersonsToTakeCareOf"></fg-input>
            <fg-input placeholder="Num Of Providers" v-model="user.numOfProviders"></fg-input>
            <fg-input placeholder="Neto Income" v-model="user.netoIncome"></fg-input>
            <fg-input placeholder="Taxes Payment" v-model="user.taxesPayment"></fg-input>
            
            <template slot="footer">
                <n-button @click="editProfile">Edit</n-button>
                <n-button type="danger" @click.native="isEditProfileModalVisible = false">Close</n-button>
            </template>
        </modal>
    </div>
</template>

<script>
    import {Button, FormGroupInput, Modal} from '@/components';
    import UserService from "../../../services/UserService";

    export default {
        name: "ManageProfile",
        components: {
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput,
            Modal,
        },
        async created() {
            this.user = await UserService.getById(localStorage.userId);
        },
        data() {
            return {
                isEditProfileModalVisible: false,
                inputVal: null,
                user:null,
            }
        },
        methods: {
            async editProfile() {
                await UserService.edit(localStorage.userId, this.user.userName, this.user.email, this.user.city,
                                        this.user.DistenceFromWork, this.user.numOfPersonsToTakeCareOf, this.user.numOfProviders,
                                        this.user.netoIncome, this.user.taxesPayment);
                this.isEditProfileModalVisible = false;
            },
        }
    }
</script>

<style scoped>

</style>