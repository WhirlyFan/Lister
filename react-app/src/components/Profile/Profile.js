import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })().then(() => {
      setIsLoaded(true);
    });
  }, [userId]);

  if (!user || !isLoaded) {
    return null;
  }

  return (
    <div>
      <h1>{`${user.username}'s Profile`}</h1>
      <h2>Feature Coming Soon...</h2>
    </div>
  );
}