<template lang="pug">
  v-layout(row align-center)
    v-flex(xs3): slot(name="name")
    v-flex(xs8): slot(name="shift")
    v-flex(xs1): slot(name="permit")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ShiftRowLayout extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
