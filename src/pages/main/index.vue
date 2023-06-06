<template>
  <div>
    <cascade-dropdown v-model="selected"></cascade-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import CascadeDropdown, { type Category } from '@/components/elements/cascade-dropdown.vue';

  const selected = ref<(Category | null)[]>([null, null, null, null, null]);
</script>

<style lang="scss" scoped></style>