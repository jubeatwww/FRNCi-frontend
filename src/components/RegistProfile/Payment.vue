<template>
    <!-- <md-step md-label="Payment" :md-disabled="mdDisabled"> -->
    <md-step md-label="Payment" :md-disabled="false">
        <h3>Choose Your Plan</h3>
        <md-progress
            v-if="paymentInfo.loading"
            :md-indeterminate="true"></md-progress>
        <div v-if="paymentInfo.products && !paymentInfo.loading" class="price-radio-group d-flex flex-column">
            <div v-for="product in paymentInfo.products" :key="product._id">
                <div v-on:click="() => selectProduct(product)" class="plan-check">
                    <input type="radio" :id="product._id" name="plan" :checked="() => isSelectedProduct(product)">
                    <label :for="product._id">
                        <div class="d-flex flex-wrap">
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
                    </label>
                </div>
                <template v-if="product.events" >
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
                                        :checked="() => isSelectedSession(event, session)"
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
            </div>
            <button v-on:click="orderAndCheckout">Next: Confirm &amp; Pay</button>
            <div id="gc-ecpay-checkout-form" style="display:none"></div>
        </div>
    </md-step>
</template>

<script>

import jQuery from 'jquery';

function findFeaturedProduct(products) {
    let featured = null;
    if (products && products.length > 0) {
        products.forEach((product) => {
            if (product.tags && product.tags.indexOf('featured') >= 0) {
                featured = product;
            }
        });
        // for (const p in products) {
        //     if (Object.prototype.hasOwnProperty.call(products, p)) {
        //         const product = products[p];
        //         if (product.tags && product.tags.indexOf('featured') >= 0) {
        //             return product;
        //         }
        //     }
        // }
    }
    return featured;
}

export default {
    props: ['mdDisabled', 'paymentInfo'],
    data() {
        return {
            meta: {},
            product: null,
        };
    },
    watch: {
        'paymentInfo.products': function (newProducts) {
            if (newProducts && newProducts.length) {
                this.selectProduct(findFeaturedProduct(newProducts));
            }
        },
    },
    methods: {
        selectProduct(product) {
            if (product && product.quantity > 0) {
                this.product = product._id;
            }
        },
        selectSession(event, session) {
            this.meta[event._id] = { session: session.key };
        },
        isSelectedProduct(product) {
            return this.product === product._id;
        },
        isSelectedSession(event, session) {
            const m = this.meta[event._id];
            return m && m.session === session.key;
        },
        async orderAndCheckout() {
            const token = localStorage.getItem('_token');
            const order = await this.api.products.createOrder(this.product, this.meta, token);
            const formHtml = await this.api.products.checkoutOrder(order._id, token);
            document.getElementById('gc-ecpay-checkout-form').appendChild(jQuery.parseHTML(formHtml)[0]);
            document.getElementById('_allpayForm').submit();
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
