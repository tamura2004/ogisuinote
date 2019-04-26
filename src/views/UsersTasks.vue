<template lang="pug">
v-container(fluid)
  user-task-show(
    v-for="userId in userIds"
    :userId="userId"
    :date="date"
    :key="userId"
  )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UsersTasks extends Vue {
  private get date() {
    return this.$store.getters.date;
  }

  private get userIds() {
    return this.$store.getters.userIds;
  }
}
</script>

<style lang="stylus" scoped>
</style>
