class UrlService {
  static getURLsByFilter(filters, filterFields) {
    const result = [];

    for (let filterField in filters) {
      if (filters[filterField].length) {
        filters[filterField].forEach((name) => {
          const fieldName = filterFields[filterField].find(
            (item) => item.title === name
          );
          result.push(fieldName.items);
        });
      }
    }
    return result;
  }

  static getFilteredURLs(urls) {
    return urls.reduce((arr, item) => {
      if (arr.length) {
        arr = arr.filter((i) => item.includes(i));
      } else {
        arr = [...item];
      }
      return arr;
    }, []);
  }
}

export default UrlService;
