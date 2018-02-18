<template>
    <md-layout md-align="center" md-column-small>
        <md-layout md-flex="25">
            <aside>
                <router-link to="/controlpanel/account">My Account</router-link>
                <router-link to="/controlpanel/profile">My Profile</router-link>
            </aside>
        </md-layout>
        <md-layout md-flex="66" md-align="center">
            <router-view></router-view>
        </md-layout>
    </md-layout>
</template>

<script>

export default {
};
</script>

<style lang="scss">
aside {
    display: flex;
    flex-direction: column;
}
</style>