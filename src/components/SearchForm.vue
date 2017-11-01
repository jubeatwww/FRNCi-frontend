<template>
    <form action="">
        <md-input-container>
            <label for="cities">Where are you traveling?</label> 
            <md-select multiple v-model="selectedCities">
                <md-option v-for="(city, index) in cities" :key="index" :value="city">
                    {{ city }}
                </md-option>
            </md-select> 
        </md-input-container>
        <md-input-container>
            <label for="hobbies">What are you into?</label> 
            <md-select multiple v-model="selectedHobbies">
                <md-option v-for="(hobby, index) in hobbies" :key="index" :value="hobby">
                    {{ hobby }}
                </md-option>
            </md-select> 
        </md-input-container>
        <md-theme md-name="black">
            <md-button class="md-raised md-primary">
                <i class="fa fa-search"></i>
                SEARCH</md-button>
        </md-theme>
    </form>
</template>
<<script>
export default {
    data() {
        return {
            cities: ['Taipei', 'New Taipei', 'Hsinchu', 'Taichung', 'Tainan',
                'Kaohsiung', 'Yilan', 'Hualien', 'Outside Taiwan'],
            hobbies: [
                'Art & Craft', 'Leisure & Entertainment', 'Food & Beverages',
                'Outdoors & Nature', 'Sports & Adventure', 'Humanities & Culture',
            ],
            selectedCities: [],
            selectedHobbies: [],
        };
    },
};
</script>
<style lang="scss" scoped>
    form {
        display: flex;
        height: 20vh;
        width: 100%;
        justify-content: center;
        align-items: center;
        background-color: #f8b62c;

        .md-input-container{
            margin: 0 2%;
            width: 35%;
            background: radial-gradient(white 0%, transparent 75%);
            text-align: middle;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            label {
                top: auto;
                padding-left: 10%;
            }

            &.md-has-value{
                label{
                    top: 0;
                }
            }
        }
        
        button.md-theme-black.md-button:not([disabled]).md-primary.md-raised {
            padding: 4px 34px;
            border: 2px solid black;
        }

        button.md-theme-black.md-button:not([disabled]).md-primary.md-raised:hover {
            background-color: transparent;
            color: black;
        }
    }
</style>
