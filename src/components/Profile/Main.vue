<template>
    <section>
        <div class="invitation" v-if="invitationFrom">
            You get a request from {{invitation.from.firstName}}. He/She is waiting for your reply!
            <a @click="invitationConfirm"><i class="fa fa-check"></i>Accept</a>
            <a @click="invitationReject"><i class="fa fa-times"></i>Ignore</a>
        </div>
        <div class="invitation" v-if="invitationTo">
            {{invitation.to.firstName}} has not replied your request. You can either cancel it or wait.
            <a @click="invitationCancel"><i class="fa fa-times"></i>Cancel the request</a>
        </div>
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
                        <li v-for="interest in interestsFullStr" :key="interest" class="tag">
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
                <div>
                    <field title="OCCUPATION">
                        <p>{{user.occupation}}</p>
                    </field>
                    <field title="MAJOR / SPECIALIZEED FIELD">
                        <p>{{user.major}}</p>
                    </field>
                </div>
            </div>
            <div id="status">
                <field title="VERIFICATION" class="verification-wrapper">
                    <div class="verification"
                         :class="[user.verification.email ? 'verified' : 'unverified']"
                         :style="{ order: verifyItemOrder[0] }">
                        <i class="fa big-text"
                            :class="[user.verification.email ? 'fa-check-circle' : 'fa-times-circle']">
                        </i>
                        Email verified
                    </div>
                    <div class="verification"
                         :class="[user.verification.facebook ? 'verified' : 'unverified']"
                         :style="{ order: verifyItemOrder[1] }">
                        <i class="fa big-text"
                            :class="[user.verification.facebook ? 'fa-check-circle' : 'fa-times-circle']">
                        </i>
                        Facebook verified
                    </div>
                    <div class="verification"
                         :class="[paid ? 'verified' : 'unverified']"
                         :style="{ order: verifyItemOrder[2] }">
                        <i class="fa big-text"
                            :class="[paid ? 'fa-check-circle' : 'fa-times-circle']">
                        </i>
                        Payment verified
                    </div>
                    <div class="verification"
                        :class="[userIntegrity ? 'verified' : 'unverified']"
                         :style="{ order: verifyItemOrder[3] }">
                        <i class="fa big-text"
                            :class="[userIntegrity ? 'fa-check-circle' : 'fa-times-circle']">
                        </i>
                        Profile completed
                    </div>
                    <div class="verification verified" v-if="user.verification.school">
                        <i class="fa big-text fa-check-circle"></i>
                        Partner School verified
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
import { hobbies } from '../../config';

export default {
    components: {
        ProfileNav,
        Languages,
        Field,
    },
    data() {
        const { params: { id } } = this.$route;
        const { user, userIntegrity, invitation, isFriend } = this.$route.meta.otherUser ?
            this.$route.meta.otherUser : this.$route.meta.user;
        const verifyItemOrder = [1, 2, 3, 4, 5];

        [
            user.verification.email,
            user.verification.facebook,
            user.verification.paid,
            userIntegrity,
        ].forEach((ver, i) => {
            if (!ver) {
                verifyItemOrder[i] = 100;
            }
        });

        return {
            id,
            user,
            userIntegrity,
            invitation,
            isFriend,
            paid: user.verification.paid,
            verifyItemOrder,
            apiArgs: { params: { userId: id } },
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
        interestsFullStr() {
            return this.user.interests.map(interest => (
                hobbies.find(hobby => hobby.value === interest).label
            ));
        },
        invitationFrom() {
            return !!(this.invitation && this.invitation.from);
        },
        invitationTo() {
            return !!(this.invitation && this.invitation.to);
        },
    },
    methods: {
        async invitationConfirm() {
            const res = await this.api.invitations.confirm(this.apiArgs);
            if (res.ok) {
                this.alertify.alert('Success!', 'You can chat now!', () => {
                    this.$router.push({ path: `/chat/a/${this.id}` });
                });
            }
        },
        invitationReject() {
            this.alertify.InviteReject(
                `Are you sure you want to ignore this request?
                This chat box will be closed afterwards.`,
                () => {
                    this.api.invitations.reject(this.apiArgs);
                },
            );
        },
        invitationCancel() {
            this.alertify.InviteCancel(
                `Are you sure you want to cancel your request?
                This chat box will be closed afterwards.`,
                () => {
                    this.api.invitations.cancel(this.apiArgs);
                },
            );
        },
    },
};
</script>

<style lang="scss" scoped>
section {
    > section {
        display: flex;
        justify-content: center;

        @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: center;
        }

        #profile {
            width: 66.666667%;
            padding: 0 15px;
            > div:last-child {
                display: flex;
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }

                > div {
                    width: 50%;
                    @media screen and (max-width: 768px) {
                        width: 100%;
                    }
                }
            }

            @media screen and (max-width: 768px) {
                width: 75%;
            }
            @media screen and (max-width: 570px) {
                width: 100%;
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

        #status {
            width: 25%;
            padding: 0 15px;
            @media screen and (max-width: 768px) {
                width: 75%;
            }
            @media screen and (max-width: 570px) {
                width: 100%;
            }

            .verification-wrapper {
                display: flex;
                flex-direction: column;
            }

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
                    @media screen and (max-width: 768px) {
                        width: 100%;
                    }
                }
            }
        }
    }
}
</style>
