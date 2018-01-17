<template>
    <article>
        <header>
            <h1>{{$route.name}}</h1>
        </header>
        <section>
            <terms-of-service v-if="$route.name === 'Terms of Service'"></terms-of-service>
            <privacy-policy v-else></privacy-policy>
        </section>
    </article>
</template>

<script>
import TermsOfService from './termsofservice';
import PrivacyPolicy from './privacy';

export default {
    components: { TermsOfService, PrivacyPolicy },
};
</script>

