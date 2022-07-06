import apiInstance from "src/api";
import UrlService from "src/services/urlService";

class FilterService {
  #apiInstance;

  constructor(apiInstance) {
    this.#apiInstance = apiInstance;
  }

  #chooseFieldName(filterField) {
    switch (filterField) {
      case "films":
        return "characters";
      case "planets":
        return "residents";
      case "species":
        return "people";
      default:
        break;
    }
  }

  #formatFiltersField(filters, filterTitle) {
    return filters.flat(1).reduce((arr, item) => {
      item.title
        ? arr.push({
            title: item.title,
            items: item[this.#chooseFieldName(filterTitle)],
          })
        : arr.push({
            title: item.name,
            items: item[this.#chooseFieldName(filterTitle)],
          });
      return arr;
    }, []);
  }

  getFilteredFilterFields(filters, filterFields) {
    try {
      const arrayFilteredFilterFields = {
        films: [],
        planets: [],
        species: [],
      };
      const peopleURLs = UrlService.getURLsByFilter(filters, filterFields);
      const filteringURLs = UrlService.getFilteredURLs(peopleURLs);

      for (let title in filterFields) {
        filterFields[title].forEach((item) => {
          if (item.items.length) {
            item.items.forEach((url) => {
              if (
                filteringURLs.includes(url) &&
                !arrayFilteredFilterFields[title].includes(item.title)
              ) {
                arrayFilteredFilterFields[title].push(item.title);
              }
            });
          }
        });
      }

      return arrayFilteredFilterFields;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getFilterFields(filterTitle) {
    const filterArray = [];
    try {
      const response = await this.#apiInstance.get(
        `/${filterTitle}/?page=${1}`
      );
      filterArray.push(response.data.results);
      if (response.data.count > 10) {
        const pages = [];
        for (let i = 2; i <= Math.ceil(response.data.count / 10); i++) {
          pages.push(i);
        }
        const result = await Promise.all(
          pages.map(async (page) => {
            const response = await this.#apiInstance.get(
              `/${filterTitle}/?page=${page}`
            );
            return response.data.results;
          })
        );
        filterArray.push(...result);
      }
    } catch (error) {
      throw new Error(error.message);
    }
    return this.#formatFiltersField(filterArray, filterTitle);
  }
}

export default new FilterService(apiInstance);
