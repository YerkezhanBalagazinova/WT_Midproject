
let favorites = [false, false, false, false, false, false, false, false];

try {
    const saved = localStorage.getItem("favorites");

    if (saved !== null) {
        const data = JSON.parse(saved);

        if (Array.isArray(data) && data.length === rooms.length) {
            let valid = true;

            for (let i = 0; i < data.length; i++) {
                if (typeof data[i] !== "boolean") {
                    valid = false;
                }
            }

            if (valid) {
                favorites = data;
            }
        }
    }
} catch (error) {
    favorites = [false, false, false, false, false, false, false, false];
}

const roomCards = document.querySelectorAll(".room-item");
const roomsGrid = document.getElementById("roomsGrid");
const searchInput = document.getElementById("roomSearchInput");
const priceFilter = document.getElementById("priceFilter");
const sortPrice = document.getElementById("sortPrice");
const favoritesOnly = document.getElementById("favoritesOnly");
const clearFavoritesButton = document.getElementById("clearFavorites");
const searchMessage = document.getElementById("searchMessage");
const favoriteButtons = [];

function saveFavorites() {
    try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
        console.log("Favorites could not be saved.");
    }
}

function findRooms(query, maxPrice) {
    let count = 0;

    for (let i = 0; i < rooms.length; i++) {
        const nameMatch = rooms[i].matchesName(query);
        const priceMatch = rooms[i].matchesPrice(maxPrice);
        const favoriteMatch = favoritesOnly.checked === false || favorites[i] === true;

        if (nameMatch && priceMatch && favoriteMatch) {
            $(roomCards[i]).show();
            count++;
        } else {
            $(roomCards[i]).hide();
        }
    }

    return count;
}

function searchRooms() {
    const query = searchInput.value.trim().toLowerCase();
    const count = findRooms(query, priceFilter.value);

    searchMessage.textContent = count + " room(s) found.";
}

function sortRooms() {
    const order = sortPrice.value;
    const indexes = [];

    for (let i = 0; i < rooms.length; i++) {
        indexes.push(i);
    }

    indexes.sort(function(a, b) {
        if (order === "low") return rooms[a].price - rooms[b].price;
        if (order === "high") return rooms[b].price - rooms[a].price;
        return a - b;
    });

    for (let i = 0; i < indexes.length; i++) {
        roomsGrid.appendChild(roomCards[indexes[i]]);
    }
}

for (let i = 0; i < roomCards.length; i++) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "favorite-button";

    if (favorites[i] === true) {
        button.textContent = "♥ Saved";
    } else {
        button.textContent = "♡ Add to Favorites";
    }

    roomCards[i].querySelector(".full-room-content").appendChild(button);
    favoriteButtons.push(button);

    button.addEventListener("click", function() {
        if (favorites[i] === false) {
            favorites[i] = true;
            button.textContent = "♥ Saved";
        } else {
            favorites[i] = false;
            button.textContent = "♡ Add to Favorites";
        }

        saveFavorites();
        searchRooms();
    });
}

function clearFavorites() {
    for (let i = 0; i < favorites.length; i++) {
        favorites[i] = false;
        favoriteButtons[i].textContent = "♡ Add to Favorites";
    }

    try {
        localStorage.removeItem("favorites");
    } catch (error) {
        console.log("Favorites could not be cleared from storage.");
    }

    searchRooms();
}

searchInput.addEventListener("input", searchRooms);
priceFilter.addEventListener("change", searchRooms);
sortPrice.addEventListener("change", sortRooms);
favoritesOnly.addEventListener("change", searchRooms);
clearFavoritesButton.addEventListener("click", clearFavorites);

searchRooms();
