import {
  MainPage,
  MyArticles,
  Article,
  NoMatch,
  LogIn,
  SingIn,
  Profile,
  AddArticle,
} from "../components";

const routes = [
  {
    path: "/",
    component: MainPage,
    exact: true,
    withAuth: false,
  },
  {
    path: "/myArticles/:id",
    component: MyArticles,
    exact: true,
    withAuth: true,
  },
  {
    path: "/article/:id",
    component: Article,
    exact: true,
    withAuth: true,
  },
  {
    path: "/login",
    component: LogIn,
    exact: true,
    withAuth: false,
  },
  {
    path: "/singin",
    component: SingIn,
    exact: true,
    withAuth: false,
  },
  {
    path: "/profile/:id",
    component: Profile,
    exact: true,
    withAuth: true,
  },
  {
    path: "/addArticle",
    component: AddArticle,
    exact: true,
    withAuth: true,
  },
  {
    path: "/*",
    component: NoMatch,
    withAuth: false,
  },
];

export default routes;
