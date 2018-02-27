<template>
    <section>
        <md-layout md-column md-align="center">
            <md-layout md-column md-align="center">
                <h3>Upcoming Events</h3> 
                <h5>
                    In anticipation of the Glocal Click website launch, <br>
                    we will be hosting 3 events in Taipei!
                </h5>   
            </md-layout>
            <md-layout md-align="center" style="flex-wrap: nowrap">
                <div class="card">
                    <a href="taipei-exploration-scavenger-hunt.html">
                    <img src="/static/img/a1.jpg" alt="Card image cap">
                    </a>
                    <div class="card-body">
                        <h6 class="mb-2 font-weight-300">Feb.28 (Wed.)</h6>
                        <h5 class="card-title font-weight-600 mb-1">International Picnic</h5>
                        <p class="card-text small-text text-justify text-center">
                            Looking for a way to kick off the semester with a bang? Share food and culture with local friends! Perfect spot, picnic mats and soft drinks are all prepared!
                        </p>
                    </div>
                    <div class="card-footer">
                        <p><span>NT$. 50</span></p>
                        <a href="https://www.frnci.com/glocalclick/international-picnic_en.html" target="_blank" class="highlight-button-default">Check More</a>
                    </div>
                </div>
                <div class="card">
                    <a href="taipei-exploration-scavenger-hunt.html">
                    <img src="/static/img/a3.jpg" alt="Card image cap">
                    </a>
                    <div class="card-body">
                        <h6 class="mb-2 font-weight-300">Mar.10 (Sat.)</h6>
                        <h5 class="card-title font-weight-600 mb-1">Taipei Exploration Scavenger Hunt</h5>
                        <p class="card-text small-text text-justify text-center">
                            Want to explore Taipei with a fun twist? Don’t miss this thrilling adventure across Taipei City as well as the perfect chance to make new local friends!
                        </p>
                    </div>
                    <div class="card-footer">
                        <p><span>NT$. 450</span></p>
                        <router-link to="/events/2018-03-10-taipei-exploration-scavenger-hunt-en" class="highlight-button-default">Check More</router-link>
                    </div>
                </div>
                <div class="card">
                    <a href="lex-tips-sharing.html">
                        <img src="/static/img/a2.jpg" alt="Card image cap">
                    </a>
                    <div class="card-body">
                        <h6 class="mb-2 font-weight-300">Mar.17 (Sat.)</h6>
                        <h5 class="card-title font-weight-600 mb-1">Top Tips for Mandarin Practice</h5>
                        <p>
                            Want to start language exchanges but find it difficult? Get tips from senior students and learn their experiences in gaining Mandarin fluency.
                        </p>
                    </div>
                    <div class="card-footer">
                        <p><span>NT$. 350</span></p>
                        <router-link to="/events/2018-03-17-top-tips-for-mandarin-practice" class="highlight-button-default">Check More</router-link>
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

    h5 {
        margin: 0;
        font-size: 1.3rem;
        line-height: 1.3;
        margin-bottom: 1.2rem;
    }

    h3 {
        color: #343d3c;
        font-size: 1.7rem;
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
            h6.font-weight-300 {
                margin: 0;
                padding-top: 20px;
                font-size: 1.1rem;
                font-weight: 300;
                margin-bottom: 0.5rem;
            }

            h5{
                font-size: 1.4rem;
                font-weight: 600;
            }

            h6.card-title {
                margin: 0;
                margin-bottom: 0.75rem;
                font-size: 1rem;
                font-weight: 700;
            }

            p {
                font-size: 1rem;
                line-height: 1.5;
                padding: 0 5%;

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

            span {
                color: #e45915;
                font-size: 1.5rem;
                font-weight: 600;
            }
            a.highlight-button-default {
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
</style>
