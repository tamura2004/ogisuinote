<template lang="pug">
shift-row-layout
  template(v-slot:name): base-row-cell-title シフト勤務
  template(v-slot:successor): base-row-cell-title 引継者
  template(v-slot:shift): shift-row-title-hour
  template(v-slot:permit): base-row-cell-title 承認
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class ShiftRowTitle extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
