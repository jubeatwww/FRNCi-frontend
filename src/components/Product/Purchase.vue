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
        <template v-if="product && product.events && product.events.length">
            <template v-for="event in product.events">
                <div v-if="event.sessions && event.sessions.length" class="form-group ml-md-5 ml-sm-0" :key="event._id">
                    <label>
                        <span class="fa fa-hand-o-right"></span>
                        Please choose your session of "{{ event.name }}"
                    </label>
                    <div class="radio-group">
                        <template v-for="session in event.sessions">
                            <input
                                type="radio"
                                v-on:change="() => selectSession(event, session)"
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
        <div v-if="product && product.use_coupon" class="form-group">
            <!-- label -->
            <label for="payment-coupon">Promotion / Coupon Code</label>
            <!-- end label -->
            <!-- input -->
            <input v-model="coupon" type="text" id="payment-coupon" name="coupon" class="form-control" placeholder="enter your code to save up to NTD.500" />
            <!-- end input -->
        </div>
        <a v-if="product" @click="orderAndCheckout" :disabled="sending" class="btn highlight-button-default" href="javascript:void(0)">Confirm &amp; Pay</a>
        <div id="gc-ecpay-checkout-form" style="display:none"></div>
    </div>
</template>

<script>

import jQuery from 'jquery';

function checkMeta(meta, events) {
    return events.filter(e => e.sessions && e.sessions.length).every(e => !!meta[e._id]);
}

export default {
    data() {
        return {
            sending: false,
            product: null,
            meta: {},
            coupon: '',
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
            const { product, meta } = this;
            if (!checkMeta(meta, product.events)) {
                alert('Please check your session selection');
            } else if (!this.sending) {
                const token = localStorage.getItem('_token');
                const userId = localStorage.getItem('_id');

                const { nationality } = this.$route.meta.user;
                if (product.tags.indexOf('fn_only') >= 0 && nationality === 'tw') {
                    alert('This event is ony for international.');
                    return;
                } else if (product.tags.indexOf('tw_only') >= 0 && nationality !== 'tw') {
                    alert('This event is only for Taiwanese.');
                    return;
                }

                this.sending = true;

                let attendees;
                try {
                    attendees = await this.api.events.getAttendees({
                        params: { userId },
                        query: {
                            events: product.events.map(e => e._id).join(','),
                        },
                    });
                } catch (e) {
                    console.error(e);
                    alert('Some errors occurred, please try again later');
                    this.sending = false;
                    return;
                }
                if (attendees && attendees.length > 0) {
                    alert('You have already signed up for this event.');
                    this.sending = false;
                    return;
                }

                try {
                    const order = await this.api.products.createOrder(product._id, meta, token,
                        this.coupon);
                    const formHtml = await this.api.products.checkoutOrder(order._id, token);
                    this.sending = false;
                    if (formHtml === 'done') {
                        this.$router.push('/controlpanel/account');
                    } else {
                        document.getElementById('gc-ecpay-checkout-form').appendChild(jQuery.parseHTML(formHtml)[0]);
                        document.getElementById('_allpayForm').submit();
                    }
                } catch (ignored) {
                    this.sending = false;
                }
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
