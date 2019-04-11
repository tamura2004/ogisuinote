<template lang="pug">
  base-select(
    :items="times"
    :value="value"
    :disabled="disabled"
    @input="$emit('input', $event)"
  )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseSelect from '@/components/BaseSelect.vue';

@Component({
  components: {
    BaseSelect,
  },
})
export default class TaskTimeSelect extends Vue {
  @Prop() private value!: number | null;
  @Prop() private disabled!: boolean;

  private get times(): number[] {
    const ret = [];
    for (let i = 0; i < 10; i++) {
      ret.push((i + 1) / 2);
    }
    return ret;
  }
}
</script>

<style lang="stylus" scoped>
</style>
