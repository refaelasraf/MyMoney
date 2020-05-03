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
                    <h1 class="title">Manage your Financial Data</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <h3 class="title">Profile</h3>
            <h5 class="description">
                <div>
                    <i class="now-ui-icons users_single-02"> Maccabi</i>
                </div>
                <div>
                    <i class="now-ui-icons ui-1_email-85"> Maccabi@TLV</i>
                </div>
                <div>
                <i class="now-ui-icons tech_headphones"> 0123456789</i>
                </div>
            </h5>
            <n-button type="info">Edit</n-button>

            <h3 class="title">Banks</h3>
            <h5 class="description">
                <i class="now-ui-icons business_bank"> Bank account: Great.Bank ... 223344</i>
            </h5>
            <n-button type="info" style="margin-right: 5px;">Edit</n-button>
            <n-button type="success" style="margin-right: 5px;">Add</n-button>
            <n-button type="danger">Delete</n-button>

            <h3 class="title">Cards</h3>
            <h5 class="description">
                <div>
                    <i class="now-ui-icons shopping_credit-card"> Mastercard: ....456789</i>
                </div>
                <div>
                    <i class="now-ui-icons shopping_credit-card"> Vise: ....987654</i>
                </div>
            </h5>
            <n-button type="info" style="margin-right: 5px;">Edit</n-button>
            <n-button type="success" style="margin-right: 5px;">Add</n-button>
            <n-button type="danger">Delete</n-button>

        </div>
    </div>
</template>
<script>
    import { Button, FormGroupInput } from '@/components';
    import ManageFinancialDataComponent from "./components/ManageFinancialDataComponent";

    export default {
        name: 'managefinancialdataManager',
        bodyClass: 'manage-financial-data-page',
        components: {
            ManageFinancialDataComponent,
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
