<template lang="pug">
  v-select.b.ma-1(
    solo
    flat
    hide-details
    height="32px"
    :items="items"
    :value="value"
    :disabled="disabled"
    @input="$emit('input', $event)"
    @change="$emit('change')"
  )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BaseSelect extends Vue {
  @Prop() private value!: any;
  @Prop() private items!: number[];
  @Prop() private disabled!: boolean;
}
</script>

<style lang="stylus" scoped>
.b
  border solid 1px #0ff
</style>
