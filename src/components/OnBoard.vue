<template>
    <md-boards id="on-board"
               :md-auto="true"
               :md-infinite="true"
               :md-duration="5000"
               :md-swipeable="true"
               :md-controls="true">
        <md-board class="boards"
                  v-for="slide in backgroundStyles"
                  :key="slide.key">
            <div>
                <img :style="slide.style">
            </div>
        </md-board>
    </md-boards>
</template>

<script>
export default {
    data() {
        return {
            slides: ['banner4.jpg', 'banner6.jpg', 'banner9.jpg',
                'bbqparty_banner.jpg', 'home-banner.jpg'],
        };
    },
    computed: {
        slidePath() {
            return this.slides.map(slide => (`static/img/${slide}`));
        },
        backgroundStyles() {
            return this.slides.map(slide => ({
                key: slide,
                style: {
                    background: `url('static/img/${slide}') no-repeat center center`,
                    '-webkit-background-size': 'cover',
                    '-moz-background-size': 'cover',
                    '-o-background-size': 'cover',
                    'background-size': 'cover',
                },
            }),
            );
        },
    },
};
</script>

<style>
#on-board {
    width: 100%;
    height: 80vh !important;
}

#on-board .boards {
    padding: 0;
}

#on-board img {
    width: 100%;
    height: 100vh;
}

#on-board nav {
    position: absolute;
    top: 0;
    height: 100%;
}

#on-board nav button {
    display: none;
}

#on-board nav button:first-child {
    display: initial;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: url('../assets/arrow-pre.png') no-repeat center center;
    background-size: cover;
}

#on-board nav button:nth-last-child(2) {
    display: initial;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background: url('../assets/arrow-next.png') no-repeat center center;
    background-size: cover;
}

#on-board nav button:first-child.md-button,
#on-board nav button:nth-last-child(2).md-button {
    width: 35px;
    height: 35px;
    min-width: 35px;
    min-height: 35px;
}

#on-board nav button:first-child.md-button i,
#on-board nav button:nth-last-child(2).md-button i{
    display: none;
}

#on-board nav button:first-child.md-button:hover,
#on-board nav button:nth-last-child(2).md-button:hover {
    opacity: .5;
    outline: 0;
}
</style>