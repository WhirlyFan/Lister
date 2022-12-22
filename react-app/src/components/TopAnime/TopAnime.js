import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Lists.module.css";

export default function Lists() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime")
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setData(data);
      });
  }, []);

  if (!isLoaded) {
    return null;
  }
  console.log(data);

  return <div>test</div>;
}
