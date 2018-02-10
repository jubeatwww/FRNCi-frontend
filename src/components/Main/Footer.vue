<template>
    <footer>
        <div id="frnci-info">
            <div id="qr-code">
                <h5>SUBSCRIBE FOR LATEST NEWS</h5>
                <img src="/static/img/line.png" />
            </div>
            <div id="links">
                <div class="services">
                    <h5>Services</h5>
                    <ul>
                        <li><a href="">UPCOMING EVENTS</a></li>
                        <li><a href="">BUDDY PROGRAM</a></li>
                        <li><a href="">STORY BOX</a></li>
                        <li><a href="">TAIWAN INSIDE OUT</a></li>
                    </ul>
                </div>
                <div class="about">
                    <h5>About FRNCi</h5>
                    <ul>
                        <li><a href="">About us</a></li>
                        <li><a href="">FRNCier Tips</a></li>
                        <li><a href="">Terms of Service</a></li>
                        <li><a href="">Privacy Policy</a></li>
                    </ul>
                </div>
                <div class="follow-us">
                    <h5>Follow Us</h5>
                    <md-theme md-name="orange">
                        <md-button class="md-icon-button md-raised">
                            <i class="fa fa-facebook"></i>
                        </md-button>
                        <md-button class="md-icon-button md-raised">
                            <i class="fa fa-instagram"></i>
                        </md-button>
                        <md-button class="md-icon-button md-raised">
                            <i class="fa fa-twitter"></i>
                        </md-button>
                        <md-button class="md-icon-button md-raised">
                            <i class="fa fa-youtube"></i>
                        </md-button>
                    </md-theme>
                </div>
                <div class="press">
                    <h5>Press</h5>
                    <ul>
                        <a v-for="i in 8" :key="i">
                            <img :src="'/static/img/press' + i + '.png'" />
                        </a>
                    </ul>
                </div>
            </div>
        </div>
        <div id="copyright">
            <div class="text">FRNCI.© ALL RIGHTS RESERVED.</div>
            <a><img src="/static/img/logowhite.png" /></a>
        </div>
    </footer>
</template>
<script>
export default {

};
</script>
<style lang="scss" scoped>

@mixin h5-title(){
    h5{
        color: white;
        margin-bottom: 20px;
        letter-spacing: 2px;
        font-weight: 600;
        font-size: 11px;
        text-transform: uppercase;
        text-align: left;
    }
}

footer{
    #frnci-info{
        background: #252525;
        padding: 80px 30px 45px;
        display: flex;

        #qr-code{
            flex: .34;
            height: 100%;
            @include h5-title();
            h5{
                text-align: center;
            }

            img {
                width: 70%;
                height: auto;
            }
        }

        #links{
            flex: .66;
            height: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            & > div{
                width: 33%;

                @include h5-title();
                ul {
                    list-style: none;
                    padding: 0;

                    li {
                        list-style: none;
                        text-align: left;
                        a{
                            color: #d5d5d5;
                            font-size: 11px;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                        }
                    }
                }

                button.md-theme-orange.md-icon-button:not([disabled]).md-raised {
                    background: #e6af2a;
                    float: left;
                    color: white;
                }
                
                button.md-theme-orange.md-icon-button:not([disabled]).md-raised:hover {
                    color: #9a9a9a;
                }
            }

            .press {
                width: 80%;
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    
                    a {
                        width: 23%;
                        margin: 1% 1%;
                    }
                }
            }
        }
    }

    #copyright{
        background: black;
        padding: 3% 57.5px;
        display: flex;
        align-items: center;

        & > *{
            flex: .5;
        }

        .text{
            text-align: left;
            color: white;
        }

        img{
            max-width: 100px;
            height: auto;
            float: right;
        }
    }
}
</style>
