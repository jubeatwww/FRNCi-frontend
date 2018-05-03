<template>
    <div>
        <header
            v-if="bannerUrl"
            class="page-header mp-scroll bg-mobile"
            itemprop="image"
            data-mp-text="Header"
            :style="`background-image:url('${bannerUrl}');background-size:auto 100%;`"></header>
        <!-- introduction -->
        <section class="gc-events-content">
            <div class="container">
                <md-layout md-row>
                    <md-layout class="col-md-8 col-sm-12 event-dec" md-flex="66" md-flex-small="100" md-flex-medium="66">
                        <div v-if="introduction" v-html="introduction"></div>
                    </md-layout>
                    <!-- plan -->
                    <md-layout class="col-md-4 col-sm-12 event-plan" md-flex="33" md-flex-small="100" md-flex-medium="33">
                        <md-layout md-column>
                            <md-card v-for="p in products" :key="p.product._id" :class="productClassName(p)">
                                <md-card-header>
                                    <div class="md-title text-center text-price">{{p.product.currency}}$. {{p.product.price}}</div>
                                    <div class="md-subhead text-muted text-center">{{p.name}}</div>
                                    <hr>
                                </md-card-header>
                                <md-card-content>
                                    <ul>
                                        <li v-for="(item, i) in p.product.items" :key="i">{{item}}</li>
                                    </ul>
                                </md-card-content>
                                <md-card-actions>
                                    <md-button
                                        v-on:click="buy(p.product)"
                                        class="card-link btn btn-block highlight-button-default">{{
                                            tags.indexOf('fn_only') >=0  ? 'Sign Up Now' : '我要報名'
                                        }}</md-button>
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
        <section class="gc-events-local">
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
        <section v-if="note" class="bg-default-green gc-events-note">
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
            tags: [],
        };
    },
    mounted() {
        const { slug } = this.$route.params;
        this.api.events.getEvent({ params: { eventId: slug } }).then((event) => {
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
            this.tags = event.tags;
        }, (err) => {
            console.error(err);
        });
    },
    methods: {
        productClassName(p) {
            return p.featured ? 'card mt-3 border-select' : 'card';
        },
        async buy(product) {
            const userId = localStorage.getItem('_id');
            if (userId) {
                const attendees = await this.api.events.getAttendees({
                    params: { userId },
                    query: { events: this.eventId },
                });
                if (attendees && attendees.length > 0) {
                    this.alertify.notify('You have already signed up for this event!');
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

.gc-events-content {
    margin-top: 3rem;
    margin-bottom: 0;
    padding-bottom: 5%;

    .container {
        width: 100%;
        padding-right: 4rem;
        padding-left: 4rem;
        margin-right: auto;
        margin-left: auto;

        .md-row {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
        }

        .event-plan {
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
                    margin-bottom: 3%;

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

.gc-events-local {
    .container {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 1rem;
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

.gc-events-note {
    padding-top: 5%;
    padding-bottom: 10%;
}

@media (max-width: 575.98px) {
    .page-header {
        height: 200px;
    }
    .gc-events-content {
        .container {
            padding-right: 1.5rem;
            padding-left: 1.5rem;

            .md-row {
                display: grid;

                .event-dec {
                    line-height: 2rem;

                    p {
                        width: 100%;
                    }
                }
                
                .event-plan {
                    margin-top: 2rem;
                }
            }
        }
    }

    .gc-events-local {
        margin-top: 2rem;
    }

    .gc-events-note {
        padding: 5% 1rem 10%;
        font-size: 1rem
    }
}
</style>

<style>
.event-dec {
    text-align: left;
    font-size: 1.2rem;
    line-height: 1.5rem;
    padding-right: 1rem;
}
.event-dec .blockquote {
    border-left: 5px solid #60bc90;
    font-size: 16px;
    line-height: 30px;
    margin: 0 0 20px;
    padding: 20px 40px;
}
.event-dec p {
    font-size: 1rem;
    line-height: 1.5;
}
.default-green-text {
    color: #60bc90 !important;
}

.gc-events-local h3, p {
    margin: 1rem auto;
    line-height: 1.5rem;
}


.gc-events-note h3 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 1.2;
}
.gc-events-note p {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.5;
}
.gc-events-note h5.font-weight-600 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.2;
}
.gc-events-note ol {
    display: inline-block;
    text-align: left;
    margin-left: 10%;
    margin-right: 10%;
}
.gc-events-note h6 {
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.2;
}
.gc-events-note h4 {
    font-size: 1.5rem;
    font-weight: 600;
    padding-top: 3%;
    line-height: 1.2;
}
.gc-events-note .text-white .under-line {
    color: #60bc90;
}
.gc-events-note .text-white .under-line:hover {
    color: #60bc90;
    text-decoration: none;
}

.gc-events-note .event-card {
    margin-top: 2.2rem;
    margin-left: 8%;
    margin-right: 8%;
    padding-right: 15px;
    padding-left: 15px;
    display: flex;
}
.gc-events-note .event-card .card {
    margin: 0 1rem;
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
}
.gc-events-note .mt-3 .card a {
    text-decoration: none;
    color: #6c757d;
}
.gc-events-note .mt-3 .card a:hover {
    color: #6c757d;
}
.text-white img.card-img-top {
    width: 60%;
    padding-bottom: 1.5rem;
}
.card img.card-img-top {
    width: 100%;
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px);
}
.card .card-body {
    padding-left: 1rem;
    margin-bottom: 2rem;
    text-align: left;
}
.card h5.card-title {
    margin: 0;
    font-size: 1.3rem;
}
.card h6 {
    margin: 0.5rem 0;
    font-size: 1rem;
}
.card .card-footer{
    text-align: right;
    padding: 1rem 2rem;
    margin-bottom: 3%;
}
.card .text-right {
    color: #6c757d;
    font-size: 1rem;
    font-weight: 600;
}
.card .text-price {
    color: #e45915;
    font-size: 2rem;
    font-weight: 700;
}

.guest-intro {
  padding-bottom: 5%;
  text-align: center;
}

.gc-events-note .col-md-3 {
    min-width: 25%;
    flex: 0 1 75%;
}

.gc-events-note .col-md-8 {
    min-width: 75%;
    flex: 0 1 75%;
}

.guest-intro img {
    width: 150px;
    border-radius: 50%;
}

.guest-intro h5 {
    margin-bottom: 1rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
}

.guest-intro h5 span {
    background-color: #f8b62c;
    color: #fff;
    font-size: 18PX;
    padding: 3px 5px;
    line-height: 20px;
    letter-spacing: 2px;
}

.guest-intro p {
    margin-bottom: 1rem;
    font-weight: 500;
    line-height: 1.2;
}

@media (max-width: 575.98px) {
    .gc-events-note .event-card {
        display: grid;
    }

    .gc-events-note .event-card .card {
        margin: 1rem 0;
    }

    .card .card-footer {
        text-align: center;
        padding: 1rem 0;
    }
}
</style>
