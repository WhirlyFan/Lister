import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingBar from "../LoadingBar/LoadingBar";
import AnimeCard from "../Home/AnimeCard";
import homeStyles from "../Home/Home.module.css";
// import styles from "./Search.module.css";

export default function Search() {
  const { category } = useParams();
  const users = useSelector((state) => state.session?.users);
  const animes = useSelector((state) => state.jikan.search?.data);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded || !animes || !users) {
    <LoadingBar />;
  }

  if (category === "animes" && !animes)
    return (
      <div>
        <h1>Anime</h1>
        <h2>Couldn't find any animes!</h2>
      </div>
    );

  if (category === "users" && !users) {
    return (
      <div>
        <h1>Users</h1>
        <h2>Couldn't find any users!</h2>
      </div>
    );
  }

  if (category === "users") {
    return (
      <div>
        <h1>Users</h1>
        {!users.length && <h2>Couldn't find any users!</h2>}
        {users.map((user) => {
          return <div key={`user-${user.id}`}>{user.username}</div>;
        })}
      </div>
    );
  }

  if (category === "animes") {
    return (
      <div className={homeStyles.home}>
        <h1>Anime</h1>
        {!animes.length && <h2>Couldn't find any animes!</h2>}
        <table className={homeStyles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Image</th>
              <th>Title</th>
              <th>Score</th>
              {user && <th>Add to List</th>}
            </tr>
          </thead>
          <tbody>
            {animes.map((anime, index) => {
              return (
                <AnimeCard
                  key={`anime-${anime.mal_id}`}
                  anime={anime}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
