<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      color="blue-grey-10"
      :model-value="props.currentPage"
      :max="maxPages"
      :max-pages="6"
      :boundary-numbers="false"
      @update:model-value="updatePage"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});
const emits = defineEmits(["updateCurrentPage", "getPeopleByPage"]);

const maxPages = computed(() => Math.ceil(props.count / 10));

function updatePage(event) {
  emits("updateCurrentPage", event);
  emits("getPeopleByPage");
}
</script>
