<template>
    <div>
        <header
            v-if="bannerUrl"
            class="page-header mp-scroll bg-mobile"
            itemprop="image"
            data-mp-text="Header"
            :style="`background-image:url('${bannerUrl}');background-size:auto 100%;`"></header>
        <!-- introduction -->
        <section class="mt-5">
            <div class="container">
                <md-layout md-row>
                    <md-layout class="col-md-8 col-sm-12" md-flex="66" md-flex-small="100" md-flex-medium="66">
                        <div v-if="introduction" v-html="introduction"></div>
                    </md-layout>
                    <!-- plan -->
                    <md-layout class="col-md-4 col-sm-12" md-flex="33" md-flex-small="100" md-flex-medium="33">
                        <md-layout md-column>
                            <md-card v-for="p in products" :key="p.product._id" :class="productClassName(p)">
                                <md-card-header>
                                    <div class="md-title text-center text-price">{{p.product.currency}}$. {{p.product.price}}</div>
                                    <div class="md-subhead text-muted text-center">{{p.name}}</div>
                                </md-card-header>
                                <md-card-content>
                                    <p class="mb-0 text-center"><i class="em em-gift"></i> 加碼送：</p>
                                    <ul>
                                        <li v-for="(item, i) in p.product.items" :key="i">{{item}}</li>
                                    </ul>
                                </md-card-content>
                                <md-card-actions>
                                    <md-button
                                        v-on:click="buy(p.product)"
                                        class="card-link btn btn-block highlight-button-default">我要報名</md-button>
                                </md-card-actions>
                            </md-card>
                        </md-layout>
                    </md-layout>
                    <!-- end plan -->
                </md-layout>
            </div>
        </section>
        <!-- end introduction -->
        <!-- information -->
        <section class="pb-0">
            <div v-if="placeDesc" class="container">
                <div class="row justify-content-center">
                    <div v-html="placeDesc" class="col-md-10 text-center"></div>
                </div>
            </div>
            <!-- google map -->
            <div v-if="gmap" class="embed-responsive embed-responsive-21by9" style="max-height:300px;">
                <iframe class="embed-responsive-item" :src="gmap" allowfullscreen></iframe>
            </div>
            <!-- end google map -->
        </section>
        <!-- end information -->
        <!-- other -->
        <section v-if="note" class="bg-default-green pt-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div v-html="note" class="col-md-10 text-center text-white"></div>
                </div>
            </div>
        </section>
        <!-- end other -->
    </div>
</template>

<script>

export default {
    data() {
        return {
            products: [],
            bannerUrl: null,
            name: '',
            placeDesc: '',
            gmap: null,
            introduction: '',
            note: '',
        };
    },
    mounted() {
        const { slug } = this.$route.params;
        this.api.events.getEvent(slug).then((event) => {
            this.products = event.products;
            if (event.banner) {
                this.bannerUrl = event.banner.url;
            }
            this.name = event.name;
            this.placeDesc = event.place.description;
            this.gmap = event.place.gmap;
            this.introduction = event.introduction;
            this.note = event.note;
        }, (err) => {
            console.error(err);
        });
    },
    methods: {
        productClassName(p) {
            return p.featured ? 'card mt-3 border-select' : 'card';
        },
        async buy(product) {
            this.$router.push(`/purchase/${product._id}`);
        },
    },
};
</script>

<style lang="scss" scoped>
.bg-default-green {
    background: #60bc90;
    color: #fff;
}
.page-header {
    height: 400px;
    background-position: center center;
    position: relative;
}
.border-select{
    border:3px solid #60bc90;
}
.embed-responsive {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;

  &::before {
    display: block;
    content: "";
  }

  .embed-responsive-item,
  iframe,
  embed,
  object,
  video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
}

.embed-responsive-21by9 {
  &::before {
    padding-top: percentage(9 / 21);
  }
}
</style>
