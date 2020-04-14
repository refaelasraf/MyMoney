<template>
    <div>
    <signup-form></signup-form>
    </div>
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