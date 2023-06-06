<template>
  <div
    class="dropdown"
    :class="{
      'always-open' :alwaysOpen
    }"
  >
    <vue-multiselect
      ref="selectRef"
      v-model="selected"
      :options="options"
      :select-label="''"
      :selected-label="''"
      :deselect-label="''"
      :disabled="isDisabled"
      @select="emit('select', $event)"
    >
      <template #singleLabel="slotProps">
        <slot
          name="singleLabel"
          v-bind="slotProps"
        >
        </slot>
      </template>

      <template #option="slotProps">
        <slot
          name="option"
          v-bind="slotProps"
        ></slot>
      </template>
    </vue-multiselect>
  </div>
</template>

<script setup lang="ts">
  import VueMultiselect from 'vue-multiselect';
  import { computed, onMounted, ref } from 'vue';

  type DropdownOptionObject = {
    $isDisabled?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };

  type DropdownOption = string | number | DropdownOptionObject;

  const props = defineProps<{
    modelValue: DropdownOption | null;
    options: (DropdownOption)[];
    alwaysOpen: boolean;
    isDisabled: boolean;
  }>();

  const emit = defineEmits(['update:modelValue', 'select']);

  const selected = computed({
    get() {
      return props.modelValue;
    },

    set(newSelected) {
      emit('update:modelValue', newSelected);
    },
  });

  const selectRef = ref<InstanceType<typeof VueMultiselect>>();

  onMounted(() => {
    if (selectRef.value && props.alwaysOpen) {
      selectRef.value.activate();
    }
  });
</script>

<style lang="scss" scoped>
  .dropdown {
    &.always-open {
      :deep() .multiselect {
        &__select {
          display: none;
        }

        &__content-wrapper {
          display: block !important;
          height: auto !important;
          max-height: 300px !important;
          position: static;
          transition: none !important;
          opacity: 1 !important;
          visibility: visible !important;
        }
      }
    }
  }
</style>