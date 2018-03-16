<template>
    <section>
       <div class="mask">
            <md-layout md-align="center">
                <md-layout class="gc-board-title" md-flex="70" md-align="center">
                    <h2>Glocal Click</h2>
                    <h5>自在說外語 x 跨文化交流 x 你的國際交友圈</h5>
                    <h6>COMING SOON</h6>
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
        padding: 5% 0;
        background: rgba(0,0,0,0.4);
        height: 100%;
        color: #fff;
        z-index: 999;

        .gc-board-title {
            h2 {
                margin: 2rem 0;
                font-weight: 600;
                line-height: 1.6;
                font-size: 5.5rem;
            }

            h5 {
                margin: 0;
                font-size: 2rem;
            }

            h6 {
                font-size: 1rem;
                font-weight: 600;
                letter-spacing: 1rem;
            }
        }

        .counterdown {
            margin-top: 1.5rem;

            .counter {
                margin: 1.5rem 6% 0;

                .counter-num {
                    font-size: 3rem;
                    font-weight: 600;
                    color: #fff;
                }
            }
        }
    }
}

@media (max-width: 575.98px) {
    section {
        .mask {
            .md-layout {
                display: flex;
            }

            .gc-board-title {
                min-width: 85%;

                h2 {
                    font-size: 2rem;
                    line-height: 2.5rem;
                }

                h5 {
                    font-size: 1.5rem;
                    line-height: 1.7rem;
                    margin-top: 1rem;
                }
            }

            .counterdown {
                min-width: 85%;
                margin-top: 1rem;

                .counter {
                    margin: 5% 2% 0;
                }
            }
        }
    }
}
</style>
