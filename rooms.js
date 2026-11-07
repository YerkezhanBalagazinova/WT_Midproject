
const roomNames = [
    "Standard Room",
    "Twin Room",
    "Deluxe Room",
    "Family Room",
    "Junior Suite",
    "Executive Suite",
    "Accessible Room",
    "Penthouse Suite"
];

const roomPrices = [35000, 40000, 60000, 70000, 85000, 120000, 45000, 180000];

const favorites = [false, false, false, false, false, false, false, false];

const roomCards = document.querySelectorAll(".room-item");
const roomsGrid = document.getElementById("roomsGrid");
const searchInput = document.getElementById("roomSearchInput");
const priceFilter = document.getElementById("priceFilter");
const sortPrice = document.getElementById("sortPrice");
const favoritesOnly = document.getElementById("favoritesOnly");
const searchMessage = document.getElementById("searchMessage");

function findRooms(query, maxPrice) {
    let count = 0;

    for (let i = 0; i < roomNames.length; i++) {
        const nameMatch = roomNames[i].toLowerCase().includes(query);
        const priceMatch = maxPrice === "all" || roomPrices[i] <= Number(maxPrice);
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

    for (let i = 0; i < roomNames.length; i++) {
        indexes.push(i);
    }

    indexes.sort(function(a, b) {
        if (order === "low") return roomPrices[a] - roomPrices[b];
        if (order === "high") return roomPrices[b] - roomPrices[a];
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
    button.textContent = "♡ Add to Favorites";

    roomCards[i].querySelector(".full-room-content").appendChild(button);

    button.addEventListener("click", function() {
        if (favorites[i] === false) {
            favorites[i] = true;
            button.textContent = "♥ Saved";
        } else {
            favorites[i] = false;
            button.textContent = "♡ Add to Favorites";
        }

        searchRooms();
    });
}

searchInput.addEventListener("input", searchRooms);
priceFilter.addEventListener("change", searchRooms);
sortPrice.addEventListener("change", sortRooms);
favoritesOnly.addEventListener("change", searchRooms);

searchRooms();
