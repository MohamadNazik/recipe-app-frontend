import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RecipeCard from "../components/RecipeCard";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BACKEND_URI;

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [recipes, setRecipes] = useState([]);
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
    const fetchCategories = async () => {
      setIsLoading(true);
      await axios
        .get(`${baseUrl}/recipes/categories`)
        .then((res) => {
          setCategories(res.data.categories);
          setCurrentCategory(res.data.categories[0].strCategory);
          setIsLoading(false);
        })
        .catch((err) => {
          // console.log(err);
          setIsLoading(false);
        });
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const ferchFavorites = async () => {
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
    ferchFavorites();
  }, [favClicked]);

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      setIsLoading(true);
      categories &&
        (await axios
          .post(`${baseUrl}/recipes/category/list`, {
            category: currentCategory,
          })
          .then((res) => {
            setRecipes(res.data.meals);
            setIsLoading(false);
          })
          .catch((err) => {
            // console.log(err);
            setIsLoading(false);
          }));
    };
    fetchRecipesByCategory();
  }, [currentCategory, categories]);

  const addToFavorites = async (mealId) => {
    const token = localStorage.getItem("token");
    await axios
      .post(
        `${baseUrl}/favorites/add`,
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
      <NavBar currentPage="home" />

      <div className="w-full px-40 flex flex-wrap gap-7 mt-10">
        {categories &&
          categories.map((category) =>
            category.idCategory <= 5 ? (
              <div
                key={category.idCategory}
                className={`border-2 border-red-400 rounded-3xl py-2 px-8 cursor-pointer ${
                  currentCategory && currentCategory === category.strCategory
                    ? "bg-red-400"
                    : "bg-transparent"
                }`}
                onClick={() => setCurrentCategory(category.strCategory)}
              >
                <p
                  className={` font-medium ${
                    currentCategory && currentCategory === category.strCategory
                      ? "text-white"
                      : "text-red-500"
                  }`}
                >
                  {category.strCategory}
                </p>
              </div>
            ) : null
          )}
      </div>
      <div className="w-full px-40 flex flex-wrap gap-7 mt-10">
        {recipes &&
          recipes.map((recipe) => {
            const isFavorite = favorites.some((mealArray) =>
              mealArray.some((meal) => meal.idMeal === recipe.idMeal)
            );

            return (
              <RecipeCard
                key={recipe.idMeal}
                mealId={recipe.idMeal}
                img={recipe.strMealThumb}
                category={currentCategory}
                recipeName={recipe.strMeal}
                isFavorite={isFavorite}
                add={addToFavorites}
                remove={removeFromFavorites}
              />
            );
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

export default HomePage;
