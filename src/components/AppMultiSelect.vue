<template>
  <q-select
    :model-value="modelValue"
    filled
    multiple
    :options="options"
    :label="label"
    style="width: 250px"
    use-chips
    color="blue-grey-10"
    :disable="disable"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup>
defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  disable: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
defineEmits(["update:modelValue"]);
</script>
