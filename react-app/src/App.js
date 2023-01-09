import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import Profile from "./components/Profile/Profile";
import { authenticate } from "./store/session";
import Lists from "./components/Lists/Lists";
import TopAnime from "./components/TopAnime/TopAnime";
import Home from "./components/Home/Home";
import AnimeDetails from "./components/AnimeDetails/AnimeDetails";
import LoadingBar from "./components/LoadingBar/LoadingBar";

export const PageContext = React.createContext();

function App() {
  const [loaded, setLoaded] = useState(false);
  // const [page, setPage] = useState("home");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/:userId/:username" exact={true}>
            <Profile />
          </ProtectedRoute>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/lists/:userId/:username">
            <Lists />
          </Route>
          <Route path="/topanime">
            <TopAnime />
          </Route>
          <Route path="/anime/:malAnimeId/:animeName">
            <AnimeDetails />
          </Route>
          <Route path="/loading">
            <LoadingBar/>
          </Route>
          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
