<template lang="pug">
  v-text-field.b.ma-1(
    solo
    flat
    hide-details
    :value="value"
    @input="$emit('input', $event)"
    @keydown.enter="$emit('done')"
    @blur="$emit('done')"
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
.b
  border solid 1px #0ff
</style>
