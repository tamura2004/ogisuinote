<template lang="pug">
  v-list-tile(@click="click" :to="menu.path")
    v-list-tile-action
      v-icon {{ menu.icon }}
    v-list-tile-title {{ menu.label }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Menu } from '@/models/Menues';

@Component
export default class BaseMenuTile extends Vue {
  @Prop() private menu!: Menu;

  private click() {
    if (this.menu.logout) {
      this.$emit('logout');
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
