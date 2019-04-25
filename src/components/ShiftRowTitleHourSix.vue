<template lang="pug">
  v-flex(xs4)
    v-layout(row wrap)
      v-flex.text-xs-center(xs2 v-for="i in 6") {{ Number(start) + i }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class ShiftRowTitleShiftSixhour extends Vue {
  @Prop() start!: number;
}
</script>

<style lang="stylus" scoped>
</style>
