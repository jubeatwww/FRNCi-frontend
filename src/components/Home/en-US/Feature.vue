<template>
    <section>
        <md-layout md-column md-align="center">
            <md-layout md-column md-align="center" class="gc-feature-title">
                <h3 class="text-dark-gray">Why Glocal Click?</h3>
                <h5>Find your idea language buddy and make like-minded local friends at the same time!</h5>
            </md-layout>
            <md-layout class="gc-feature-body" md-align="center" style="flex-wrap: nowrap">
                <div class="feature">
                    <img src="/static/img/feature5.png" style="width:150px;">
                    <h5 class="feature-title">Efficient Search</h5>
                    <p class="featkure-text">
                        Tired of shifting through hundreds of posts or profiles? Glocal Click ensures that all profiles on the site are complete and helpful for finding your perfect language buddy.
                    </p>
                </div>
                <div class="feature">
                    <img src="/static/img/feature4.png" style="width:150px;">
                    <h5 class="feature-title">Meaningful Connections</h5>
                    <p class="featkure-text">
                        Glocal Click is more than just a language exchange, it’s about friendships. You are encouraged to interact offline and meet your cross-cultural friends for coffee or to explore the city.
                    </p>
                </div>
                <div class="feature">
                    <img src="/static/img/feature6.png" style="width:150px;">
                    <h5 class="feature-title">Exclusive Benefits</h5>
                    <p class="featkure-text">
                        As a premium member, you can get the discounts or bonus offered by our business partners such as Borderless housing, Airpopo airport shuttle and local cafes for language exchange.
                    </p>
                </div>
            </md-layout>
        </md-layout>
    </section>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
section {
    padding-bottom: 10%;

    .gc-feature-title {
        h3 {
            color: #343d3c;
            font-size: 1.8rem;
            letter-spacing: 0px;
        }

        h5 {
            margin-top: 0;
            font-size: 1.3rem;
            line-height: 1.2;
        }
    }

    .gc-feature-body {
        margin-left: 5%;
        margin-right: 5%;

        .feature {
            margin: 0 1.2%;

            .feature-title {
                color: #000;
                margin: 5% 0;
            }

            .featkure-text {
                line-height: 1.5;
            }
        }
    }
}

@media (max-width: 575.98px) {
    section {
        .gc-feature-title {
            margin: 0 1rem;
        }

        .gc-feature-body {
            .feature {
                margin: 1rem;
            }
        }
    }
}
</style>
