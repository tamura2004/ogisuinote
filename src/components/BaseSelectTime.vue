<template lang="pug">
  base-select(
    :items="times"
    :value="value"
    :disabled="disabled"
    v-on="$listeners"
  )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TIMES } from '@/models/Times';

@Component
export default class BaseSelectTime extends Vue {
  @Prop() private value!: number | null;
  @Prop() private disabled!: boolean;

  private times = TIMES;
}
</script>

<style lang="stylus" scoped>
</style>
