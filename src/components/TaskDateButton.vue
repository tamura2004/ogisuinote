<template lang="pug">
v-btn(small dark outline color="indigo" @click="$emit('click')")
  slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TaskDateButton extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
