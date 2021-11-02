import allArticles from "../mocks/articles";

const getSortedArray = () =>
  allArticles.sort((a, b) => (a.count < b.count ? 1 : -1));

export default getSortedArray;
