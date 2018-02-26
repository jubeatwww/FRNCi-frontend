<template>
    <section>
        <md-layout md-align="center" md-column>
            <md-layout class="text-dark-gray" md-align="center" md-column>
                <h3>現在報名 3/3, 3/10 Glocal Click 前導活動<br>還有超值限量加碼</h3>
                <h6>讓你掌握訣竅、馬上行動，找到最合拍的國際學伴！</h6>
            </md-layout>
            <md-layout class="mt-5" md-flex="33" md-align="center">
                <!-- plan 1 -->
                <div>
                    <h6>給欠引導或需要突破盲點的你</h6>
                    <div class="card">
                        <h5>NT$. 350</h5>
                        <h6>3/3 語言交換零死角攻略分享會</h6>
                        <hr>
                        <p><i class="em em-gift"></i> 加碼送：</p>
                        <ul>
                            <li>Glocal Click 網站點數 100 點</li>
                            <li>語言交換大補帖(環保e版)</li>
                        </ul>
                        <a href="">我要報名</a>
                    </div>
                </div>
                <!-- plan 3 -->
                <div>
                    <h6>給期待一次到位全面進擊的你</h6>
                    <div class="card border-select">
                        <h5>NT$. 800</h5>
                        <h6 class="default-green-text">3/3 語言交換零死角攻略分享會 <br>+ 3/10 去膩的台北! 與外國人的城市冒險</h6>
                        <hr>
                        <p><i class="em em-gift"></i> 加碼送：</p>
                        <ul>
                            <li>Glocal Click 網站點數 <span class="default-green-text">150 點</span></li>
                            <li>語言交換大補帖(環保e版)</li>
                            <li class="default-green-text">換日線季刊1本</li>
                        </ul>
                        <a href="">我要報名</a>
                    </div>
                </div>
                <!-- plan 2 -->
                <div class="col-10 col-md-4 order-2 order-md-3">
                    <h6>給還在猶豫不決卻心癢癢的你</h6>
                    <div class="card">
                        <h5>NT$. 450</h5>
                        <h6>3/10 去膩的台北! <br>與外國人的城市冒險</h6>              
                        <hr>
                        <p><i class="em em-gift"></i> 加碼送：</p>
                        <ul>
                            <li>Glocal Click 網站點數 100 點</li>
                            <li>語言交換大補帖(環保e版)</li>
                        </ul>
                        <a href="https://m.me/1604262479817205?ref=S1OD57-PG">我要報名</a>
                    </div>
                </div>
                <!-- end plan 2 -->
            </md-layout>
            <md-layout md-align="center">
                <small>*Glocal Click 網站點數：點數除了作為線上媒合學伴使用，未來也能折抵線下活動的參與費用</small>
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

    .text-dark-gray {
        h3 {
            margin: 0;
            color: #343d3c;
            margin-bottom: 1rem;
            font-size: 1.7rem;
            font-weight: 600;
            line-height: 1.2;
        }

        h6 {
            margin: 0;
            margin-bottom: 1rem;
            font-family: inherit;
            font-size: 1rem;
            font-weight: 500;
            line-height: 1.2;
        }
    }

    .mt-5 {
        margin-top: 5rem;
        margin-bottom: 3.8rem;

        div {
            margin-left: 5px;
            margin-right: 5px;
        }

        h6 {
            margin: 0;
            margin-bottom: 1rem;
            font-family: inherit;
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.2;
            letter-spacing: 3px;
        }

        .card {
            position: relative;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            min-width: 10;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0, 0, 0, 0.125);
            border-radius: 0.25rem;
            padding: 1.25rem;

            h5 {
                margin: 0;
                padding-bottom: 3%;
                color: #e45915;
                font-size: 1.3rem;
                font-weight: 600;
            }

            h6 {
                color: #6c757d;
                font-size: 1rem;
                letter-spacing: 0px;
            }

            .default-green-text {
                color: #60bc90;
            }

            hr {
                box-sizing: content-box;
                height: 0;
                overflow: visible;
                border: 0.7px solid rgba(0, 0, 0, 0.125);
            }

            p {
                margin: 0;
                padding-top: 0.8rem;
                padding-bottom: 10px;
                font-size: 1rem;
            }

            ul {
                margin: 0;
                margin-bottom: 1rem;
                    line-height: 1;

                li {
                    text-align: left;
                    font-size: 1rem;
                }
            }

            a {
                width: 95%;
                display: inline-block;
                border: 2px solid #f8b62c;
                background-color: #f8b62c;
                padding: 4px 20px;
                color: #fff;
                letter-spacing: 1px;
                font-size: 1rem;
                font-weight: 600;
                line-height: 1.5;
                border-radius: 0.25rem;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                white-space: nowrap;
                vertical-align: middle;

                &:hover {
                    text-decoration: none;
                }
            }
        }

        .border-select {
            border: 3px solid #60bc90;
        }
    }

    small {
        font-size: 0.9rem;
    }
}
</style>
