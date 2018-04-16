<template>
    <section>
        <md-layout md-column md-align="center" class="gc-cooperation-title">
            <h3>School Partnership</h3>
            <md-layout md-align="center">
                <a href="http://mandarin.nccu.edu.tw/" 
                    target="_blank" title="政大華語文教學中心">
                    <img class="cooperation-img" src="/static/img/logo_CLC.png" style="width:150px;" alt="logo clc">
                </a> 
                <a href="https://www.tcamandarin.com/" target="_blank"
                    title="TCA | Taiwan Chinese Academy - Learn Chinese in Taipei">
                    <img class="cooperation-img" src="/static/img/logo_TCA.png" style="width:180px;" alt="logo TCA">
                </a>        
            </md-layout>
            <h3 class="text-dark-gray">Business Partners</h3>
            <md-layout md-align="center">
                <a href="https://www.borderless-house-zh.com/tw/" target="_blank"
                    title="Share House BORDERLESS HOUSE">
                    <img class="cooperation-img" src="/static/img/logo_BH.jpg" style="width:180px;" alt="logo Share house">
                </a>
                <a href="https://asiayo.com/zh-tw/" target="_blank"
                    title="AsiaYo: Best hotel &amp; vacation rental booking in Asia, up to 50% off!">
                    <img class="cooperation-img" src="/static/img/logo_asiayo.png" style="width:180px;" alt="logo AsiaYo">
                </a>
                <a href="https://www.dingtaxi.com/zh_TW/c/taiwan" target="_blank"
                    title="【DingTaxi】Taiwan Airport Transfer・Driver-Guide・Bus Rental・Ski/Golf Tour Online Booking">
                    <img class="cooperation-img" src="/static/img/logo_Ding.png" style="width:180px;" alt="logo DingTaxi">
                </a>
                <a href="https://oudo.com/public/frontend/home" target="_blank"
                    title="Oudo Explore Taiwan">
                    <img class="cooperation-img" src="/static/img/logo_oudo.jpg" style="width:150px;" alt="logo oudo">
                </a>
                <a href="https://www.facebook.com/maroubracafe/" target="_blank"
                    title="Maroubra Cafe">
                    <img class="cooperation-img" src="/static/img/logo_mcafe.jpg" style="width:150px;" alt="logo Maroubra Cafe">
                </a>
                <a href="https://www.facebook.com/grace.anan/" target="_blank"
                    title="Grace Anan Cafe&amp;Boutique">
                    <img class="cooperation-img" src="/static/img/logo_grace.jpg" style="width:150px;" alt="logo grace anan">
                </a>
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

    .gc-cooperation-title {
        h3 {
            color: #343d3c;
            margin-bottom: 1.3rem;
            font-size: 1.8rem;
            font-weight: 500;
            line-height: 1.2;
        }

        h3.text-dark-gray {
            margin-top: 5%;
        }

        .cooperation-img {
            margin-right: 1rem;
            vertical-align: middle;
        }
    }
}
</style>
