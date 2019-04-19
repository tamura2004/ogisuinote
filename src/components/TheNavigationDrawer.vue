<template lang="pug">
  v-navigation-drawer(app fixed v-model="drawer")
    the-navigation-drawer-toolbar
    the-navigation-drawer-list(@logout="drawer=false")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { SET_USER } from '@/types/MutationTypes';

@Component
export default class TheNavigationDrawer extends Vue {
  @Prop() private value!: boolean;

  private get drawer() {
    return this.value;
  }

  private set drawer(value) {
    this.$emit('input', value);
  }
}
</script>

<style lang="stylus" scoped>
</style>
