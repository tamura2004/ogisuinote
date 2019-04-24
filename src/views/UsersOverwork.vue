<template lang="pug">
div
  user-title-row
  user-body-row(
    v-for="userId in userIds"
    :userId="userId"
    :key="userId"
  )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UsersOverwork extends Vue {
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
