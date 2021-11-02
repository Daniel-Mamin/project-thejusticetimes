const getArticlesByIdUser = () => {
  const id = localStorage.getItem("ID_USER");
  const allArticles = JSON.parse(localStorage.getItem("ALL_ARTICLES"));
  const allUsers = JSON.parse(localStorage.getItem("ALL_USERS"));

  const articles = allArticles.filter((article) => article.id_user === id);
  const user = allUsers.find((user) => user.id === id);

  return { articles, user };
};

export default getArticlesByIdUser;
