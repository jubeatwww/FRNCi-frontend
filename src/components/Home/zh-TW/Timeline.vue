<template>
    <section>
        <md-layout md-column md-align="center">
            <md-layout md-align="center" class="gc-timeline-title">
                <h3>2018 年首場 Glocal Click 交流活動</h3>
            </md-layout>
            <md-layout class="timeline-section">
                <md-layout>
                    <div class="timeline-img">
                        <a title="【國際野餐趣】搶先體驗場" href="https://www.frnci.com/glocalclick/international-picnic_en.html" target="_blank">
                            <img src="/static/img/a1.jpg" alt="Timeline image cap">
                        </a>
                    </div>
                </md-layout>
                <md-layout md-column md-align="start" class="timeline-waypoint">
                    <h5>2/28 (三)【國際野餐趣】搶先體驗場</h5>
                    <h6>在台灣就能認識世界  與多元文化碰撞</h6>
                    <p class="event-description">
                        想體驗如同置身國外的全外語情境嗎?<br>
                        如果你還不知道怎麼開始或怕尷尬癌發作<br>
                        就先來參加我們舉辦的小型國際野餐吧！<br>
                        在輕鬆的氛圍下，不必擔心想不到話題<br>
                        分享彼此的點心飲料，也分享自己的文化和生活
                    </p>
                    <p>交流體驗價 <span class="text-price">NT$ 50</span></p>
                    <a href="https://www.frnci.com/glocalclick/international-picnic_en.html" target="_blank" class="highlight-button-default">想看更多</a>
                </md-layout>
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
    padding-top: 8%;
    padding-bottom: 10%;

    h3 {
        font-size: 1.7rem;
        color: #343d3c;
    }

    .md-layout {
        flex-wrap: nowrap;
    }

    .timeline-section {
        position: relative;

        .timeline-img {
            padding-top: 5%;
            margin-left: 5%;

            a {
                text-decoration: none;
                display: inline-block;
            }
        }

        &::before {
            content: "";
            position: absolute;
            transform: translateX(-50%);
            z-index: 1;
            top: 0;
            bottom: 0;
            left: 50%;
            border-left: 3px solid #3c2617;
        }

        &::after {
            content:"";
            position:absolute;
            height:15px;
            width:15px;
            bottom:0;
            left:50%;
            border-radius:50%;
            border:3px solid #3c2617;
            background-color: #FFF;
            transform: translateX(-50%);
            z-index: 2;
        }

        .timeline-waypoint {
            position: relative;
            padding-top: 30px;
            padding-bottom: 30px;
            margin-left: 5%;
            text-align: left;

            &::before {
                content: "";
                position: absolute;
                transform: translateX(-50%);
                z-index: 1;
                height: 15px;
                width: 15px;
                top: 0;
                left: -5.5%;
                border-radius: 50% ;
                border: 3px solid #3c2617;
                background-color:#FFF;
            }

            h5 {
                margin: 0;
                margin-bottom: 4%;
                font-size: 1.3rem;
            }

            h6 {
                margin: 0;
                margin-bottom: 4%;
                font-size: 1.1rem;
                font-weight: 500;
            }

            .event-description {
                margin: 0;
                font-weight: 400;
                line-height: 1.5;
                margin-bottom: 1rem;
            }

            .text-price {
                color: #e45915;
                font-size: 2rem;
                font-weight: 600;
            }

            .highlight-button-default {
                width: 20%;
                border: 2px solid #f8b62c;
                background-color: #f8b62c;
                padding: 7px 20px;
                display: inline-block;
                font-weight: 400;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                color: #fff !important;
                letter-spacing: 1px;
                border-radius: 0.25rem;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

                &:hover {
                    text-decoration: none;
                }
            }
        }
    }
}
</style>

        