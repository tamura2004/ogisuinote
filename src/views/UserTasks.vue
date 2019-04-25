<template lang="pug">
  task-layout(:userId="userId")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class UserTasks extends Vue {
  @Prop() private userId!: string;
}
</script>

<style lang="stylus" scoped>
</style>
