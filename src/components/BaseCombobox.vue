<template lang="pug">
  v-combobox.ma-1(
    solo
    hide-details
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
</style>
