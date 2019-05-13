<template lang="pug">
span
  template(v-if="overwork > 0")
    slot
  template(v-else)
    slot(name="else")
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import TimeMeasurable from '@/mixins/TimeMeasurable';

@Component
export default class OverworkOnly extends Mixins(TimeMeasurable) {
}
</script>

<style lang="stylus" scoped>
</style>
