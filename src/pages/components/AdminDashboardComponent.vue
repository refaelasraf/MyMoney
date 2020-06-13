<template>
	<div id="app" class="center">
		<div class="section">
			<h1>Ages Distribution</h1>
			<GChart
					class="chart"
					type="ColumnChart"
					:data="agesDistribution"
					:options="chartOptions"
					:settings="{ packages: ['corechart', 'columnchart'] }"
			/>
		</div>
        <div class="section">
            <h1>Cities Distribution</h1>
            <GChart
                    class="chart"
                    type="ColumnChart"
                    :data="cityDistribution"
                    :options="chartOptions"
                    :settings="{ packages: ['corechart', 'columnchart'] }"
            />
        </div>
		<div class="section">
			<GChart
					type="Table"
					:data="users"
					:settings="{ packages: ['corechart', 'table'] }"
					style="width: 100%"
			/>
		</div>
	</div>

</template>

<script>
	import {GChart} from "vue-google-charts";
	import {Button} from '@/components';
	import AdminService from "../../services/AdminService";
	import {countBy} from 'lodash';

	export default {
		name: "AdminDashboardComponent",
		components: {
			GChart,
			[Button.name]: Button
		},
		data() {
			const usersInfoHeaders = ['id', 'username', 'birthday', 'email', 'group', 'isAdmin'];

			return {
				// Array will be automatically processed with visualization.arrayToDataTable function
				agesDistribution: [
					['0-18', '19-30', '30-50', '51-70', '71+'],
					[0, 0, 0, 0, 0],
				],
				cityDistribution: [[], []],
				chartOptions: {
					height: 280
				},
				packages: ['gauge', 'table'],
				usersInfoHeaders,
				users: [usersInfoHeaders],

			};
		},
		async created() {
			const users = await AdminService.getUsers();
			this.users = [
				this.usersInfoHeaders,
				...users.map(x => [x._id, x.userName, x.dateOfBirth, x.email, x.groupId, x.isAdmin])
			];
			this.updateAgesDistribution(users);
			this.updateCityDistribution(users);
		},
		methods: {
			updateCityDistribution(users) {
				const cities = users.map(u => u.city);
                const citiesCount = countBy(cities, x => x);
                this.$set(this.cityDistribution, 0, Object.keys(citiesCount));
                this.$set(this.cityDistribution, 1, Object.values(citiesCount));
            },
			updateAgesDistribution(users) {
				const dist = users.map(u => u.dateOfBirth)
					.map(d => this.getAge(d))
					.reduce((accum, age) => {
						if (age <= 18) accum[0]++;
						else if (age <= 30) accum[1]++;
						else if (age <= 50) accum[2]++;
						else if (age <= 70) accum[3]++;
						else accum[4]++;
						return accum;
					}, [0, 0, 0, 0, 0]);
				this.$set(this.agesDistribution, 1, dist);
			},
			getAge(dateString) {
				const today = new Date();
				const birthDate = new Date(dateString);
				const age = today.getFullYear() - birthDate.getFullYear();
				const m = today.getMonth() - birthDate.getMonth();
				if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) return age - 1;
				return age;
			}
		},
	};
</script>
<style>
	.center {
		display: flex;
		flex-wrap: wrap;
	}

	.section {
		flex-basis: 100%;
		width: 100%;
	}

	.chart {
		flex-basis: 20%;
	}
</style>
