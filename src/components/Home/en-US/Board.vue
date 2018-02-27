<template>
    <section>
       <div class="mask">
            <md-layout md-align="center">
                <md-layout md-flex="70" md-align="center">
                    <h2>Where Language Exchange <br> Meet Local Friends</h2>
                </md-layout>
           </md-layout>
       </div> 
    </section>
</template>

<script>
export default {
    data() {
        return {
        };
    },
};
</script>

<style lang="scss" scoped>
section {
    background-image: url(../../../assets/stock-image-144856145-l-2015.jpg);
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    /* background-position: 50% 50%; */
    background-attachment: fixed;

    .mask {
        padding: 7% 0;
        background: rgba(0,0,0,0.4);
        height: 100%;
        color: #fff;
        z-index: 999;

        h2 {
            font-weight: 600;
            line-height: 1.6;
            margin-bottom: 1rem;
            font-size: 48px;
        }

        h5 {
            font-size: 30px;
            margin: 0;
            margin-bottom: 5%;
        }

        .md-flex-50 {
            .col-4 {
                margin: 0 6%;
                margin-top: 5%;

                .counter-num {
                    font-size: 50px;
                    font-weight: 600;
                    color: #fff;
                }
            }
        }
    }
}
</style>
