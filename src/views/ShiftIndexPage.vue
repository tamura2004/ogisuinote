<template lang="pug">
div
  .headline.mt-3 シフト勤務一覧
  shift-row-title
  shift-row-body(
    v-for="userId in userIds"
    :userId="userId"
    :key="userId"
  )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ShiftIndexPage extends Vue {
  private get userIds() {
    return this.$store.getters.userIds;
  }
}
</script>

<style lang="stylus" scoped>
</style>
