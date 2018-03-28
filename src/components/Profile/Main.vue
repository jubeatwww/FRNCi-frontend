<template>
    <section>
        <ProfileNav v-bind="user"></ProfileNav>
        <section>
            <div id="profile">
                <field title="LANGUAGE">
                    <Languages
                        :native="user.nativeLanguages"
                        :study="user.studyLanguages"></Languages>
                </field>
                <field title="FAVORITE TOPICS">
                    <ul>
                        <li v-for="interest in user.interests" :key="interest" class="tag">
                            # {{interest}}
                        </li>
                    </ul>
                </field>
                <field title="IDEAL BUDDY">
                    <p>{{user.idealBuddy}}</p>
                </field>
                <field title="LEARNING GOAL">
                    <p>{{user.learningGoal}}</p>
                </field>
                <field title="SELF-INTRODUCTION">
                    <p>{{user.introduction}}</p>
                </field>
                <field title="INTERESTS / HOBBIES">
                    <p>{{user.interestsDesc}}</p>
                </field>
                <div style="display: flex;">
                    <field title="OCCUPATION" style="width: 50%">
                        <p>{{user.occupation}}</p>
                    </field>
                    <field title="MAJOR / SPECIALIZEED FIELD" style="width: 50%">
                        <p>{{user.major}}</p>
                    </field>
                </div>
            </div>
            <div id="status">
                <field title="VERIFICATION">
                    <div class="verification"
                         :class="[user.verification.facebook ? 'verified' : 'unverified']">
                        <i class="fa big-text"
                            :class="[user.verification.facebook ? 'fa-check-circle' : 'fa-times-circle']">
                        </i>
                        Facebook verified
                    </div>
                    <div class="verification"
                         :class="[user.verification.email ? 'verified' : 'unverified']">
                        <i class="fa big-text"
                            :class="[user.verification.email ? 'fa-check-circle' : 'fa-times-circle']">
                        </i>
                        Email verified
                    </div>
                    <!--<div>
                        <i class="fa fa-check-circle big-text"></i>
                        Profile completed
                    </div>
                    <div>
                        <i class="fa fa-check-circle big-text"></i>
                        Partner School verified
                    </div>-->
                    <div class="verification"
                         :class="[user.verification.paid ? 'verified' : 'unverified']">
                        <i class="fa big-text"
                            :class="[user.verification.paid ? 'fa-check-circle' : 'fa-times-circle']">
                        </i>
                        Payment verified
                    </div>
                </field>
                <field title="WHEN TO MEET" class="meet-times">
                    <div class="day">
                        <img src="/static/img/icon-day.png">
                        <span
                            :class="{ active: meetTimesActive['weekday_morning'] || meetTimesActive['weekday_afternoon'] }">
                            Weekday
                        </span>
                        <span
                            :class="{ active: meetTimesActive['weekend_morning'] || meetTimesActive['weekend_afternoon'] }">
                            Weekend
                        </span>
                    </div>
                    <div class="night">
                        <img src="/static/img/icon-night.png">
                        <span
                            :class="{ active: meetTimesActive['weekday_evening'] }">
                            Weekday
                        </span>
                        <span
                            :class="{ active: meetTimesActive['weekend_evening'] }">
                            Weekend
                        </span>
                    </div>
                </field>
                <field title="HOW OFTEN TO MEET" class="meet-frequency">
                    <span>{{meetFrequency}}</span>
                </field>
                <field title="LATEST LOG IN">
                </field>
                <field title="MEMBERSHIP">
                </field>
            </div>
        </section>
    </section>
</template>

<script>
import ProfileNav from './Nav';
import Languages from './Languages';
import Field from './Field';

export default {
    components: {
        ProfileNav,
        Languages,
        Field,
    },
    data() {
        const { params: { id }, meta: { user } } = this.$route;
        return {
            id,
            user,
        };
    },
    computed: {
        meetTimesActive() {
            const meetTimeStr = [
                'weekday_morning',
                'weekday_afternoon',
                'weekday_evening',
                'weekend_morning',
                'weekend_afternoon',
                'weekend_evening',
            ];
            const meetTimesActive = meetTimeStr.reduce((map, obj) => {
                // eslint-disable-next-line
                map[obj] = false;
                return map;
            }, {});
            this.user.meetTimes.forEach((time) => {
                meetTimesActive[time] = true;
            });
            return meetTimesActive;
        },
        meetFrequency() {
            const feq = [
                { label: 'More than once a week', value: 'week_gt' },
                { label: 'Around once a week', value: 'week_eq' },
                { label: 'Around once a month', value: 'month_eq' },
                { label: 'Less than once a month', value: 'month_lt' },
            ];
            const feqVal = feq.find(f => f.value === this.user.meetFrequency);
            return feqVal ? feqVal.label : 'Less than once a month';
        },
    },
};
</script>

<style lang="scss" scoped>
section {
    > section {
        display: flex;
        justify-content: center;

        #profile {
            width: 66.666667%;
            padding: 0 15px;

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
                }
            }
        }

        #status {
            width: 25%;
            padding: 0 15px;

            .verification {
                font-size: 18px;
                font-weight: 500;

            }
            .verified {
                color: #60bc90;
            }

            .unverified {
                color: #d5d5d5;
            }

            .meet-times {
                img {
                    width: 40px;
                }

                span {
                    color: #cec8c8;
                    background-color: #f8f9fa;
                    padding: .25em .6em;
                    border-radius: 10rem;
                    line-height: 1;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: baseline;
                    font-size: 75%;
                    font-weight: bold;
                }

                .active {
                    background: #60bc90;
                    color: white;
                }
            }

            .meet-frequency {
                span {
                    background: #60bc90;
                    color: white;
                    padding: .25em .6em;
                    line-height: 1;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: baseline;
                    border-radius: 0.25rem;
                    font-size: 75%;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
