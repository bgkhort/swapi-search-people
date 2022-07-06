<template>
  <q-drawer
    :model-value="modelValue"
    side="left"
    bordered
    class="q-pa-sm"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <app-error-message v-if="filterStore.error">{{
      filterStore.error
    }}</app-error-message>

    <div v-else class="q-gutter-sm justify-center row">
      <div class="text-h5">Filters</div>
      <app-multi-select
        v-model="filterFilms"
        :options="filterStore.filterFieldFilmTitles"
        :disable="peopleStore.isLoading || filterStore.isLoading"
        label="Films"
      ></app-multi-select>
      <app-multi-select
        v-model="filterPlanets"
        :options="filterStore.filterFieldPlanetTitles"
        :disable="peopleStore.isLoading || filterStore.isLoading"
        label="Planets"
      ></app-multi-select>
      <app-multi-select
        v-model="filterSpecies"
        :options="filterStore.filterFieldSpecieTitles"
        :disable="peopleStore.isLoading || filterStore.isLoading"
        label="Species"
      ></app-multi-select>
    </div>
  </q-drawer>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, watch, computed } from "vue";
import AppErrorMessage from "components/AppErrorMessage.vue";
import AppMultiSelect from "components/AppMultiSelect.vue";
import useFilterStore from "src/stores/filters-store";
import usePeopleStore from "src/stores/people-store";

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
defineEmits(["update:modelValue"]);

const filterStore = useFilterStore();
const peopleStore = usePeopleStore();

const { filterFilms, filterPlanets, filterSpecies } = storeToRefs(filterStore);

const isEmptyPeopleWithFilters = computed(() => {
  return peopleStore.isEmptyPeople && !filterStore.isEmptyFilters;
});

watch(
  [filterFilms, filterPlanets, filterSpecies],
  async ([newFilterFilms, newFilterPlanets, newFilterSpecies]) => {
    if (filterStore.isEmptyFilters && peopleStore.isEmptyPeople) {
      peopleStore.setCurrentPage(1);
      await peopleStore.getPeopleByPage(peopleStore.currentPage);
    } else {
      await peopleStore.getPeopleByFilters();
      filterStore.setFilteredFilterField();
    }
    if (
      !newFilterFilms.length &&
      !newFilterPlanets.length &&
      !newFilterSpecies.length
    ) {
      setFilterFieldTitle();
      peopleStore.setCurrentPage(1);
      await peopleStore.getPeopleByPage(peopleStore.currentPage);
    }
  },
  { deep: true }
);

onMounted(async () => {
  if (isEmptyPeopleWithFilters.value) {
    await peopleStore.getPeopleByFilters();
  }
  if (filterStore.isEmptyFilterFields) {
    await getFilterField();
  }
  setFilterFieldTitle();
});

async function getFilterField() {
  await Promise.all([
    filterStore.getFilterField("films"),
    filterStore.getFilterField("planets"),
    filterStore.getFilterField("species"),
  ]);
}

function setFilterFieldTitle() {
  filterStore.setFilterFieldTitles("films");
  filterStore.setFilterFieldTitles("planets");
  filterStore.setFilterFieldTitles("species");
}
</script>
