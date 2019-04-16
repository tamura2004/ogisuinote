<template lang="pug">
  v-toolbar(app dense)
    v-toolbar-side-icon(v-on="$listeners")
    v-toolbar-title.headline.indigo--text おぎすい予定帳
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TheToolbar extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
