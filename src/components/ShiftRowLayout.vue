<template lang="pug">
  v-layout(row align-center)
    v-flex(xs2): slot(name="name")
    v-flex(xs2): slot(name="successor")
    v-flex(xs7): slot(name="shift")
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
