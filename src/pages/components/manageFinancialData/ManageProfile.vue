<template>
    <div>
        <h3 class="title">Profile</h3>
        <h5 class="description">
            <div>
                <i class="now-ui-icons users_single-02"></i>
            </div>
            <div>
                <i class="now-ui-icons ui-1_email-85">  {{user.email}}</i>
            </div>
            <div>
                <i class="now-ui-icons tech_headphones"></i>
            </div>
        </h5>
        <n-button type="info" @click.native="isEditProfileModalVisible = true">Edit</n-button>

        <modal :show.sync="isEditProfileModalVisible" headerClasses="justify-content-center">
            <h4 slot="header" class="title title-up">Modal title editProfile</h4>
            <p>Here will be good good.</p>
            <fg-input placeholder="Name" v-model="inputVal"></fg-input>
            <fg-input placeholder="Email" v-model="inputVal"></fg-input>
            <fg-input placeholder="Tel. number" v-model="inputVal"></fg-input>
            <template slot="footer">
                <n-button>Nice Button</n-button>
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
        }
    }
</script>

<style scoped>

</style>