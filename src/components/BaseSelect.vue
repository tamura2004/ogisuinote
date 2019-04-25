<template lang="pug">
  v-select.b.ma-1(
    solo
    flat
    hide-details
    height="32px"
    :items="items"
    :value="value"
    :disabled="disabled"
    :label="label"
    v-on="$listeners"
  )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BaseSelect extends Vue {
  @Prop() private value!: any;
  @Prop() private items!: number[];
  @Prop() private disabled!: boolean;
  @Prop() private label!: string;
}
</script>

<style lang="stylus" scoped>
.b
  border solid 1px grey
</style>
