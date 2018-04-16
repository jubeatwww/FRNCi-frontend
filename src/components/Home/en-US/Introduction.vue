<template>
    <section>
        <md-layout md-align="center">
            <md-layout md-column md-align="center" class="gc-introduction-title">
            <h3>What is Glocal Click?</h3>
                <p>
                    Glocal Click is Taiwan’s newest international language exchange platform that puts the emphasis on in-person connections.
                </p>
                <p>
                     Think of it less as a language exchange and more as making new local friends! We believe there is no better way to learn a language than while having real conversations with your friend.
                </p>
            </md-layout>
        </md-layout>
    </section>
</template>

<script>
export default {
    data() {
        return {
        };
    },
};
</script>

<style lang="scss" scoped>
section {
    padding: 55px 0;
    background-color: #f8b62c;
    color: white;

    .gc-introduction-title {
        h3 {
            font-size: 1.8rem;
            margin: 0;
            margin-bottom: 1rem;
        }

        p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin: 0 10%;
        }
    }
}

@media (max-width: 575.98px) {
    section {
        .gc-introduction-title {
            margin: 0 1rem 1rem;
        }
    }
}
</style>
