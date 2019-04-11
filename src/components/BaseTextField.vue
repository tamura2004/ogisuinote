<template lang="pug">
  v-text-field.ma-1(
    solo
    hide-details
    :value="value"
    @input="$emit('input', $event)"
  )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BaseTextField extends Vue {
  @Prop() private value!: number | null;
  @Prop() private items!: number[];
}
</script>

<style lang="stylus" scoped>
</style>
