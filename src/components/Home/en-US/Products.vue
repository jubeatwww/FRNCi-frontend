<template>
    <section>
        <md-layout md-align="center" md-column>
            <md-layout class="gc-products-title" md-align="center" md-column>
                <h3>Limited Special Offer!</h3>
                <h5>Along with the ticket, you’ll get early access to Glocal Click platform</h5>
            </md-layout>
            <md-layout class="gc-products-market" md-align="center">
                <ul>
                    <li>An e-book on language exchange strategies</li>
                    <li>An additional 100 Glocal Click Points (250 if you sign up for both events) </li>
                </ul>
            </md-layout>
            <md-layout md-align="center">
                <small>* Glocal Click Points can be used for matching language buddy online or joining other future offline events.</small>
            </md-layout>
        </md-layout>
    </section>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
section {
    color: #404645;
    padding-bottom: 5%;
    background-color: #60bc90;

    .gc-products-title {
        h3 {
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            color: #343d3c;
            font-size: 1.7rem;
            font-weight: 600;
            line-height: 1.2;
        }

        h5 {
            margin: 0;
            margin-bottom: 1rem;
            font-family: inherit;
            font-size: 1rem;
            font-weight: 500;
            line-height: 1.2;
        }
    }

    .gc-products-market {
        margin-top: 1rem;
        margin-bottom: 1.5rem;

        ul {
            margin: 0;
            margin-bottom: 1rem;
                line-height: 1;

            li {
                text-align: left;
                font-size: 1rem;
            }
        }
    }

    small {
        font-size: 0.9rem;
    }
}

@media (max-width: 575.98px) {
    section {
        small {
            margin: 0 1rem;
        }
    }
}
</style>
