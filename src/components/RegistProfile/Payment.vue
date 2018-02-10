<template>
    <md-step md-label="Payment" :md-disabled="false">
        <h3>Choose Your Plan</h3>
        <md-progress
            v-if="paymentInfo.loading"
            :md-indeterminate="true"></md-progress>
        <div v-if="paymentInfo.products && !paymentInfo.loading">
            <div v-for="product in paymentInfo.products" :key="product._id">
                <div>
                    <div class="col-md col-sm-12 order-2 order-md-1">
                        <h6 class="mb-0"> {{product.name}} <span class="text-price">{{product.currency}}$. {{product.price}} </span></h6>
                        <!-- <h6 class="small-text font-weight-400"> Mar.03 (Sat.) Language Exchange Tips Sharing</h6> -->
                        <p class="small-text mb-0">{{product.description}}</p>
                        <!-- <p class="tiny-text">Bonus: 100 points for using Glocal Click website, E-Tips for language exchange</p> -->
                    </div>
                    <div v-if="product.quantity === 0">Sold out</div>
                </div>
                <div v-if="product.events">
                    <div v-for="event in product.events" :key="event._id">
                        <div v-if="event.sessions">
                             Please choose your session of {{ event.name }}
                            <div v-for="session in event.sessions" :key="session.key">
                                {{ session.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button>Next: Confirm &amp; Pay</button>
        </div>
    </md-step>
</template>

<script>

export default {
    props: ['mdDisabled', 'paymentInfo'],
    data() {
        return {};
    },
    watch: {
    },
    mounted() {
    },
};
</script>

<style lang="scss" scoped>

</style>
