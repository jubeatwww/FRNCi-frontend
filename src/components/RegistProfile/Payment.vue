<template>
    <md-step md-label="Payment" :md-disabled="false" :md-show-actions="false">
        <h3>Choose Your Plan</h3>
        <md-progress
            v-if="paymentInfo.loading"
            :md-indeterminate="true"></md-progress>
        <div v-if="paymentInfo.products && !paymentInfo.loading" class="price-radio-group d-flex flex-column">
            <div v-for="product in paymentInfo.products" :key="product._id">
                <div v-on:click="() => selectProduct(product)" class="plan-check">
                    <input type="radio" :id="product._id" name="plan" :checked="isSelectedProduct(product)">
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
                    <template v-for="event in product.events && product.events.length">
                        <div v-if="event.sessions && event.sessions.length" class="form-group ml-md-5 ml-sm-0" :key="event._id">
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
                <div v-if="product.use_coupon && isSelectedProduct(product)" class="form-group">
                  <!-- label -->
                  <label for="payment-coupon">Promotion / Coupon Code</label>
                  <!-- end label -->
                  <!-- input -->
                  <input v-model="coupon" type="text" id="payment-coupon" name="coupon" class="form-control" placeholder="enter your code to save up to NTD.500" />
                  <!-- end input -->
                </div>
            </div>
            <a v-on:click="orderAndCheckout" class="btn highlight-button-default" href="javascript:void(0)">Next: Confirm &amp; Pay</a>
            <div id="gc-ecpay-checkout-form" style="display:none"></div>
            <div class="text-policy">
                <h5>Refund Policy:</h5>
                <ol>
                    <li>Tickets for the March 03rd and March 10th events are fully refundable up to 5 days before the events, subject to conditions.</li>
                    <li>If the purchaser or user makes use of all or any portion of the special offer package (bonus offers) the ticket(s) for the event are non-refundable and the above condition (1) is no longer valid.</li>
                </ol>
            </div>
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
    }
    return featured;
}

function checkMeta(meta, events) {
    return events.filter(e => e.sessions && e.sessions.length).every(e => !!meta[e._id]);
}

export default {
    props: ['mdDisabled', 'paymentInfo'],
    data() {
        return {
            meta: {},
            product: null,
            coupon: '',
        };
    },
    watch: {
        paymentInfo: {
            handler(oldPaymentInfo, newPaymentInfo) {
                const products = newPaymentInfo.products;
                if (products && products.length) {
                    this.selectProduct(findFeaturedProduct(products));
                }
            },
            deep: true,
        },
    },
    methods: {
        selectProduct(product) {
            if (product && product.quantity > 0) {
                this.product = product;
            }
        },
        selectSession(event, session) {
            this.meta[event._id] = { session: session.key };
        },
        isSelectedProduct(product) {
            return this.product === product;
        },
        isSelectedSession(event, session) {
            const m = this.meta[event._id];
            return m && m.session === session.key;
        },
        async orderAndCheckout() {
            const { product, meta } = this;
            if (product && checkMeta(meta, product.events)) {
                const token = localStorage.getItem('_token');
                const order = await this.api.products.createOrder(product._id,
                    meta, token, this.coupon);
                const formHtml = await this.api.products.checkoutOrder(order._id, token);
                if (formHtml === 'done') {
                    this.$router.push('/controlpanel/account');
                } else {
                    document.getElementById('gc-ecpay-checkout-form').appendChild(jQuery.parseHTML(formHtml)[0]);
                    document.getElementById('_allpayForm').submit();
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.price-radio-group{
    position:relative;
}

.plan-check {
    label{
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.5rem;
        padding:3% 6%;
        color:#707070;
        cursor: pointer;
        margin: 2% 0;
    }

    h6, p {
        font-size: 16px;
        line-height: 5px;
        font-weight: 600;
        .text-price {
            color: #e45915;
        }
    }

    input[type=radio] {
        display: none;
    }

    input[type=radio]:checked + label {
        border:2px solid #60bc90;
        color:#000;
        background:transparent;

    }

    input[type=radio]:disabled + label{
        cursor:not-allowed;
    }

    input[type=radio]:checked + label::after {
        color: #f8b62c;
        font-family: FontAwesome;
        border: 2px solid #f8b62c;
        content: "\f00c";
        font-size: 24px;
        position: absolute;
        top: 35%;
        left: 0%;
        transform: translateX(-50%);
        height: 50px;
        width: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        background: white;
        box-shadow: 0px 2px 5px -2px hsla(0, 0%, 0%, 0.25);
        z-index: 100;
    }
}

.md-step-content h3 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 5%;
}

.highlight-button-default {
    padding: 10px 20px;
    color: #fff !important;
    letter-spacing: 1px;
    border: 2px solid #f8b62c;
    background-color: #f8b62c;
    border-radius: 0.35rem;
    position: absolute;
}

.text-policy {
    margin-top: 15%;

    h5 {
        font-size: 16px;
        line-height: 2px;
    }
}
</style>
