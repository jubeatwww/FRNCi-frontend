<template>
    <section>
       <div class="mask">
            <md-layout md-align="center">
                <md-layout class="gc-board-title" md-flex="70" md-align="center">
                    <h2>【Glocal Click 前導活動 】限量報名中！</h2>
                    <h5>自在說外語 x 跨文化交流 x 你的國際交友圈</h5>
                </md-layout>
                <md-layout md-flex="50" md-align="center" md-column class="counterdown">
                    <p>截 止 倒 數</p>
                    <md-layout md-align="center">
                        <div class="counter">
                            <span class="counter-num">{{date}}</span><br><span>days</span>
                        </div> 
                        <div class="counter">
                            <span class="counter-num">{{hours}} </span><br><span>hours</span>
                        </div>
                        <div class="counter">
                            <span class="counter-num">{{minutes}} </span><br><span>minutes</span>
                        </div>
                        <div class="counter">
                            <span class="counter-num">{{seconds}} </span><br><span>seconds</span>
                        </div>
                    </md-layout>
                </md-layout>
           </md-layout>
       </div> 
    </section>
</template>

<script>
export default {
    data() {
        return {
            dueDate: new Date('2018-03-08T00:00:00Z').getTime(),
            now: new Date(Date.now()).getTime(),
        };
    },
    created() {
        setInterval(() => {
            this.now = new Date(Date.now()).getTime();
        }, 500);
    },
    computed: {
        diff() {
            return this.dueDate - this.now > 0 ? new Date(this.dueDate - this.now) : new Date(0);
        },
        date() {
            return this.diff.getDate();
        },
        hours() {
            return this.diff.getHours();
        },
        minutes() {
            return this.diff.getMinutes();
        },
        seconds() {
            return this.diff.getSeconds();
        },
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
                font-weight: 600;
                line-height: 1.6;
                // margin-bottom: 1rem;
                font-size: 2.9rem;
            }

            h5 {
                font-size: 1.9rem;
                margin: 0;
                // margin-bottom: 1rem;
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
