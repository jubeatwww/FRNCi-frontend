<template>
    <section>
        <md-layout md-column md-align="center">
            <md-layout md-column md-align="center" class="gc-events-title">
                <h3>Upcoming Events</h3> 
            </md-layout>
            <md-layout md-align="center" style="flex-wrap: nowrap">
                <div class="card">
                    <router-link to="/events/2018-03-24-speakeasy-mahjong-en">
                        <img src="/static/img/a4.jpg" alt="Card image cap">
                    </router-link>
                    <div class="card-body">
                        <h6 class="event-date">Mar.24 (Sat.)</h6>
                        <h5 class="card-title">SpeakEasy - Let’s Play Mahjong x Language Exchange</h5>
                        <p class="card-text text-justify text-left">
                            Been learning Mandarin for a while and wanna try speaking in real life? Hesitate no more, come join us at SpeakEasy!Let’s play Chinese traditional board game - Mahjong together!
                        </p>
                    </div>
                    <div class="card-footer">
                        <p class="text-right"><span class="text-price">NT$. 250</span></p>
                        <router-link to="/events/2018-03-24-speakeasy-mahjong-en" class="highlight-button-default">Check More</router-link>
                    </div>
                </div>
                <div class="card">
                    <router-link to="/events/2018-04-21-taiwan-craft-beer-night-en">
                        <img src="/static/img/a5.jpg" alt="Card image cap">
                    </router-link>
                    <div class="card-body">
                        <h6 class="event-date">Apr.21 (Sat.)</h6>
                        <h5 class="card-title">Underground Pop-up! Taiwan Craft Beer Night</h5>
                        <p class="card-text text-justify text-left">
                            After a busy week, how about chilling out and having fun on Saturday night together in a local way?<br>We invite locals and people from around the world to ROCK this CRAFT BEER NIGHT!!!
                        </p>
                    </div>
                    <div class="card-footer">
                        <p class="text-right">Early Bird<span class="text-price"> NT$. 300</span></p>
                        <router-link to="/events/2018-04-21-taiwan-craft-beer-night-en" class="highlight-button-default">Check More</router-link>
                    </div>
                </div>
                <div class="card">
                    <router-link to="/events/2018-05-26-international-rooftop-party-en">
                        <img src="/static/img/a6.jpg" alt="Card image cap">
                    </router-link>
                    <div class="card-body">
                        <h6 class="event-date">May.26 (Sat.)</h6>
                        <h5 class="card-title">International Rooftop Party</h5>
                        <h6 class="card-subtitle">Live Band x Outdoor BBQ x Drinking Games</h6>
                        <p class="card-text text-justify text-left">
                            Let’s rock the roof off! Join us for an evening of live music, cold beers, tasty BBQ, fun games and of course memorable moments with new friends!
                        </p>
                    </div>
                    <div class="card-footer">
                        <p class="text-right">Early Bird<span class="text-price"> NT$. 550</span></p>
                        <router-link to="/events/2018-05-26-international-rooftop-party-en" class="highlight-button-default">Check More</router-link>
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
    margin-top: 7%;
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 10%;

    .gc-events-title {
        h3 {
            color: #343d3c;
            font-size: 1.9rem;
            margin-bottom: 2rem;
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
            margin-bottom: 0;
            flex: 1 1 auto;
            text-align: center;

            h6.event-date {
                margin: 0;
                margin-bottom: 1rem;
                padding-top: 20px;
                font-size: 1.1rem;
                font-weight: 300;
            }

            h5.card-title {
                margin: 0;
                font-size: 1.4rem;
                font-weight: 600;
                line-height: 1.8rem;
            }

            h6.card-subtitle {
                margin: 0;
                font-size: 1.1rem;
                font-weight: 600;
                line-height: 1.5rem;
            }

            h6.card-title {
                margin: 0;
                margin-bottom: 0.75rem;
                font-size: 1rem;
                font-weight: 700;
            }

            p {
                padding: 0 5%;
                font-size: 1rem;
                font-weight: 500;
                line-height: 1.5;
                text-align: left;

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
            margin-top: 2rem;
            text-align: center;
            padding: 0;

            .text-right {
                text-align: right;
                margin-right: 1rem;
            
                span {
                    color: #e45915;
                    font-size: 1.9rem;
                    font-weight: 600;
                    text-align: right;
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
