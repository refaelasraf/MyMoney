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

			<h3 class="title">Cards</h3>
			<div v-for="(card, index) in creditCards" :key="card._id">
				<h5 class="description">
					<i class="now-ui-icons shopping_credit-card">{{card.creditNumber}} {{card.expiration}}</i>
					<n-button type="info" style="margin-right: 5px;" @click.native="openEditCreditCardModal(index)">
						Edit
					</n-button>
					<n-button type="danger" @click.native="modals.deleteCard = {isVisible: true, index}">Delete
					</n-button>
				</h5>
			</div>
			<n-button type="success" style="margin-right: 5px;" @click.native="modals.addCard.isVisible = true">Add
			</n-button>

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

			<modal :show.sync="modals.editCard.isVisible" headerClasses="justify-content-center">
				<h4 slot="header" class="title title-up">Edit Credit Card Details</h4>
				<fg-input placeholder="Card number" v-model="modals.editCard.creditNumber"></fg-input>
				<fg-input placeholder="Safety number" v-model="modals.editCard.safetyNumber"></fg-input>
				<fg-input placeholder="Expiration number" v-model="modals.editCard.expiration"></fg-input>
				<template slot="footer">
					<n-button @click="editCreditCard">Edit</n-button>
					<n-button type="danger" @click.native="modals.editCard.isVisible = false">Close</n-button>
				</template>
			</modal>
			<modal :show.sync="modals.addCard.isVisible" headerClasses="justify-content-center">
				<h4 slot="header" class="title title-up">Add Credit Card Details</h4>
				<fg-input placeholder="Card number" v-model="modals.addCard.creditNumber"></fg-input>
				<fg-input placeholder="Safety number" v-model="modals.addCard.safetyNumber"></fg-input>
				<fg-input placeholder="Expiration number" v-model="modals.addCard.expiration"></fg-input>
				<template slot="footer">
					<n-button @click="addCreditCard">Add</n-button>
					<n-button type="danger" @click.native="modals.addCard.isVisible = false">Close</n-button>
				</template>
			</modal>
			<modal :show.sync="modals.deleteCard.isVisible" headerClasses="justify-content-center">
				<h4 slot="header" class="title title-up">Delete Credit Card</h4>
				<template slot="footer">
					<n-button type="danger" @click="removeCreditCard">Delete</n-button>
					<n-button type="danger" @click.native="modals.deleteCard.isVisible = false">Close</n-button>
				</template>
			</modal>

		</div>
	</div>
</template>
<script>
	import {Modal, Button, FormGroupInput} from '@/components';
	import ManageFinancialDataComponent from "./components/ManageFinancialDataComponent";
	import BankAccountService from "../services/BankAccountService";
	import CreditCardService from "../services/CreditCardService";

	export default {
		name: 'managefinancialdataManager',
		bodyClass: 'manage-financial-page',
		components: {
			ManageFinancialDataComponent,
			[Button.name]: Button,
			[FormGroupInput.name]: FormGroupInput,
			Modal
		},
		async created() {
			this.bankAccounts = await BankAccountService.get(localStorage.userId);
			this.creditCards = await CreditCardService.get(localStorage.userId);
		},
		data() {
			return {
				bankAccounts: null,
				creditCards: null,
				inputVal: null,
				modals: {
					classic: false,
					editProfile: false,
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
					editCard: {
						isVisible: false,
						index: null,
						id: null,
						creditNumber: null,
						expiration: null,
						safetyNumber: null,
					},
					addCard: {
						isVisible: false,
						creditNumber: null,
						expiration: null,
						safetyNumber: null,
					},
					deleteCard: {
						isVisible: false,
						index: null,
					},
				},
			};
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
			async addCreditCard() {
				const formInfo = this.modals.addCard;
				const added = await CreditCardService.add(localStorage.userId, formInfo.creditNumber, formInfo.expiration, formInfo.safetyNumber);
				this.$set(this.creditCards, this.creditCards.length, added);
				this.modals.addBank.isVisible = false;
			},
			openEditCreditCardModal(index) {
				const card = this.creditCards[index];
				this.modals.editCard = {
					isVisible: true,
					index,
					id: card._id,
					creditNumber: card.creditNumber,
					expiration: card.expiration,
					safetyNumber: card.safetyNumber,
				};
			},
			async editCreditCard() {
				const formInfo = this.modals.editCard;
				await CreditCardService.edit(formInfo.id, formInfo.creditNumber, formInfo.expiration, formInfo.safetyNumber);
				const edited = {
					...this.creditCards[formInfo.index],
					creditNumber: formInfo.creditNumber,
					expiration: formInfo.expiration,
					safetyNumber: formInfo.safetyNumber
				};
				this.$set(this.creditCards, formInfo.index, edited);
				this.modals.editCard.isVisible = false;
			},
			async removeCreditCard() {
				await CreditCardService.remove(this.creditCards[this.modals.deleteCard.index]._id);
				this.creditCards.splice(this.modals.deleteCard.index, 1);
				this.modals.deleteCard.isVisible = false;
			},
		}
	};
</script>
<style></style>
