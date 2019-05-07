<template lang="pug">
shift-row-layout
  template(v-slot:name): base-row-cell-body {{ userName }}
  template(v-slot:successor): base-row-cell-body {{ successorName }}
  template(v-slot:shift)
    base-row-cell-body
      svg(
        width="100%"
        height="100%"
        viewBox="270 0 1080 10"
        preserveAspectRatio="none"
      )
        g(fill="none" stroke="grey" stroke-width="1" stroke-dasharray="1 1")
          line(
            v-for="i in 18"
            :x1="240 + i * 60"
            y1="0"
            :x2="240 + i * 60"
            y2="10"
        )
        g(fill="none" stroke="green" stroke-width="3")
          line(
            :x1="startTimeByMinute"
            y1="5"
            :x2="onTimeByMinute"
            y2="5"
        )
        g(fill="none" stroke="red" stroke-width="3")
          line(
            :x1="onTimeByMinute"
            y1="5"
            :x2="lastTimeByMinute"
            y2="5"
        )
  template(v-slot:permit)
    shift-allow-btn(v-if="shift && isManager" :userId="userId" :date="date")
    base-row-cell-no-data(v-else)
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import TimeMeasurable from '@/mixins/TimeMeasurable';

@Component
export default class ShiftRowBody extends Mixins(TimeMeasurable) {
  private get isManager() {
    return this.$store.getters.currentUser && this.$store.getters.currentUser.manager;
  }
}

</script>

<style lang="stylus" scoped>
</style>
