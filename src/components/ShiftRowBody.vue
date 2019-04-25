<template lang="pug">
shift-row-layout
  template(v-slot:name): base-row-cell-body ユーザー名
  template(v-slot:shift): base-row-cell-body 勤務時間帯
  template(v-slot:permit): base-row-cell-body 承認
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ShiftRowBody extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
