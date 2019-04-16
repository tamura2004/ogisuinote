<template lang="pug">
div
  user-task-rows(:userId="userId" v-for="userId in users" :key="userId")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UsersTasks extends Vue {
  private get users() {
    return this.$store.getters.users;
  }
}
</script>

<style lang="stylus" scoped>
</style>
