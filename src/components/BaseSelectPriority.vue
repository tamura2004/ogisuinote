<template lang="pug">
  base-select(
    :items="priorities"
    :value="value"
    v-on="$listeners"
  )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BaseSelectPriority extends Vue {
  @Prop() private value!: string;
  private priorities = ['低', '中', '高'];
}
</script>

<style lang="stylus" scoped>
</style>
