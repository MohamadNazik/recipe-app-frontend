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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(res.data.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = async (mealId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${baseUrl}/favorites/remove`,
        { mealId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavorites((prevFavorites) =>
        prevFavorites.filter(
          (favMealArray) => favMealArray[0]?.idMeal !== mealId
        )
      );
    } catch (error) {
      // console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      <NavBar currentPage="fav" />

      <div className="w-full px-40 flex flex-wrap gap-7 mt-10">
        {favorites && favorites.length > 0 ? (
          favorites.map((favMealArray) => {
            const favMeal = favMealArray[0];

            return (
              <RecipeCard
                key={favMeal.idMeal}
                mealId={favMeal.idMeal}
                img={favMeal.strMealThumb}
                category={favMeal.strCategory}
                recipeName={favMeal.strMeal}
                isFavorite={true}
                remove={removeFromFavorites}
              />
            );
          })
        ) : (
          <p>No favorites available</p>
        )}
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
