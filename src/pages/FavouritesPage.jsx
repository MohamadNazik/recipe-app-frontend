import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const baseUrl = import.meta.env.VITE_BACKEND_URI;

function FavouritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [favClicked, setFavClicked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const ferthFavorites = async () => {
      setIsLoading(true);
      await axios
        .get(`${baseUrl}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          setFavorites(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          // console.log(err);
          setIsLoading(false);
        });
    };

    ferthFavorites();
  }, [favClicked]);

  const removeFromFavorites = async (mealId) => {
    const token = localStorage.getItem("token");
    await axios
      .post(
        `${baseUrl}/favorites/remove`,
        { mealId: mealId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setFavClicked((prev) => !prev);
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      <NavBar currentPage="fav" />

      <div className="w-full px-40 flex flex-wrap gap-7 mt-10">
        {favorites &&
          favorites.map((favMealArray) => {
            const favMeal = favMealArray[0];

            !favMeal.isEmpty() ? (
              <RecipeCard
                key={favMeal.idMeal}
                mealId={favMeal.idMeal}
                img={favMeal.strMealThumb}
                category={favMeal.strCategory}
                recipeName={favMeal.strMeal}
                isFavorite={true}
                remove={removeFromFavorites}
              />
            ) : null;
          })}
      </div>

      {isLoading && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default FavouritesPage;
