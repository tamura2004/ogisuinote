<template lang="pug">
shift-row-layout
  template(v-slot:name): base-row-cell-title ユーザー名
  template(v-slot:shift): base-row-cell-title 勤務時間帯
  template(v-slot:permit): base-row-cell-title 承認
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ShiftTitleRow extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
