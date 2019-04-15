<template lang="pug">
  v-navigation-drawer(app fixed v-model="drawer")
    base-navigation-drawer-toolbar
    base-navigation-drawer-list(@logout="drawer=false")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { SET_USER } from '@/types/MutationTypes';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component
export default class BaseNavigationDrawer extends Vue {
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
