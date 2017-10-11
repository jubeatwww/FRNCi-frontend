<<template>
    <md-boards id="on-board"
        :md-auto="true" 
        :md-infinite="true" 
        :md-duration="5000" 
        :md-swipeable="true" 
        :md-controls="true">
        
        <md-board class="boards" v-for="slide in slides">
            <div>
                <img>
                <p>{{ slide }}</p>
            </div>
        </md-board>
    </md-boards>
</template>

<<script>
export default {
    data() {
        return {
            slides: ['a', 'b', 'c'],
        };
    },
};
</script>

<style>
#on-board {
    width: 100%;
    height: 80vh !important;
}

#on-board .boards{
    padding: 0;
}

#on-board img{
    width: 100%;
    height: 100vh;
}

#on-board nav{
    position: absolute;
    top: 0;
    height: 100%;
}

#on-board nav button{
    display: none;
}

#on-board nav button:first-child{
    display: initial;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

#on-board nav button:nth-last-child(2){
    display: initial;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
}
</style>