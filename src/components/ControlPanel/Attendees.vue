<template>
    <div id="gc-attended">
        <h3>My Attended Events</h3>
        <md-progress v-if="loading" :md-indeterminate="true"></md-progress>
        <button v-if="error && !loading" v-on:click="loadAttendees">Try Again</button>
        <table v-if="!loading && !error && attendees && attendees.length" class="gc-attended-table">
            <tr v-for="atendee in attendees" :key="atendee._id">
                <td>
                    <strong>{{atendee.event.name}}</strong>
                    <span v-if="attendees.meta && atendees.meta.session">{{resolveSessionName(attendee)}}</span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>

export default {
    data() {
        return {
            attendees: null,
            error: false,
            loading: true,
        };
    },
    methods: {
        loadAttendees() {
            const userId = localStorage.getItem('_id');
            this.loading = true;
            this.api.events.getAttendees({ params: { userId } }).then((attendees) => {
                this.error = false;
                this.loading = false;
                this.attendees = attendees;
            }, () => {
                this.error = true;
                this.loading = false;
            });
        },
        resolveSessionName(attendee) {
            const key = attendee.meta.session;
            const session = attendee.events.sessions.filter(s => s.key === key);
            if (session && session.length) {
                return session[0].name;
            }
            return '';
        },
    },
    mounted() {
        this.loadAttendees();
    },

};
</script>

<style lang="scss" scoped>
#gc-attended {
    margin-bottom: 1rem;

    .gc-attended-table {
        border: 1px solid #666;
        border-collapse: collapse;

        tr:nth-child(even) {
            background: #fff;
        }

        tr, td {
            border: 1px solid #666;
            padding: 0.5rem 0.3rem;

            &:hover {
                background-color: #a3e9c7;
            }
        }
    }
}
</style>
