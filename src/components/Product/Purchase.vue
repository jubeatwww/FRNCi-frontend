<template>
    <div class="productPurchase">
        <div v-if="product" class="d-flex flex-wrap">
            <div class="col-md col-sm-12 order-2 order-md-1">
                <h6 class="mb-0"> {{product.name}} <span class="text-price">{{product.currency}}$. {{product.price}} </span></h6>
                <!-- <h6 class="small-text font-weight-400"> Mar.03 (Sat.) Language Exchange Tips Sharing</h6> -->
                <p class="small-text mb-0">{{product.description}}</p>
                <!-- <p class="tiny-text">Bonus: 100 points for using Glocal Click website, E-Tips for language exchange</p> -->
            </div>
            <div v-if="product.quantity === 0" class="col-md-3 col-sm-12 order-1">
                <img title="Sold out" src="images/soldout.png">
            </div>
        </div>
        <template v-if="product && product.events">
            <template v-for="event in product.events">
                <div v-if="event.sessions" class="form-group ml-md-5 ml-sm-0" :key="event._id">
                    <label>
                        <span class="fa fa-hand-o-right"></span>
                        Please choose your session of "{{ event.name }}"
                    </label>
                    <div class="radio-group">
                        <template v-for="session in event.sessions">
                            <input
                                type="radio"
                                :checked="isSelectedSession(event, session)"
                                :id="`${product._id}_s_${session.key}`"
                                :name="`${product._id}_session`"
                                :key="`${session.key}_input`">
                            <label
                                v-on:click="() => selectSession(event, session)"
                                :for="`${product._id}_s_${session.key}`"
                                :key="`${session.key}_label`">
                                {{ session.name }}
                            </label>
                        </template>
                    </div>
                </div>
            </template>
        </template>
        <a v-on:click="orderAndCheckout" class="btn highlight-button-default" href="javascript:void(0)">Confirm &amp; Pay</a>
        <div id="gc-ecpay-checkout-form" style="display:none"></div>
    </div>
</template>

<script>

import jQuery from 'jquery';

export default {
    data() {
        return {
            product: null,
            meta: {},
        };
    },
    mounted() {
        this.api.products.loadProduct(this.$route.params.productId).then((product) => {
            this.product = product;
        }, () => {
            this.$router.push(-1);
        });
    },
    methods: {
        selectSession(event, session) {
            this.meta[event._id] = { session: session.key };
        },
        isSelectedSession(event, session) {
            const m = this.meta[event._id];
            return m && m.session === session.key;
        },
        async orderAndCheckout() {
            const token = localStorage.getItem('_token');
            const order = await this.api.products.createOrder(this.product._id, this.meta, token);
            const formHtml = await this.api.products.checkoutOrder(order._id, token);
            if (formHtml === 'done') {
                this.$router.push('/controlpanel/account');
            } else {
                document.getElementById('gc-ecpay-checkout-form').appendChild(jQuery.parseHTML(formHtml)[0]);
                document.getElementById('_allpayForm').submit();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.productPurchase {
    margin-bottom: 4%;

    h6.mb-0 {
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    .highlight-button-default {
        border: 2px solid #f8b62c;
        background-color: #f8b62c;
        padding: 10px 35px;
        color: #fff !important;
        margin: 0 auto;
        margin-top: 4%;
        white-space: unset;
        display: inline-block;
        font-weight: 600;
        text-align: center;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

        &:hover {
            text-decoration: none;
        }
    }
}
</style>
