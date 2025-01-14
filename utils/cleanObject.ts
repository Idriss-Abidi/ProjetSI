export function cleanObject(data: any) {
    // Iterate over all keys in the data object
    Object.keys(data).forEach(key => {
      // Remove the key if the value is null, undefined, or an empty string
      if (data[key] === null || data[key] === '' || data[key] === undefined) {
        delete data[key];
      }
    });
    return data;
  }