<template>
    <div>
        <Board></Board>
        <Introduction></Introduction>
        <Schedule></Schedule>
        <Memories></Memories>
        <Feature></Feature>
        <Cooperation></Cooperation>
    </div>
</template>
<script>
import Board from './Board';
import Introduction from './Introduction';
import Schedule from './Schedule';
import Memories from './Memories';
import Feature from './Feature';
import Cooperation from './Cooperation';

export default {
    components: {
        Board,
        Introduction,
        Schedule,
        Memories,
        Feature,
        Cooperation,
    },
};
</script>

<style>

</style>