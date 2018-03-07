<template>
    <section>
        <md-layout md-align="center">
            <md-layout md-column md-align="center" class="gc-introduction-title">
            <h3>Glocal Click 是什麼？</h3>
                <p>
                    Glocal Click 是 FRNCi 將推出的全新平台，主打<b>「與跨文化朋友自在說外語」的全方位體驗</b><br>
                    有別於一般語言交換 / 學習平台，Glocal Click 透過線上媒合服務和線下交流活動<br>
                    讓你在練習外語的同時，結交來自世界各地的朋友，增進國際思維與在地視野
                </p>
                <p>
                    Glocal 取自於 Global 和 Local，也就是全球在地化；Click 則有一拍即合、一次到位的意涵 <br>
                    Glocal Click 讓你一鍵連結世界，輕鬆找到能見面練外語的國際朋友
                </p>
            </md-layout>
        </md-layout>
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
    padding: 48px 0;
    background-color: #f8b62c;
    color: white;
    margin-bottom: 7%;

    .gc-introduction-title {
        h3 {
            font-size: 1.8rem;
            margin: 0;
            margin-bottom: 1rem;
        }

        p {
            font-size: 1.1rem;
            line-height: 1.4;
            margin: 0 10%;
        }
    }
}

@media (max-width: 575.98px) {
    section {
        .gc-introduction-title {
            margin: 0 1rem 1rem;
        }
    }
}
</style>
