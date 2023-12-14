import { createBrowserRouter } from "react-router-dom";
import  Home  from "../pages/Home/Home";
import Root from "../pages/Root";
import Genres from "../pages/Genres";
import Platforms from "../pages/Platforms";
import GameDetail from "../pages/GameDetail/GameDetail.jsx";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import LoggedRoutes from "../pages/LoggedRoutes/LoggedRoutes";
import Account from "../pages/LoggedRoutes/Account";
import Settings from "../pages/Settings/Settings";
import CommentPage from "../pages/CommentPage/CommentPage"
import { getSingleGame } from "../pages/GameDetail/GameDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[
      {
        path: '/',
        element: <Home />
      },
      {
        path: `/games/genre/:genre`,
        element: <Genres />
      },
      {
        path: `/games/platform/:platformId`,
        element: <Platforms />
      },
      {
        path : "/game/:gameId",
        element : <GameDetail />,
        loader : getSingleGame,
      },
    ]
  },
  {
    path : "/login",
    element : <Login />
  },
  {
    path : "/register",
    element : <Register />
  },
  {
    path : "/",
    element : <LoggedRoutes />,
    children: [
      {
        path: "/account/accountPage",
        element: <Account />
      },
      {
        path: "/account/settings",
        element: <Settings />
      },
      {
        path : "/game/:gameId/comment",
        element : <CommentPage />
      },
    ]
  },

]);
