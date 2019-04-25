<template lang="pug">
task-row-layout
  template(v-slot:priority): base-row-cell-title 優先度
  template(v-slot:name): base-row-cell-title 作業内容
  template(v-slot:plan): base-row-cell-title 見込時間
  template(v-slot:actual): base-row-cell-title 実績時間
  template(v-slot:memo): base-row-cell-title コメント
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TaskRowTitle extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
