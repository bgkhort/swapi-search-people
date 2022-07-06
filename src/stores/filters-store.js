import { defineStore } from "pinia";
import LocalStorageManager from "src/facades/localStorageManager";
import filterService from "src/services/filterService";

const useFiltersStore = defineStore("filters", {
  state: () => ({
    filterFilms: LocalStorageManager.get("filterFilms") || [],
    filterPlanets: LocalStorageManager.get("filterPlanets") || [],
    filterSpecies: LocalStorageManager.get("filterSpecies") || [],
    filterFieldFilms: LocalStorageManager.get("filterFieldFilms") || [],
    filterFieldFilmTitles: [],
    filterFieldPlanets: LocalStorageManager.get("filterFieldPlanets") || [],
    filterFieldPlanetTitles: [],
    filterFieldSpecies: LocalStorageManager.get("filterFieldSpecies") || [],
    filterFieldSpecieTitles: [],
    isLoading: false,
    error: false,
  }),
  getters: {
    filters() {
      return {
        films: [...this.filterFilms],
        planets: [...this.filterPlanets],
        species: [...this.filterSpecies],
      };
    },

    filterFields() {
      return {
        films: [...this.filterFieldFilms],
        planets: [...this.filterFieldPlanets],
        species: [...this.filterFieldSpecies],
      };
    },

    isEmptyFilters() {
      return (
        !this.filterFilms.length &&
        !this.filterPlanets.length &&
        !this.filterSpecies.length
      );
    },

    isEmptyFilterFields() {
      return (
        !this.filterFieldFilms.length &&
        !this.filterFieldPlanets.length &&
        !this.filterFieldSpecies.length
      );
    },

    isEmptyFilterFieldTitles() {
      return (
        !this.filterFieldFilmTitles.length &&
        !this.filterFieldPlanetTitles.length &&
        !this.filterFieldSpecieTitles.length
      );
    },
  },
  actions: {
    setFilterFieldTitles(filterTitle) {
      const fieldName = `filterField${
        filterTitle.charAt(0).toUpperCase() + filterTitle.slice(1)
      }`;

      const fieldTitleName = `filterField${
        filterTitle.charAt(0).toUpperCase() + filterTitle.slice(1, -1)
      }Titles`;

      this[fieldTitleName] = this[fieldName].reduce((arr, item) => {
        arr.push(item.title);
        return arr;
      }, []);
    },

    async getFilterField(filterTitle) {
      this.error = "";
      this.isLoading = true;
      try {
        const fieldName = `filterField${
          filterTitle.charAt(0).toUpperCase() + filterTitle.slice(1)
        }`;
        this[fieldName] = await filterService.getFilterFields(filterTitle);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    setFilteredFilterField() {
      this.error = "";
      this.isLoading = true;
      try {
        const filterFields = filterService.getFilteredFilterFields(
          this.filters,
          this.filterFields
        );
        this.filterFieldFilmTitles = filterFields.films;
        this.filterFieldPlanetTitles = filterFields.planets;
        this.filterFieldSpecieTitles = filterFields.species;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export default useFiltersStore;
