<template>
    <div>
        <h3>My Orders</h3>
        <md-progress v-if="loading" :md-indeterminate="true"></md-progress>
        <button v-if="error" v-on:click="loadOrders">Try Again</button>
        <table v-if="!loading && !error && orders && orders.length">
            <tr v-for="order in orders" :key="order._id">
                <td>{{order.tradeDate}}</td>
                <td>{{resolveOrderPrice(order)}}</td>
                <td>{{order.tradeDesc}}</td>
                <td>{{order.status}}</td>
                <td>
                    <button v-if="order.status === 'failed'" v-on-click="() => checkout(order)">Repay order</button>
                </td>
            </tr>
        </table>
        <div id="gc-ecpay-checkout-form" style="display:none"></div>
    </div>
</template>

<script>
import jQuery from 'jquery';

export default {
    data() {
        return {
            orders: null,
            error: false,
            loading: true,
        };
    },
    methods: {
        loadOrders() {
            const token = localStorage.getItem('_token');
            const userId = localStorage.getItem('_id');
            this.api.products.getOrders(userId, token).then((orders) => {
                this.loading = false;
                this.orders = orders;
            }, () => {
                this.error = true;
                this.loading = false;
            });
        },
        resolveOrderPrice(order) {
            // TODO verify this part
            const { orderResult, paymentInfo } = order;
            if (paymentInfo && paymentInfo.TotalAmount) {
                return paymentInfo.TotalAmount;
            }
            if (orderResult && orderResult.TotalAmount) {
                return orderResult.TotalAmount;
            }
            if (order.status === 'done') {
                return '0';
            }
            return 'Not checked out';
        },
        checkout(order) {
            this.loading = true;
            const token = localStorage.getItem('_token');
            this.api.products.checkoutOrder(order._id, token).then((formHtml) => {
                this.loading = false;
                if (formHtml === 'done') {
                    this.order.status = 'done';
                } else {
                    document.getElementById('gc-ecpay-checkout-form').appendChild(jQuery.parseHTML(formHtml)[0]);
                    document.getElementById('_allpayForm').submit();
                }
            }, () => {
                this.loading = false;
            });
        },
    },
    mounted() {
        this.loadOrders();
    },
};
</script>

<style lang="scss">
</style>
