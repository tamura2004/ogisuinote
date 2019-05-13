<template lang="pug">
span
  template(v-if="overworkId")
    slot
  template(v-else)
    slot(name="else")
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import TimeMeasurable from '@/mixins/TimeMeasurable';
import store from '../store';

@Component
export default class OverworkAllowedOnly extends Mixins(TimeMeasurable) {
}
</script>

<style lang="stylus" scoped>
</style>
