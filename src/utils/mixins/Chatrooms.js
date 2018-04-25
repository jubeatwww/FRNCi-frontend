import api from '../../actions/api/index';

export const accept = {
    data() {
        return {
            chatrooms: [],
        };
    },
    async created() {
        const res = await api.messages.all();
        if (res.ok) {
            this.chatrooms = res.data;
        }
    },
};

export const send = {
    data() {
        return {
            chatrooms: [],
        };
    },
    async created() {
        const res = await api.invitations.all({ query: { role: 'from' } });
        if (res.ok) {
            this.chatrooms = res.data;
        }
    },
};

export const recv = {
    data() {
        return {
            chatrooms: [],
        };
    },
    async created() {
        const res = await api.invitations.all({ query: { role: 'to' } });
        if (res.ok) {
            this.chatrooms = res.data;
        }
    },
};

