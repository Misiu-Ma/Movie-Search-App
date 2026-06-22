const movie_input = document.querySelector(".movie-input");
const search_btn = document.querySelector(".search-btn");
const poster = document.querySelector(".poster");
const year = document.querySelector(".year");
const rating = document.querySelector(".rating");
const description = document.querySelector(".description");
const loading = document.querySelector(".loading");

const API_KEY = "40382272";

async function renderBtn() {

    const getValue = movie_input.value.trim();

    if (getValue === "") {
        alert("Please enter a movie name");
        return;
    }

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${getValue}`;

    loading.style.display = "block";

    try {

        const response = await fetch(url);
        const data = await response.json();

        loading.style.display = "none";

        if (data.Response === "False") {
            alert("Movie not found!");
            return;
        }

        poster.src = data.Poster;
        year.textContent = `Year: ${data.Year}`;
        rating.textContent = `IMDb Rating: ${data.imdbRating}`;
        description.textContent = data.Plot;

    } catch (error) {

        loading.style.display = "none";
        alert("Network Error");

    }

    movie_input.value = "";
}

movie_input.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        renderBtn();
    }

});

search_btn.addEventListener("click", renderBtn);