<template lang="pug">
div
  user-title-row
  user-body-row(
    v-for="user in users"
    :userId="user"
    :key="user"
  )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UserIndex extends Vue {
  private get date() {
    return this.$store.getters.date;
  }

  private get users() {
    return this.$store.getters.users;
  }
}
</script>

<style lang="stylus" scoped>
</style>
