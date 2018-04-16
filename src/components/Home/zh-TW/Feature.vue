<template>
    <section>
        <md-layout md-column md-align="center">
            <md-layout md-column md-align="center" class="gc-feature-title">
                <h3 class="text-dark-gray">Glocal Click 特色</h3>
                <h5>練習外語，有更自在、有趣、有效的方法</h5>
            </md-layout>
            <md-layout class="gc-feature-body" md-align="center" style="flex-wrap: nowrap">
                <div class="feature">
                    <img src="/static/img/feature1.png" style="width:150px;">
                    <h5 class="feature-title">完善的個人檔案</h5>
                    <p class="featkure-text">
                        透過語言程度、學習目標、見面頻率等關鍵篩選，讓你更有效率找到適合的學伴，減少到處發文私訊、協調見面時間的心力。
                    </p>
                </div>
                <div class="feature">
                    <img src="/static/img/feature2.png" style="width:150px;">
                    <h5 class="feature-title">多元的驗證機制</h5>
                    <p class="featkure-text">
                        運用回報系統與多面向的驗證機制，包含社群帳號、資料完整度與付費會員認證，讓社群用戶間的互動更安心、更有信任感。
                    </p>
                </div>
                <div class="feature">
                    <img src="/static/img/feature3.png" style="width:150px;">
                    <h5 class="feature-title">彈性的點數機制</h5>
                    <p class="featkure-text">
                        透過精心設計的點數機制，減少社群中亂槍打鳥的機率。點數不只可以作為線上媒合學伴使用，也能折抵線下活動參與費用。
                    </p>
                </div>
                <div class="feature">
                    <img src="/static/img/feature4.png" style="width:150px;">
                    <h5 class="feature-title">合作夥伴的優惠</h5>
                    <p class="featkure-text">
                        付費會員能享有合作夥伴提供的專屬優惠或加值服務，包含語言交換的場地空間、機場接駁服務、戶外活動體驗平台等內容。
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
            line-height: 1.5rem;
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
                line-height: 1.7rem;
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
