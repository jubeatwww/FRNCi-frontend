<template>
    <section>
        <md-layout md-column md-align="center">
            <md-layout md-column md-align="center" class="gc-events-title">
                <h5>練習外語、走進世界，不用出國<br>你有更自在、有趣、有效的方法</h5> 
                <h3>就從【Glocal Click 系列活動】開始！</h3>   
            </md-layout>
            <md-layout md-align="center" style="flex-wrap: nowrap">
                <div class="card">
                    <router-link to="/events/2018-03-24-speakeasy-mahjong">
                        <img src="/static/img/a4.jpg" alt="Card image cap">
                    </router-link>
                    <div class="card-body">
                        <h6 class="event-date">2018.03.24(六)</h6>
                        <h5 class="card-title">【SpeakEsy 語言輕鬆說】</h5>
                        <h6 class="card-title">Let’s Play Mahjong x Language Exchange</h6>
                        <p class="card-text small-text text-justify text-center">
                            面對外國朋友常不知道要說什麼嗎？<br>
                            那就用麻將開啟話題、邊玩邊聊吧！<br>
                            來 SpeakEasy 認識外國朋友、共同提升外語能力<br>
                            體驗國際化的多語言環境<br>
                            走出教室和 Native Speaker 一起輕鬆開口說<br>
                        </p>
                    </div>
                    <div class="card-footer">
                        <p class="text-right"><span class="text-price">NT$. 250</span></p>
                        <router-link to="/events/2018-03-24-speakeasy-mahjong" class="highlight-button-default">想看更多</router-link>
                    </div>
                </div>
                <div class="card">
                    <router-link to="/events/2018-04-21-taiwan-craft-beer-night">
                        <img src="/static/img/a5.jpg" alt="Card image cap">
                    </router-link>
                    <div class="card-body">
                        <h6 class="event-date">2018.04.21(六)</h6>
                        <h5 class="card-title">地下快閃！台灣精釀啤酒夜</h5>
                        <h6 class="card-title"></h6>
                        <p class="card-text small-text text-justify text-center">
                            好久不見的台灣精釀啤酒夜回來啦！<br>
                            和各國朋友一起品嚐在地鮮釀搭配經典台式下酒菜<br>
                            還有各種遊戲競賽，自然互動不怕乾，盡情暢飲、暢聊吧！<br>
                        </p>
                    </div>
                    <div class="card-footer">
                        <p class="text-right">單人早鳥票<span class="text-price"> NT$. 300</span></p>
                        <router-link to="/events/2018-04-21-taiwan-craft-beer-night" class="highlight-button-default">想看更多</router-link>
                    </div>
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
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 10%;

    .gc-events-title {
        h5 {
            margin: 0;
            font-size: 1.3rem;
            line-height: 1.3;
        }

        h3 {
            color: #343d3c;
            font-size: 1.7rem;
        }
    }

    .card {
        margin-right: 15px;
        margin-bottom: 0;
        margin-left: 15px;
        min-width: 0;
        display: flex;
        flex-direction: column;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.25rem;
        padding-bottom: 1%;

        .card-body {
            padding-left: 0;
            margin-bottom: 1rem;
            flex: 1 1 auto;
            text-align: center;

            h6.event-date {
                margin: 0;
                padding-top: 20px;
                font-size: 1.1rem;
                font-weight: 300;
                margin-bottom: 0.5rem;
            }

            h5.card-title {
                margin: 1rem 0;
                font-size: 1.4rem;
                font-weight: 600;
                line-height: 1.5rem;
            }

            h6.card-title {
                margin: 1rem 0;
                font-size: 1rem;
                font-weight: 600;
            }

            p {
                font-size: 1rem;
                line-height: 1.5;

                .badge-default-green {
                    font-size: 18px;
                    font-weight: 500;
                    background: #60bc90;
                    color: #fff;
                    padding: .25em .6em;
                    display: inline-block;
                    line-height: 1;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: baseline;
                    border-radius: 0.25rem;
                }
            }
        }

        .card-footer {
            text-align: center;
            padding: 0;

            .text-right {
                margin-right: 1rem;
                text-align: right;

                .text-price {
                    font-size: 2rem;
                    font-weight: 600;
                    color: #e45915;
                }
            }
            
            .highlight-button-default {
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
    }
}

@media (max-width: 575.98px) {
    section {
        .gc-events-title {
            margin-top: 1rem;

            h3 {
                font-size: 1.5rem;
                line-height: 1.6rem;
            }
        }

        .card {
            margin: 1rem 0;

            .card-footer {
                .text-right {
                    text-align: center;
                }
            }
        }
    }
}
</style>
