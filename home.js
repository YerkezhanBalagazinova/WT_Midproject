
const reviews = [];
const reviewForm = document.getElementById("reviewForm");
const reviewsList = document.getElementById("reviewsList");

reviewForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("reviewName").value.trim();
    const rating = document.getElementById("reviewRating").value;
    const message = document.getElementById("reviewMessage").value.trim();

    if (name === "" || message === "") return;

    reviews.push({name: name, rating: rating, text: message});

    showReviews();
    reviewForm.reset();
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

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-review";

        deleteButton.addEventListener("click", function() {
            reviews.splice(index, 1);
            showReviews();
        });

        card.appendChild(title);
        card.appendChild(text);
        card.appendChild(deleteButton);
        reviewsList.appendChild(card);
    });
}
