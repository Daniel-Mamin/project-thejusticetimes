const getUser = () => {
  const id = localStorage.getItem("ID_USER");
  const users = JSON.parse(localStorage.getItem("ALL_USERS"));
  const user = users.find((user) => user.id === id);

  return user;
};

export default getUser;
