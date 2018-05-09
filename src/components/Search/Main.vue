<template>
    <section>
        <section class="search">
            <md-input-container class="study-lang">
                <label for="studyLanguage">Language to practice</label>
                <md-select name="studyLanguages" v-model="nativeLanguage">
                    <md-option v-for="lang in nativeLanguages" :key="lang.value"
                        :value="lang.value">{{lang.label}}</md-option>
                </md-select>
            </md-input-container>
            <div class="adv-search">
                <SearchField title="Buddy Type" icon="static/img/user.svg">
                    <check-box-group
                        name="hobbytype"
                        :options="buddyTypeOpt"
                        :value.sync="meet">
                    </check-box-group>
                </SearchField>
                <SearchField title="Buddy learns" icon="static/img/speech-bubble.svg">
                    <md-input-container>
                        <label for="nativeLanguage">Buddy learns</label>
                        <md-select name="nativeLanguages" v-model="studyLanguage">
                            <md-option v-for="lang in studyLanguages" :key="lang.value"
                                :value="lang.value">{{lang.label}}</md-option>
                        </md-select>
                    </md-input-container>
                </SearchField>
                <SearchField title="Gender" icon="static/img/gender.svg">
                    <check-box-group
                        name="gender"
                        :options="genderOpt"
                        :value.sync="gender">
                    </check-box-group>
                </SearchField>
                <SearchField title="Location" icon="static/img/pin.svg">
                    <md-input-container>
                        <label for="location">Location</label>
                        <md-select name="location" v-model="location">
                            <md-option v-for="location in locationOpt" :key="location.label"
                                :value="location.value">{{location.label}}</md-option>
                        </md-select>
                    </md-input-container>
                    
                </SearchField>
            </div>
        </section>
        <section class="search-result">
            <div style="display: none">{{queryTrigger}}</div>
            <ul>
                <li v-for="user in searchResult" :key="user._id">
                    <div class="basic">
                        <md-avatar class="md-avatar-icon">
                            <img :src="user.photo" alt="Avatar">
                        </md-avatar>
                        <div class="name">{{user.firstName}}</div>
                        <div class="nationality">from {{nationaltyFullStr(user.nationality)}}</div>
                    </div>
                    <div class="detail">
                        <h6 class="native-lang">Speak: 
                            <span v-for="(lang, i) in user.nativeLanguages" :key="lang.language">
                                <template v-if="i !== 0">,</template>{{idToLanguage(lang.language)}}
                            </span>
                        </h6>
                        <h6 class="study-lang">Learning: 
                            <span v-for="(lang, i) in user.studyLanguages" :key="lang.language">
                                <template v-if="i !== 0">,</template>{{idToLanguage(lang.language)}}
                            </span>
                        </h6>
                        <p class="intro">{{user.introduction}}</p>
                        <ul>
                            <li v-for="interest in user.interests" :key="interest" class="tag">
                                # {{interestFullStr(interest)}}
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </section>
    </section>
</template>

<script>
import SearchField from '../CustomComponents/SearchField';
import CheckBoxGroup from '../CustomComponents/CheckBoxGroup';
import { nationalities, languages, hobbies } from '../../config';

