export default function createArr(value) {
  const newArr = value.map(({ id, webformatURL, largeImageURL }) => {
    return {
      id: id,
      webformatURL: webformatURL,
      largeImageURL: largeImageURL,
    };
  });
  return [...newArr];
}
