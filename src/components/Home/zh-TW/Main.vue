<template>
    <div>
        <Board></Board>
        <Introduction></Introduction>
        <Feature></Feature>
        <Events></Events>
        <Memories></Memories>
        <Cooperation></Cooperation>
    </div>
</template>
<script>
import Board from './Board';
import Introduction from './Introduction';
import Schedule from './Schedule';
import Timeline from './Timeline';
import Events from './Events';
import Products from './Products';
import Memories from './Memories';
import Feature from './Feature';
import Cooperation from './Cooperation';

export default {
    components: {
        Board,
        Introduction,
        Schedule,
        Timeline,
        Events,
        Products,
        Memories,
        Feature,
        Cooperation,
    },
};
</script>

<style>
section {
    margin-bottom: 0;
}

@media (max-width: 575.98px) {
    .md-layout {
        display: grid;
    }
}
</style>
