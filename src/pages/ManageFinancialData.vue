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
			<manage-profile/>
			<manage-bank-accounts/>
			<manage-credit-cards/>
		</div>
	</div>
</template>
<script>
	import {Modal, Button, FormGroupInput} from '@/components';
	import ManageFinancialDataComponent from "./components/ManageFinancialDataComponent";
	import ManageProfile from "./components/manageFinancialData/ManageProfile";
	import ManageBankAccounts from "./components/manageFinancialData/ManageBankAccounts";
	import ManageCreditCards from "./components/manageFinancialData/ManageCreditCards";

	export default {
		name: 'managefinancialdataManager',
		bodyClass: 'manage-financial-page',
		components: {
			ManageCreditCards,
			ManageBankAccounts,
			ManageProfile,
			ManageFinancialDataComponent,
			[Button.name]: Button,
			[FormGroupInput.name]: FormGroupInput,
			Modal,
		},
	};
</script>
<style></style>
