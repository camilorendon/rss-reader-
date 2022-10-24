<script setup>
import {useFeedStore} from '../stores/store';

const store = useFeedStore();

function handleClick(source){
    store.loadSource(source);
}
</script>
  

<template>
    <div class="sidebar">
        <div v-for="(source, index) in store.source" :key="index">
            <a href="#" @click="()=> handleClick(source)"> {{source.name}} </a>
        </div>
    </div>

</template>
<style scoped>

</style>
