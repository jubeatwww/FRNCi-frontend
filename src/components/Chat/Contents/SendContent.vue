<template>
    <section>
        <template v-if="content !== ''">
            <header>
                <div class="chat-content-avatar">
                    <md-avatar class="md-avatar-icon" md-menu-trigger>
                        <img :src="otherUser.photo" alt="Avatar">
                    </md-avatar>
                </div>
                <div class="chat-content-info">
                    <div>{{otherUser.firstName}}</div>
                    <div>from {{otherUser.nationality}}</div>
                </div>
            </header>
            <article>
                <li>
                    <div>
                        {{ otherUser.firstName }}
                    </div>
                    <div>
                        {{ content }}
                    </div>
                </li>
            </article>
            <footer>
                <textarea name="message" rows="3"></textarea>
                <button>Send</button>
            </footer>
        </template>
    </section>
</template>

<script>
import { send } from '../../../utils/mixins/ChatContent';

export default {
    mixins: [send],
};
</script>

<style lang="scss" scoped>
section {
    width: 66%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 15px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 1px solid rgba(112, 112, 112, .4);
    header {
        display: flex;
        padding: 20px;
        border-bottom: 1px solid rgba(112, 112, 112, .4);

        .chat-content-avatar {
            width: 16.666667%;
            .md-avatar {
                height: 80px;
                width: 80px;
                margin: 0;
            }
        }

        .chat-content-info {
            width: 83.333333%;
            text-align: left;
            padding: 0 15px;
        }
    }
    article {
        height: 60%;
        list-style: none;
        display: flex;
        flex-direction: column-reverse;
        overflow: scroll;

        li {
            width: 66%;
        }

        .first-msg {
            order: 2;
        }

        .show-hello {
            order: 1;
        }

        .hide-hello {
            display: none;
        }
    }

    footer {
        padding: 1.5rem;
        textarea {
            width: 100%;
            padding: 10px 20px;
            margin-bottom: 10px;
            border-radius: 5px;
            resize: none;
            border: 1px solid rgba(112, 112, 112, .4);

        }

        button {
            border: 2px solid #f8b62c;
            background-color: #f8b62c;
            padding: 4px 20px;
            color: #fff !important;
            letter-spacing: 1px;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            float: right;
        }
    }

}
</style>
