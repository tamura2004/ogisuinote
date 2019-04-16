<template lang="pug">
  v-container(fluid)
    v-layout(align-center justify-center fill-height)
      v-progress-circular.mt-5(:size="100" color="primary" indeterminate)
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BaseProgressCircler extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
