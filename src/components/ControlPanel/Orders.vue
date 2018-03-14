<template>
    <div id="gc-order">
        <h3>My Orders</h3>
        <md-progress v-if="loading" :md-indeterminate="true"></md-progress>
        <button v-if="error && !loading" v-on:click="loadOrders">Try Again</button>
        <table v-if="!loading && !error && orders && orders.length" class="gc-order-table">
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
            this.loading = true;
            this.api.products.getOrders(userId, token).then((orders) => {
                this.error = false;
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

<style lang="scss" scoped>
#gc-order {
    margin-bottom: 1rem;

    .gc-order-table {
        border: 1px solid #666;
        border-collapse: collapse;

        tr:nth-child(even) {
            background: #fff;
        }

        tr, td {
            border: 1px solid #666;
            padding: 0.5rem 0.3rem;

            &:hover {
                background-color: #a3e9c7;
            }
        }
    }
}
</style>
