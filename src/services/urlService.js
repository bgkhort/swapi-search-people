class UrlService {
  static getURLsByFilter(filters, filterFields) {
    const result = [];

    for (let title in filters) {
      if (filters[title].length) {
        filters[title].forEach((name) => {
          const fieldName = filterFields[title].find(
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
