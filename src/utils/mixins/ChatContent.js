import api from '../../actions/api/index';

export const accept = {
    data() {
        return {
            messages: [],
            otherUser: {},
        };
    },
    async created() {
        if (this.$route.params.userId) {
            const apiArgs = {
                params: { userId: this.$route.params.userId },
            };
            const res = await api.messages.get(apiArgs);
            if (res.ok) {
                this.messages = res.messages;
                this.otherUser = res.otherUser;
            }
        }
    },
};

export const send = {
    data() {
        return {
            content: '',
            otherUser: {},
        };
    },
    async created() {
        if (this.$route.params.userId) {
            const apiArgs = {
                params: { userId: this.$route.params.userId },
            };
            const res = await api.invitations.get(apiArgs);
            if (res.ok) {
                this.content = res.content;
                this.otherUser = res.to;
            }
        }
    },
};

export const recv = {
    data() {
        return {
            content: '',
            otherUser: {},
        };
    },
    async created() {
        if (this.$route.params.userId) {
            const apiArgs = {
                params: { userId: this.$route.params.userId },
            };
            const res = await api.invitations.get(apiArgs);
            if (res.ok) {
                this.content = res.content;
                this.otherUser = res.from;
            }
        }
    },
};

