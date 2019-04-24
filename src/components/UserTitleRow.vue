<template lang="pug">
user-row-layout
  template(v-slot:name): task-title-cell ユーザー名
  template(v-slot:plan): task-title-cell 合計時間
  template(v-slot:lasttime): task-title-cell 終了時間
  template(v-slot:overwork): task-title-cell 残業時間
  template(v-slot:permit): task-title-cell 承認
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UserTitleRow extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
