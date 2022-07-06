import { defineStore } from "pinia";
import LocalStorageManager from "src/facades/localStorageManager";
import peopleService from "src/services/peopleService";
import useFiltersStore from "src/stores/filters-store";

const usePeopleStore = defineStore("people", {
  state: () => ({
    people: LocalStorageManager.get("people") || [],
    count: LocalStorageManager.get("count") || 0,
    currentPage: LocalStorageManager.get("currentPage") || 1,
    isLoading: false,
    error: "",
  }),
  getters: {
    isEmptyPeople() {
      return !this.people.length;
    },
  },
  actions: {
    setCurrentPage(page) {
      this.currentPage = page;
    },

    async getPeopleByFilters() {
      this.count = 0;
      this.error = "";
      this.isLoading = true;
      try {
        const filtersStore = useFiltersStore();
        this.people = await peopleService.getPeopleByFilters(
          filtersStore.filters,
          filtersStore.filterFields
        );
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async getPeopleByPage(page) {
      this.count = 0;
      this.error = "";
      this.isLoading = true;
      try {
        const data = await peopleService.getPeopleByPage(page);
        this.people = data.results;
        this.count = data.count;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export default usePeopleStore;
