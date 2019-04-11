<template lang="pug">
  base-select(
    :items="priorities"
    :value="value"
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
export default class TaskPrioritySelect extends Vue {
  @Prop() private value!: string;
  private priorities = ['低', '中', '高'];
}
</script>

<style lang="stylus" scoped>
</style>
