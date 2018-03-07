<template>
    <section>
       <div class="mask">
            <md-layout md-align="center">
                <md-layout class="gc-board-title" md-flex="70" md-align="center">
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

        .gc-board-title {
            h2 {
                font-weight: 600;
                line-height: 1.6;
                margin-bottom: 1rem;
                font-size: 2.9rem;
            }

            h5 {
                font-size: 1.9rem;
                margin: 0;
                margin-bottom: 1rem;
            }
        }
    }
}

@media (max-width: 575.98px) {
    .md-layout {
        display: flex;
    }

    section {
        .mask {
            height: 400px;

            .gc-board-title {
                min-width: 85%;

                h2 {
                    font-size: 2rem;
                    line-height: 2.5rem;
                    margin: 6rem 0;
                }
            }
        }
    }
}
</style>
