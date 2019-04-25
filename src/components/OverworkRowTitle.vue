<template lang="pug">
overwork-row-layout
  template(v-slot:name): base-row-cell-title ユーザー名
  template(v-slot:plan): base-row-cell-title 予定作業
  template(v-slot:starttime): base-row-cell-title 始業時刻
  template(v-slot:lasttime): base-row-cell-title 終業時刻
  template(v-slot:overwork): base-row-cell-title 残業時間
  template(v-slot:permit): base-row-cell-title 承認
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class OverworkTitleRow extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