export default {
    components: { SearchField, CheckBoxGroup },
    async created() {
        const nres = await this.api.users.nativeLanguages();
        const sres = await this.api.users.studyLanguages();
        if (nres.ok && sres.ok) {
            this.nativeLanguages.push(...languages.filter(lang => nres.data.includes(lang.value)));

            this.studyLanguages.push(...languages.filter(lang => sres.data.includes(lang.value)));
        }
    },
    data() {
        return {
            studyLanguage: '',
            nativeLanguage: '',
            meet: [],
            gender: [],
            location: '',
            nativeLanguages: [{ label: 'Language to practice', value: '' }],
            studyLanguages: [{ label: 'Any Language', value: '' }],
            buddyTypeOpt: [
                { label: 'Language partners', value: 'language' },
                { label: 'Cross-cultural friends', value: 'cultural' },
            ],
            genderOpt: [{ label: 'male', value: 'm' }, { label: 'female', value: 'f' }],
            locationOpt: [
                { label: 'Any City', value: '' },
                { label: 'Taipei / New Taipei', value: 'Taipei' },
                { label: 'Taoyuan', value: 'Taoyuan' },
                { label: 'Taichung', value: 'Taichung' },
                { label: 'Tainan', value: 'Tainan' },
                { label: 'Kaohsiung', value: 'Kaohsiung' },
            ],
            query: {},
            searchResult: [],
        };
    },
    computed: {
        queryTrigger() {
            // temporary use this computed to update query data for search since
            // computed doesn't support async, should be refractor to watcher in the future
            const data = {
                studyLanguages: this.studyLanguage === '' ? null : this.studyLanguage,
                nativeLanguages: this.nativeLanguage === '' ? null : this.nativeLanguage,
                gender: this.gender.length % 2 ? this.gender[0] : null,
                meet: this.meet.length % 2 ? this.meet[0] : null,
                localCity: this.location === '' ? null : this.location,
            };
            const query = {};
            Object.entries(data).forEach((d) => {
                if (d[1]) {
                    query[d[0]] = d[1];
                }
            });
            this.query = query;
        },
    },
    methods: {
        idToLanguage(id) {
            return languages.find(lang => lang.value === id).label;
        },
        interestFullStr(interest) {
            return hobbies.find(hobby => hobby.value === interest).label;
        },
        nationaltyFullStr(nation) {
            return nationalities.find(n => n.value === nation.toUpperCase()).label;
        },
    },
    watch: {
        async query(query) {
            // need "new AbortController()" to cancel request in the future,
            // better add to APIFactory
            const res = await this.api.users.all({ query });
            if (res.ok) {
                console.log(res.data);
                this.searchResult = res.data;
            }
            return [];
        },
    },
};
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 960px;
    margin: 65px auto 0;
    .study-lang {
        max-width: 50%;
    }
    .adv-search {
        display: flex;
        flex: 0 0 83.333333%;
        max-width: 83.333333%;
        justify-content: space-between;
        margin: 24px 0 0 0;
        padding: 0 15px;
    }
}
.search-result {
    padding: 24px 0 0 0;
    max-width: 960px;
    margin: auto;
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        li {
            display: flex;
            list-style: none;
            margin-bottom: 24px;
            padding: 20px;
            border: 1px solid rgba(0, 0, 0, 0.125);
            border-radius: 0.25rem;

            .basic {
                display: flex;
                flex-direction: column;
                flex: 0 0 25%;

                .md-avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 60px;
                    margin-bottom: 1rem;
                }

                .name {
                    font-size: 24px;
                    font-weight: bold;
                    letter-spacing: 2px;
                    line-height: 1.5;
                    color: #707070;
                }

                .nationality {
                    font-size: 1rem;
                    line-height: 1.5;
                    font-weight: 600;
                    color: #707070;
                }
            }

            .detail {
                display: flex;
                flex-direction: column;
                flex-basis: 0;
                flex-grow: 1;
                max-width: 100%;
                text-align: left;
                padding: 0 15px;

                .native-lang {
                    margin: 0;
                    font-family: inherit;
                    line-height: 1.2;
                    color: inherit;
                    font-size: 1rem;
                }

                .study-lang {
                    margin: 0 0 16px;
                    font-family: inherit;
                    line-height: 1.2;
                    color: inherit;
                    font-size: 1rem;
                }

                .intro {
                    margin: 0 0 1rem;
                    font-size: 14px;
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;
                    padding: 0;

                    li {
                        padding: .25em .6em;
                        list-style: none;
                        margin: .5em;
                        color: #fff;
                        background-color: #f8b62c;
                        font-size: 18px;
                        border-radius: 0.25rem;
                        font-size: 18px;
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>
