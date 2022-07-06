import apiInstance from "src/api";
import UrlService from "src/services/urlService";

class PeopleService {
  #apiInstance;

  constructor(apiInstance) {
    this.#apiInstance = apiInstance;
  }

  async #getPeopleById(filteredURLs) {
    if (filteredURLs.length) {
      const result = await Promise.all(
        filteredURLs.map(async (item) => {
          const url = new URL(item).pathname.split("/");
          const id = url[url.length - 2];
          const response = await this.#apiInstance.get(`/people/${id}`);
          return response.data;
        })
      );
      return result;
    }
    return [];
  }

  async getPeopleByFilters(filters, filterFields) {
    try {
      const peopleURLs = UrlService.getURLsByFilter(filters, filterFields);
      const filteredURLs = UrlService.getFilteredURLs(peopleURLs);
      const result = await this.#getPeopleById(filteredURLs);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPeopleByPage(page) {
    try {
      const response = await this.#apiInstance.get(`/people/?page=${page}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new PeopleService(apiInstance);
