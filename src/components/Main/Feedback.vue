<template>
    <section>
        <div>
            <div></div>
        </div>
        <div>
            <md-card v-for="i in 3" :key="i">
                <md-card-media>
                    <md-avatar class="md-avatar-icon md-large">
                        <md-icon>home</md-icon>
                    </md-avatar>
                </md-card-media>
                <md-card-content>
                    fhoijfoemvvewioevjioewjfoifjiwjfilfjlkddnvkkjnk flkdsjlk djf jj lj ldl
                    fds fsdf s
                    dfsda fas ad fdsa fsd fsda fdsa fds fs fsdfsg fhfdgsa g g
                    gd dfgfd 
                </md-card-content>
                <md-card-header>
                    name
                </md-card-header>
            </md-card>
        </div>
    </section>
</template>
<script>
export default {
};
</script>
<style lang="scss" scoped>
section {
    position: relative;
    overflow: hidden;
    
    & > div {

        &:first-child{
            position: absolute;
            height: 300%;
            width: 200%;
            padding: 0;
            background-color: white;
            z-index: 2;
            transition: all 1s linear;
            //transform: translate(-6%, -5%) rotate(30deg);
            transform: translate(100%) rotate(0deg);


            div {
                position: absolute;
                left: 0;
                width: 1%;
                height: 100%;
                background: linear-gradient(to right, transparent, gray);
            }
        }

        display: flex;
        justify-content: space-around;
        padding: 7% 0;
        
        .md-card{
            width: 100%;
            margin: 0 4%;
        
            .md-card-content{
                word-break: break-all;
            }
        }
    }


}
</style>
