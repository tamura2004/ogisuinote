<template lang="pug">
  user-task-rows(:userId="userId")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class UserTasks extends Vue {
  @Prop() private userId!: string;
}
</script>

<style lang="stylus" scoped>
.subheading
  border solid 1px lightgrey
  height 48px
.b
  border solid 1px black
</style>
