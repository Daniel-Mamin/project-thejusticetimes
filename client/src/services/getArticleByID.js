const getArticleByID = (id) => {
  const allArticles = JSON.parse(localStorage.getItem("ALL_ARTICLES"));
  const allUsers = JSON.parse(localStorage.getItem("ALL_USERS"));

  const article = allArticles.filter((article) => article.id === id)[0];
  const user = allUsers.find((user) => user.id === article.id_user);

  return { article, user };
};

export default getArticleByID;
