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
                                    <hr>
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
            eventId: null,
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
            this.eventId = event._id;
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
            const token = localStorage.getItem('_token');
            const userId = localStorage.getItem('_id');
            if (token && userId) {
                const attendees = await this.api.events.getAttendees(userId, token, this.eventId);
                if (attendees && attendees.length > 0) {
                    alert('You have already signed up for this event!');
                    return;
                }
            }
            this.$router.push(`/purchase/${product._id}`);
        },
    },
};
</script>

<style lang="scss" scoped>
.page-header {
    height: 400px;
    background-position: center center;
    position: relative;
}

.mt-5 {
    margin-top: 3rem;
    padding-bottom: 5%;

    .container {
        width: 100%;
        padding-right: 25px;
        padding-left: 25px;
        margin-right: auto;
        margin-left: auto;

        .md-row {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
        }

        .md-layout {
            position: relative;
            width: 100%;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;

            .md-card {
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
                border-radius: 0.25rem;

                .md-card-header {
                    margin-top: 5%;
                    padding: 0 16px;

                    .text-price {
                        color: #e45915;
                        font-weight: 600;
                        margin-bottom: 0.55rem;
                    }

                    .md-subhead {
                        margin-bottom: 0.5rem;
                        font-size: 1rem;
                        font-weight: 700;
                    }

                    hr {
                        margin-top: 1rem;
                        border: 0;
                        border-top: 1px solid rgba(0, 0, 0, 0.1);
                    }
                }

                .md-card-content {
                    font-size: 1rem;
                    font-weight: 500;
                    line-height: 1.1;

                    li {
                        text-align: left;
                    }
                }

                .md-card-actions {
                    margin-bottom: 5%;

                    .highlight-button-default {
                        display: block;
                        font-size: 1rem;
                        line-height: 1.5;
                        border-radius: 0.25rem;
                        width: 100%;
                        border: 2px solid #f8b62c;
                        background-color: #f8b62c;
                        padding: 4px 20px;
                        color: #fff !important;
                        letter-spacing: 1px;
                        margin-bottom: 3%;

                        &:hover {
                            text-decoration: none;
                            background-color: #f8b62c;
                        }
                    }
                }
            }

            .border-select{
                border:3px solid #60bc90;
                margin-top: 1rem;
            }
        }
    }
}

.pb-0 {
    .container {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 4%;
    }
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

.text-center {
    text-align: center;
}

.bg-default-green {
    background: #60bc90;
    color: #fff;
    padding-top: 5%;
    padding-bottom: 3%;
}
</style>

<style>
.md-flex-66 {
    text-align: left;
    font-size: 1.2rem;
}
.md-flex-66 .blockquote {
    border-left: 5px solid #60bc90;
    font-size: 16px;
    line-height: 30px;
    margin: 0 0 20px;
    padding: 20px 40px;
}
.md-flex-66 p {
    font-size: 1rem;
    line-height: 1.5;
}
.default-green-text {
    color: #60bc90 !important;
}

.row h3 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 1.2;
}
.row p {
    margin: 0;
    font-size: 1.2rem;
    /* margin-bottom: 3%; */
    font-weight: 400;
    line-height: 1.5;
}
.row h5 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 700;
}
.row ol {
    display: inline-block;
    text-align: left;
}
.row a {
    color: #fff;
}
.row a:hover {
    color: #fff;
}
</style>
