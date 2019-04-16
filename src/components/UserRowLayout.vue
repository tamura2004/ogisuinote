<template lang="pug">
  v-layout(row align-center)
    v-flex(xs6): slot(name="name")
    v-flex(xs2): slot(name="plan")
    v-flex(xs2): slot(name="actual")
    v-flex(xs2): slot(name="memo")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UserRowLayout extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
