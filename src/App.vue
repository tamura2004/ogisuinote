<template lang="pug">
v-app
  v-toolbar(app dense)
    v-toolbar-title.headline.indigo--text おぎすい予定帳
    v-spacer
    v-toolbar-items
      v-btn(flat) {{ userName }}
  v-content
    router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  private get userName(): string | undefined {
    if (this.$store.state.user !== null) {
      return this.$store.state.user.displayName;
    }
  }
}
</script>

<style lang="stylus" scoped>
.subheading
  border solid 1px lightgrey
  height 48px
.b
  border solid 1px black
</style>
