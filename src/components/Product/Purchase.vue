<template>
    <div class="product-purchase">
        <div v-if="product" class="d-flex flex-wrap">
            <div class="gc-purchase-order">
                <h6 class="order-price"> {{product.name}} <span class="text-price">{{product.currency}}$. {{product.price}} </span></h6>
                <!-- <h6 class="small-text font-weight-400"> Mar.03 (Sat.) Language Exchange Tips Sharing</h6> -->
                <p class="order-dec">{{product.description}}</p>
                <!-- <p class="tiny-text">Bonus: 100 points for using Glocal Click website, E-Tips for language exchange</p> -->
            </div>
            <div v-if="product.quantity === 0" class="order-quantity">
                <img title="Sold out" src="/static/img/soldout.png">
            </div>
        </div>
        <template v-if="product && product.events && product.events.length">
            <template v-for="event in product.events">
                <div v-if="event.sessions && event.sessions.length" class="purchase-session" :key="event._id">
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
        <div v-if="product && product.use_coupon" class="purchase-coupon">
            <!-- label -->
            <label for="payment-coupon">Promotion / Coupon Code</label>
            <!-- end label -->
            <!-- input -->
            <input v-model="coupon" type="text" id="payment-coupon" name="coupon" class="form-control" placeholder="enter your code to save up to NTD.500" />
            <!-- end input -->
        </div>
        <a v-if="product" @click="orderAndCheckout" :disabled="sending" class="btn highlight-button-default" href="javascript:void(0)">Confirm &amp; Pay</a>
        <div id="gc-ecpay-checkout-form" style="display:none"></div>
        <div class="text-policy">
            <h5>Refund Policy:</h5>
            <ol>
                <li>Tickets for the March 03rd and March 10th events are fully refundable up to 5 days before the events, subject to conditions.</li>
                <li>If the purchaser or user makes use of all or any portion of the special offer package (bonus offers) the ticket(s) for the event are non-refundable and the above condition (1) is no longer valid.</li>
            </ol>
        </div>
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
                this.alertify.alert('Please check your session selection');
            } else if (!this.sending) {
                const token = localStorage.getItem('_token');
                const userId = localStorage.getItem('_id');

                const { nationality } = this.$route.meta.user;
                if (product.tags.indexOf('fn_only') >= 0 && nationality === 'tw') {
                    this.alertify.alert('This event is ony for international.');
                    return;
                } else if (product.tags.indexOf('tw_only') >= 0 && nationality !== 'tw') {
                    this.alertify.alert('This event is only for Taiwanese.');
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
                    this.alertify.alert('Some errors occurred, please try again later');
                    this.sending = false;
                    return;
                }
                if (attendees && attendees.length > 0) {
                    this.alertify.alert('You have already signed up for this event.');
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
.product-purchase {
    margin-bottom: 4%;

    .order-price {
        font-size: 1.5rem;
        margin-bottom: 2rem;

        .text-price {
            color: red;
        }
    }

    .purchase-coupon {
        label {
            font-size: 1rem;
            line-height: 1.8rem;
        }

        input[type="text"] {
            padding: 10px 40px;
            background: #fff;
            border: 1px solid #f8b62c;
            cursor: pointer;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            transform: translateY(0.2rem);
        }
    }

    .highlight-button-default {
        border: 2px solid #f8b62c;
        background-color: #f8b62c;
        padding: 10px 35px;
        color: #fff !important;
        margin: 0 auto;
        margin-top: 2rem;
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

    .text-policy {
        margin: 0 12rem;

        h5 {
            font-size: 1.5rem;
            line-height: 1rem;
            margin-bottom: 3%;
        }

        ol {
            text-align: left;
            font-size: 1rem;
            font-weight: 500;
            line-height: 1.6rem;
        }
    }
}

@media (max-width: 575.98px) {
    .product-purchase {
        margin: 0 1rem;

        .order-price {
            line-height: 1.8rem;
        }

        .text-policy {
            margin: 0 0.5rem;
            margin-top: 10%;

            ol {
                line-height: 1.6rem;
            }
        }
    }
}

@media (min-width: 576px) and (max-width: 991.98px) {
    .product-purchase {
        .text-policy {
            margin: 0 2rem;
            margin-top: 10%;
        }
    }
}
</style>
