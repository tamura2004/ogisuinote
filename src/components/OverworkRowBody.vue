<template lang="pug">
overwork-row-layout
  template(v-slot:name): base-row-cell-body
    router-link(:to="`/app/user/${userId}/tasks`") {{ userName }}
  template(v-slot:plan): base-row-cell-body {{ plan | toTime }}
  template(v-slot:starttime): base-row-cell-body {{ startTime }}
  template(v-slot:lasttime): base-row-cell-body {{ lasttime }}
  template(v-slot:overwork): base-row-cell-body {{ overwork | toTime }}
  template(v-slot:permit): base-row-cell-body
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import TimeMeasurable from '@/mixins/TimeMeasurable';

@Component
export default class OverworkBodyRow extends Mixins(TimeMeasurable) {
}
</script>

<style lang="stylus" scoped>
</style>
