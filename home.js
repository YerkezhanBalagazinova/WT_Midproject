
const reviews = [];
const reviewForm = document.getElementById("reviewForm");
const reviewsList = document.getElementById("reviewsList");
const reviewName = document.getElementById("reviewName");
const reviewRating = document.getElementById("reviewRating");
const reviewMessage = document.getElementById("reviewMessage");
const reviewSubmit = document.getElementById("reviewSubmit");

let editingIndex = -1;

reviewForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = reviewName.value.trim();
    const rating = reviewRating.value;
    const message = reviewMessage.value.trim();

    if (name === "" || message === "") return;

    if (editingIndex === -1) {
        reviews.push({name: name, rating: rating, text: message});
    } else {
        reviews[editingIndex] = {name: name, rating: rating, text: message};
    }

    editingIndex = -1;
    reviewSubmit.textContent = "Post Review";
    reviewForm.reset();
    showReviews();
});

function showReviews() {
    reviewsList.innerHTML = "";

    reviews.forEach(function(review, index) {
        const card = document.createElement("div");
        card.className = "review-card";

        const title = document.createElement("h3");
        title.textContent = review.name + " — " + review.rating + "/5";

        const text = document.createElement("p");
        text.textContent = review.text;

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.className = "edit-review";

        editButton.addEventListener("click", function() {
            editingIndex = index;
            reviewName.value = review.name;
            reviewRating.value = review.rating;
            reviewMessage.value = review.text;
            reviewSubmit.textContent = "Save Changes";
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-review";

        deleteButton.addEventListener("click", function() {
            reviews.splice(index, 1);
            editingIndex = -1;
            reviewForm.reset();
            reviewSubmit.textContent = "Post Review";
            showReviews();
        });

        card.appendChild(title);
        card.appendChild(text);
        card.appendChild(editButton);
        card.appendChild(deleteButton);
        reviewsList.appendChild(card);
    });
}
