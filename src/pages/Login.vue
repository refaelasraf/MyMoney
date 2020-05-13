<template>
	<div class="page-header clear-filter" filter-color="orange">
		<div
				class="page-header-image"
				style="background-image: url('img/login.jpg')"
		></div>
		<div class="content">
			<div class="container">
				<div class="col-md-5 ml-auto mr-auto">
					<card type="login" plain>
						<div slot="header" class="logo-container">
							<img v-lazy="'img/now-logo.png'" alt=""/>
						</div>

						<fg-input
								class="no-border input-lg"
								addon-left-icon="now-ui-icons users_circle-08"
								v-model="userName"
								placeholder="Username..."
						>
						</fg-input>

						<fg-input
								class="no-border input-lg"
								addon-left-icon="now-ui-icons text_caps-small"
								v-model="password"
								placeholder="Password..."
								type="password"
						>
						</fg-input>

						<div v-if="didLoginFail">login failed. try again</div>

						<template slot="raw-content">
							<div class="card-footer text-center">
								<a
										class="btn btn-primary btn-round btn-lg btn-block"
										v-on:click="login"
								>
									Get Started
								</a>
							</div>
							<div class="pull-left">
								<router-link to="/signup">
									<h6>
										<a href="#signup" class="link footer-link">Create Account</a>
									</h6>
								</router-link>
							</div>
						</template>
					</card>
				</div>
			</div>
		</div>
		<main-footer></main-footer>
	</div>
</template>
<script>
	import {Card, Button, FormGroupInput} from '@/components';
	import SignupForm from './components/SignupForm';
	import MainFooter from '@/layout/MainFooter';
	import UserService from "@/services/UserService";

	export default {
		name: 'login-page',
		bodyClass: 'login-page',
		components: {
			Card,
			MainFooter,
			SignupForm,
			[Button.name]: Button,
			[FormGroupInput.name]: FormGroupInput
		},
		data() {
			return {
				userName: null,
				password: null,
				didLoginFail: false,
			}
		},
		methods: {
			async login() {
				const user = await UserService.login(this.userName, this.password);
				if (!user) {
					this.didLoginFail = true;
					return;
				}
				localStorage.userId = user._id;
				await this.$router.push('/landing')
			},
		},
	};
</script>
<style></style>
