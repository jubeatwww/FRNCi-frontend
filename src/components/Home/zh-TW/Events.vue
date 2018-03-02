<template>
    <section>
        <md-layout md-column md-align="center">
            <md-layout md-column md-align="center" class="gc-events-title">
                <h5>練習外語、走進世界，不用出國<br>你有更自在、有趣、有效的方法</h5> 
                <h3>就從【Glocal Click 前導活動】開始！</h3>   
            </md-layout>
            <md-layout md-align="center" style="flex-wrap: nowrap">
                <div class="card">
                    <router-link to="/events/2018-03-03-lex-tips-sharing">
                        <img src="/static/img/a2.jpg" alt="Card image cap">
                    </router-link>
                    <div class="card-body">
                        <h6 class="event-date">2018.03.03(六)</h6>
                        <h5 class="card-title">【語言交換零死角】<br>攻略分享會</h5>
                        <h6 class="card-title">其實，語言交換跟你想的不一樣！</h6>
                        <p>
                            <span class="badge badge-default-green"># 誰適合參加?</span><br><br>
                            不知道語言交換怎麼開始的你<br>
                            覺得語言交換對語言進步有限的你<br>
                            覺得語言交換好難持續的你<br>
                            好奇外語練習創新玩法的你<br>
                        </p>
                    </div>
                    <div class="card-footer">
                        <router-link to="/events/2018-03-03-lex-tips-sharing" class="highlight-button-default">想看更多</router-link>
                    </div>
                </div>
                <div class="card">
                    <router-link to="/events/2018-03-10-taipei-exploration-scavenger-hunt">
                        <img src="/static/img/a3.jpg" alt="Card image cap">
                    </router-link>
                    <div class="card-body">
                        <h6 class="event-date">2018.03.10(六)</h6>
                        <h5 class="card-title">【去膩的台北?】<br>與外國人的城市大冒險</h5>
                        <h6 class="card-title">拿掉考試，挑戰你的外語口說吧！</h6>
                        <p class="card-text small-text text-justify text-center">
                            <span class="badge badge-default-green"># 誰適合參加?</span><br><br>
                            想挑戰在真實情境練習外語的你<br>
                            想認識外國朋友但擔心沒話題的你<br>
                            對於語言交換有點猶豫但心癢癢的你<br>
                            說很久要練外語但一直沒機會的你<br>
                        </p>
                    </div>
                    <div class="card-footer">
                        <router-link to="/events/2018-03-10-taipei-exploration-scavenger-hunt" class="highlight-button-default">想看更多</router-link>
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
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.25rem;
        padding-bottom: 1%;

        .card-body {
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
        }
    }
}
</style>
