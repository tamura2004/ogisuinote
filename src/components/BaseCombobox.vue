<template lang="pug">
  v-combobox.b.ma-1(
    solo
    flat
    hide-details
    :items="items"
    :value="value"
    :disabled="disabled"
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
}
</script>

<style lang="stylus" scoped>
.b
  border solid 1px grey
</style>
