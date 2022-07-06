<template>
  <app-spinner v-if="isLoading"></app-spinner>

  <app-error-message v-else-if="error">{{ error }}</app-error-message>

  <template v-else-if="items.length && !isLoading">
    <div
      class="q-pa-sm q-ma-sm row items-center q-gutter-lg wrap justify-center"
    >
      <card-list-item
        v-for="item in items"
        :key="item.name"
        :name="item.name"
        :height="item.height"
        :mass="item.mass"
        :hair-color="item.hair_color"
        :skin-color="item.skin_color"
        :eye-color="item.eye_color"
        :birth-year="item.birth_year"
        :gender="item.gender"
      ></card-list-item>
    </div>
    <card-list-pagination
      v-if="count"
      :current-page="currentPage"
      :count="count"
      @get-people-by-page="$emit('getPeopleByPage')"
      @update-current-page="$emit('update:currentPage', $event)"
    ></card-list-pagination>
  </template>

  <div v-else class="column justify-center items-center window-height">
    <span class="text-green text-bold text-h5">Empty</span>
  </div>
</template>

<script setup>
import AppSpinner from "components/AppSpinner.vue";
import AppErrorMessage from "components/AppErrorMessage.vue";
import CardListItem from "components/CardListItem.vue";
import CardListPagination from "components/CardListPagination.vue";

defineProps({
  items: {
    type: Array,
    required: true,
  },
  error: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});
defineEmits(["getPeopleByPage", "update:currentPage"]);
</script>
