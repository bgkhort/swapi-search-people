<template>
  <q-page>
    <card-list
      v-model:current-page="currentPage"
      :items="peopleStore.people"
      :error="peopleStore.error"
      :is-loading="peopleStore.isLoading"
      :count="peopleStore.count"
      @get-people-by-page="peopleStore.getPeopleByPage(currentPage)"
    ></card-list>
  </q-page>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted } from "vue";
import CardList from "components/CardList.vue";
import LocalStorageManager from "src/facades/localStorageManager";
import useFiltersStore from "src/stores/filters-store";
import usePeopleStore from "src/stores/people-store";

const peopleStore = usePeopleStore();
const filterStore = useFiltersStore();

const { currentPage } = storeToRefs(peopleStore);

onMounted(async () => {
  if (peopleStore.isEmptyPeople && filterStore.isEmptyFilters) {
    await peopleStore.getPeopleByPage(currentPage.value);
  }
});

window.addEventListener("beforeunload", beforeUnloadPage);
onUnmounted(() => {
  window.removeEventListener("beforeunload", beforeUnloadPage);
});

function beforeUnloadPage() {
  LocalStorageManager.set("filterFieldFilms", filterStore.filterFieldFilms);
  LocalStorageManager.set("filterFieldPlanets", filterStore.filterFieldPlanets);
  LocalStorageManager.set("filterFieldSpecies", filterStore.filterFieldSpecies);
  LocalStorageManager.set("filterFilms", filterStore.filterFilms);
  LocalStorageManager.set("filterPlanets", filterStore.filterPlanets);
  LocalStorageManager.set("filterSpecies", filterStore.filterSpecies);

  LocalStorageManager.set("people", peopleStore.people);
  LocalStorageManager.set("count", peopleStore.count);
  LocalStorageManager.set("currentPage", currentPage.value);
}
</script>
