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
            <n-button type="info" @click.native="modals.editProfile = true">Edit</n-button>

            <h3 class="title">Banks</h3>
            <h5 class="description">
                <i class="now-ui-icons business_bank"> Bank account: Great.Bank ... 223344</i>
            </h5>
            <n-button type="info" style="margin-right: 5px;" @click.native="modals.editBank = true">Edit</n-button>
            <n-button type="success" style="margin-right: 5px;" @click.native="modals.addBank = true">Add</n-button>
            <n-button type="danger" @click.native="modals.deleteBank = true">Delete</n-button>

            <h3 class="title">Cards</h3>
            <h5 class="description">
                <div>
                    <i class="now-ui-icons shopping_credit-card"> Mastercard: ....456789</i>
                </div>
                <div>
                    <i class="now-ui-icons shopping_credit-card"> Vise: ....987654</i>
                </div>
            </h5>
            <n-button type="info" style="margin-right: 5px;" @click.native="modals.editCard = true">Edit</n-button>
            <n-button type="success" style="margin-right: 5px;" @click.native="modals.addCard = true">Add</n-button>
            <n-button type="danger" @click.native="modals.deleteCard = true">Delete</n-button>

            <modal :show.sync="modals.editProfile" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up">Modal title editProfile</h4>
                <p>Here will be good good.</p>
                <fg-input placeholder="Name" v-model="inputVal"></fg-input>
                <fg-input placeholder="Email" v-model="inputVal"></fg-input>
                <fg-input placeholder="Tel. number" v-model="inputVal"></fg-input>
                <template slot="footer">
                <n-button>Nice Button</n-button>
                <n-button type="danger" @click.native="modals.editProfile = false">Close</n-button>
                </template>
            </modal>

            <modal :show.sync="modals.editBank" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up">Modal title editBank</h4>
                <p>Here will be good good.</p>
                <fg-input placeholder="Name" v-model="inputVal"></fg-input>
                <fg-input placeholder="Account number" v-model="inputVal"></fg-input>
                <template slot="footer">
                <n-button>Nice Button</n-button>
                <n-button type="danger" @click.native="modals.editBank = false">Close</n-button>
                </template>
            </modal>
            <modal :show.sync="modals.addBank" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up">Modal title addBank</h4>
                <p>Here will be good good.</p>
                <fg-input placeholder="Name" v-model="inputVal"></fg-input>
                <fg-input placeholder="Account number" v-model="inputVal"></fg-input>
                <template slot="footer">
                <n-button>Nice Button</n-button>
                <n-button type="danger" @click.native="modals.addBank = false">Close</n-button>
                </template>
            </modal>
            <modal :show.sync="modals.deleteBank" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up">Modal title deleteBank</h4>
                <p>Here will be good good.</p>
                <template slot="footer">
                <n-button type="danger">Nice DELETEBANK Button</n-button>
                <n-button type="danger" @click.native="modals.deleteBank = false">Close</n-button>
                </template>
            </modal>

            <modal :show.sync="modals.editCard" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up">Modal title editCard</h4>
                <p>Here will be good good.</p>
                <fg-input placeholder="Name" v-model="inputVal"></fg-input>
                <fg-input placeholder="Card number" v-model="inputVal"></fg-input>
                <template slot="footer">
                <n-button>Nice Button</n-button>
                <n-button type="danger" @click.native="modals.editCard = false">Close</n-button>
                </template>
            </modal>
            <modal :show.sync="modals.addCard" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up">Modal title addCard</h4>
                <p>Here will be good good.</p>
                <fg-input placeholder="Name" v-model="inputVal"></fg-input>
                <fg-input placeholder="Card number" v-model="inputVal"></fg-input>
                <template slot="footer">
                <n-button>Nice Button</n-button>
                <n-button type="danger" @click.native="modals.addCard = false">Close</n-button>
                </template>
            </modal>
            <modal :show.sync="modals.deleteCard" headerClasses="justify-content-center">
                <h4 slot="header" class="title title-up">Modal title deleteCard</h4>
                <p>Here will be good good.</p>
                <template slot="footer">
                <n-button type="danger">Nice DELETECARD Button</n-button>
                <n-button type="danger" @click.native="modals.deleteCard = false">Close</n-button>
                </template>
            </modal>
            
        </div>
    </div>
</template>
<script>
    import {Modal, Button, FormGroupInput } from '@/components';
    import ManageFinancialDataComponent from "./components/ManageFinancialDataComponent";

    export default {
        name: 'managefinancialdataManager',
        bodyClass: 'manage-financial-page',
        components: {
            ManageFinancialDataComponent,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput,
            Modal
        },
        data() {
            return {         
                modals: {
                  classic: false,
                  editProfile: false,
                  editBank: false,
                  addBank: false,
                  deleteBank: false,
                  editCard: false,
                  addCard: false,
                  deleteCard: false
                }
            };
        }
    };
</script>
<style></style>
