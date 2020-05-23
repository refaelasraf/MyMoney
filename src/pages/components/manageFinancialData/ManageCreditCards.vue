<template>
	<div>
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
</template>

<script>
	import CreditCardService from "../../../services/CreditCardService";
	import {Modal, Button, FormGroupInput} from '@/components';

	export default {
		name: "ManageCreditCards",
		components: {
			[Button.name]: Button,
			[FormGroupInput.name]: FormGroupInput,
			Modal,
		},
		async created() {
			this.creditCards = await CreditCardService.get(localStorage.userId);
		},
		data() {
			return {
				creditCards: null,
				modals: {
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
			async addCreditCard() {
				const formInfo = this.modals.addCard;
				const added = await CreditCardService.add(localStorage.userId, formInfo.creditNumber, formInfo.expiration, formInfo.safetyNumber);
				this.$set(this.creditCards, this.creditCards.length, added);
				this.modals.addCard.isVisible = false;
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
	}
</script>

<style scoped>

</style>