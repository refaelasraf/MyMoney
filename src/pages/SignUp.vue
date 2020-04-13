<template>
    <signup-form></signup-form>
</template>

<script>
    import SignupForm from "./components/SignupForm";
    import MainFooter from '@/layout/MainFooter';
    export default {
        name: "SignUp",
        components: {
            MainFooter,
            SignupForm,
        }
    }
</script>

<style scoped>

</style>