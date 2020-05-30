<template>
    <div>
        <div class="page-header clear-filter" filter-color="orange">
            <parallax
                    class="page-header-image"
                    style="background-image:url('img/bg11.jpg')"
            >
            </parallax>
            <div class="container">

                <signup-form></signup-form>
            </div>
        </div>
    </div>
</template>

<script>
    import SignupForm from "./components/SignupForm";
    import Parallax from "../components/Parallax";

    export default {
        name: "SignUp",
        components: {
            SignupForm,
            Parallax
        }
    }
</script>

<style scoped>

</style>