<template>
    <div>
        <h3 class="title">Banks</h3>
        <div v-for="(account, index) in bankAccounts" :key="account._id">
            <h5 class="description">
                <i class="now-ui-icons business_bank">{{account.bankNumber}} {{account.branchNumber}}
                    {{account.accountNumber}}</i>
                <n-button type="info" style="margin-right: 5px;" @click="openEditBankAccountModal(index)">Edit
                </n-button>
                <n-button type="danger" @click="modals.deleteBank = {isVisible: true, index: index}">Delete
                </n-button>
            </h5>
        </div>
        <n-button type="success" style="margin-right: 5px;" @click.native="modals.addBank.isVisible = true">Add
        </n-button>

        <modal :show.sync="modals.editBank.isVisible" headerClasses="justify-content-center">
            <h4 slot="header" class="title title-up">Edit Bank Account Details</h4>
            <fg-input placeholder="Account number" v-model="modals.editBank.accountNumber"></fg-input>
            <fg-input placeholder="Branch number" v-model="modals.editBank.branchNumber"></fg-input>
            <fg-input placeholder="Bank number" v-model="modals.editBank.bankNumber"></fg-input>
            <template slot="footer">
                <n-button @click="editBankAccount">Edit</n-button>
                <n-button type="danger" @click.native="modals.editBank.isVisible = false">Close</n-button>
            </template>
        </modal>
        <modal :show.sync="modals.addBank.isVisible" headerClasses="justify-content-center">
            <h4 slot="header" class="title title-up">Add a New Bank Account</h4>
            <fg-input placeholder="Account number" v-model="modals.addBank.accountNumber"></fg-input>
            <fg-input placeholder="Branch number" v-model="modals.addBank.branchNumber"></fg-input>
            <fg-input placeholder="Bank number" v-model="modals.addBank.bankNumber"></fg-input>
            <template slot="footer">
                <n-button @click="addBankAccount">Add</n-button>
                <n-button type="danger" @click.native="modals.addBank.isVisible = false">Close</n-button>
            </template>
        </modal>
        <modal :show.sync="modals.deleteBank.isVisible" headerClasses="justify-content-center">
            <h4 slot="header" class="title title-up">Delete Bank Account</h4>
            <template slot="footer">
                <n-button type="danger" @click="removeBankAccount">Delete</n-button>
                <n-button type="danger" @click.native="modals.deleteBank.isVisible = false">Close</n-button>
            </template>
        </modal>
    </div>
</template>

<script>
    import BankAccountService from "../../../services/BankAccountService";
    import {Button, FormGroupInput, Modal} from '@/components';

    export default {
        name: "ManageBankAccounts",
        components: {
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput,
            Modal,
        },
        async created() {
            this.bankAccounts = await BankAccountService.get(localStorage.userId);
        },
        data() {
            return {
                bankAccounts: null,
                modals: {
                    editBank: {
                        isVisible: false,
                        index: null,
                        id: null,
                        bankNumber: null,
                        branchNumber: null,
                        accountNumber: null,
                    },
                    addBank: {
                        isVisible: false,
                        bankNumber: null,
                        branchNumber: null,
                        accountNumber: null,
                    },
                    deleteBank: {
                        isVisible: false,
                        index: null,
                    },
                },
            }
        },
        methods: {
            async addBankAccount() {
                const formInfo = this.modals.addBank;
                const added = await BankAccountService.add(localStorage.userId, formInfo.bankNumber, formInfo.branchNumber, formInfo.accountNumber);
                this.$set(this.bankAccounts, this.bankAccounts.length, added);
                this.modals.addBank.isVisible = false;
            },
            openEditBankAccountModal(index) {
                const account = this.bankAccounts[index];
                this.modals.editBank = {
                    isVisible: true,
                    index,
                    id: account._id,
                    bankNumber: account.bankNumber,
                    branchNumber: account.branchNumber,
                    accountNumber: account.accountNumber,
                };
            },
            async editBankAccount() {
                const formInfo = this.modals.editBank;
                await BankAccountService.edit(formInfo.id, formInfo.bankNumber, formInfo.branchNumber, formInfo.accountNumber);
                const edited = {
                    ...this.bankAccounts[formInfo.index],
                    bankNumber: formInfo.bankNumber,
                    branchNumber: formInfo.bankNumber,
                    accountNumber: formInfo.accountNumber
                };
                this.$set(this.bankAccounts, formInfo.index, edited);
                this.modals.editBank.isVisible = false;
            },
            async removeBankAccount() {
                await BankAccountService.remove(this.bankAccounts[this.modals.deleteBank.index]._id);
                this.bankAccounts.splice(this.modals.deleteBank.index, 1);
                this.modals.deleteBank.isVisible = false;
            },
        }
    }
</script>