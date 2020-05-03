<template>
    <div>
        <div class="page-header page-header-small">
            <parallax
                    class="page-header-image"
                    style="background-image: url('img/bg6.jpg')"
            >
            </parallax>
            <div class="content-center">
                <div class="container"  >
                    <h1 class="title">Your Transactions</h1>
                    <input type="datetime-local" value="2020-03-01T00:00" />
                    <date></date>
                </div>
            </div>
        </div>
        <div class="content-center">
            <div class="container"  >
                <transaction-table></transaction-table>
                <br/>
                <div>
                    Total spending in march -100$
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import TransactionTable from "./components/TransactionTable";

    export default {
        name: 'transaction',
        bodyClass: 'Transaction-page',
        components: {
            TransactionTable
        },
        data() {
            return {
                dateValue: '01/03/2020'
            }
        },
    };
</script>
<style></style>
