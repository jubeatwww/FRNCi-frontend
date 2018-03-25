<template>
        <nav>
            <div class="mask">
                <figure><img :src="photo"/></figure>
                <section>
                    <p class="profile-name">{{firstName}}</p>
                    <p class="profile-name">{{lastName}}</p>
                    <p><span class="fa fa-leaf"></span>{{genderStr[gender]}}</p>
                    <p><span class="fa fa fa-map-marker"></span>{{localCity}}</p>
                    <p><span class="fa fa-globe"></span>{{nationality}}</p>
                    <p><span class="fa fa-bullhorn"></span>{{meetPreference}}</p>
                </section>
                <div class="links">
                    <button>Edit Profile</button>
                    <button>Get Verified</button>
                </div>
            </div>
        </nav>
</template>

<script>
export default {
    props: {
        bg: {
            type: String,
            default: '',
        },
        photo: {
            type: String,
            default: 'static/img/logo_frnci.png',
        },
        firstName: {
            type: String,
            default: 'FRNCi',
        },
        lastName: {
            type: String,
            default: 'FRNCi',
        },
        gender: {
            type: String,
            default: '',
        },
        nationality: {
            type: String,
            default: '',
        },
        localCity: {
            type: String,
            default: '',
        },
        meet: {
            type: String,
            default: 'language',
        },
        interact: {
            type: String,
            default: 'f2f',
        },
    },
    data() {
        return {
            interactStr: {
                f2f: 'Face to face',
                online: 'Only online chat',
            },
            meetStr: {
                language: 'Looking for Language Patrners',
                cultural: 'Looking for Cultural Friends',
            },
            genderStr: {
                m: 'Male',
                f: 'Female',
            },
        };
    },
    computed: {
        meetPreference() {
            return `${this.meetStr[this.meet]} / ${this.interactStr[this.interact]}`;
        },
    },
};
</script>

<style lang="scss" scoped>

nav {
    background-image: url(../../assets/bg-default.jpg);
    background-size: cover;
    background-attachment: fixed;
    .mask {
        display: flex;
        justify-content: center;
        background: rgba(0,0,0,0.4);
        padding-top: 5%;
    }

    figure {
        position: relative;
        float: left;
        border: 3px solid gray;
        border-radius: 150%;
        overflow: hidden;
        margin: 0;
        height: 240px;
        width: 240px;
        background-color: white;
        padding: 0 15px;
        border: 3px solid white;
        border-radius: 150%;
        overflow: hidden;

        img {
            position: absolute;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    section {
        display: flex;
        width: 40%;
        flex-direction: column;
        font-size: 1rem;
        font-weight: bold;
        line-height: 1.5;
        color: white;
        text-align: left;
        padding: 0 15px;
        letter-spacing: 2px;
        p {
            margin-top: 0;
            margin-bottom: 1rem;
        }

        .profile-name {
            font-size: 45px;
            letter-spacing: 5px;
            text-transform: uppercase;
            font-weight: bold;
        }
    }

    .links {
        padding: 0 15px;
    }
}
</style>
