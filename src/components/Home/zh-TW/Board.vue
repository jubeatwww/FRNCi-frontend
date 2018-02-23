<template>
    <section>
       <div class="mask">
            <md-layout md-align="center">
                <md-layout md-flex="70" md-align="center">
                    <h2>【Glocal Click 前導活動 】限量報名中！</h2>
                    <h5>自在說外語 x 跨文化交流 x 你的國際交友圈</h5>
                </md-layout>
                <md-layout md-flex="50" md-align="center" md-column>
                    <p>截 止 倒 數</p>
                    <md-layout>
                        <div>
                            <span class="counter-num">134</span><br><span>days</span>
                        </div> 
                        <div>
                            <span class="counter-num">12 </span><br><span>hours</span>
                        </div>
                        <div>
                            <span class="counter-num">50 </span><br><span>minutes</span>
                        </div>
                        <div>
                            <span class="counter-num">33 </span><br><span>seconds</span>
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

        h2 {
            font-weight: 600;
            line-height: 1.2;
            margin-bottom: 1rem;
            font-size: 48px;
        }

        h5 {
            font-size: 30px;
        }
    }
}
</style>
