<template>
    <footer>
        <md-layout md-align="center" id="frnci-info">
            <md-layout md-align="start" md-column>
                <h5 class="text-white">About Us</h5>
                <p style="color: #d5d5d5;">Glocal Click is Taiwan’s newest international language exchange platform that puts the emphasis on in-person connections. Think of it less as a language exchange and more as making new local friends! We believe there is no better way to learn a language than while having real conversations with your friend.</p>
            </md-layout>
            <md-layout md-align="start" md-column>
                <h5 class="text-white">Contact Us</h5>
                <a style="color: #d5d5d5;" href="mailto:contactus@frnci.com">contactus@frnci.com</a>
            </md-layout>
            <md-layout md-align="start" md-column id="links">
                <h5>Follow Us</h5>
                <md-layout>
                    <md-theme md-name="orange">
                        <md-button class="md-icon-button md-raised" @click="fb">
                            <i class="fa fa-facebook"></i>
                        </md-button>
                        <md-button class="md-icon-button md-raised" @click="yt">
                            <i class="fa fa-youtube"></i>
                        </md-button>
                        <md-button class="md-icon-button md-raised" @click="tw">
                            <i class="fa fa-rss"></i>
                        </md-button>
                    </md-theme>
                </md-layout>
            </md-layout>
        </md-layout>
        <div id="copyright">
            <h5 class="text">享旅科技有限公司.© ALL RIGHTS RESERVED.</h5>
        </div>
    </footer>
</template>
<script>
export default {
    methods: {
        fb() {
            window.open('https://www.facebook.com/friendsandcity.tw/');
        },
        yt() {
            window.open('https://www.youtube.com/channel/UCWGQnRc4gd_w3UGbbNzAvKw');
        },
        tw() {
            window.open('http://www.frnci.com/taiwaninsideout/');
        },
    },
};
</script>
<style lang="scss" scoped>

@mixin content(){
    h5{
        color: white;
        margin-bottom: 1rem;
        margin-top: 0;
        font-weight: bold;
        font-size: 1.25rem;
        line-height: 1.2;
        font-family: inherit;
    }
    p, a {
        color: #d5d5d5;
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1rem;
        font-weight: bold;
        line-height: 1.5;
    }
}

footer{
    #frnci-info{
        background: #252525;
        padding: 80px 100px 45px;
        display: flex;
        text-align: left;

        & > .md-layout {
            padding: 0 15px;
        }

        @include content();
        #links{
            flex: .66;
            height: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

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
                background: #f8b62c;
                float: left;
                color: white;
            }
            
            button.md-theme-orange.md-icon-button:not([disabled]).md-raised:hover {
                color: #9a9a9a;
            }
        }
    }

    #copyright{
        background: black;
        padding: 3% 57.5px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .text{
            width: 20%;
            font-size: 11px;
            margin-top: 13px;
            text-align: right;
            color: white;
            margin-bottom: 1rem;
            font-weight: bold;
            line-height: 1.2;
        }
    }
}
</style>
