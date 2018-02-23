<template>
    <div>
        <Board></Board>
        <Introduction></Introduction>
        <Schedule></Schedule>
        <Timeline></Timeline>
        <Events></Events>
        <Products></Products>
        <Memories></Memories>
        <Feature></Feature>
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

</style>