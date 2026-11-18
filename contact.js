
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".contact-form form");
    if (!form) return;

    const DRAFT_KEY = "contactDraft";
    const fieldIds = ["name", "email", "phone", "room", "checkIn", "checkOut", "guests", "message"];

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const bookingTotal = document.getElementById("bookingTotal");
    const bookingError = document.getElementById("bookingError");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateName() {
        const valid = nameInput.value.trim().length >= 2;

        if (valid) {
            $("#nameError").text("");
            $("#name").removeClass("is-invalid").addClass("is-valid");
        } else {
            $("#nameError").text("Name must contain at least 2 characters.");
            $("#name").removeClass("is-valid").addClass("is-invalid");
        }

        return valid;
    }

    function validateEmail() {
        const valid = emailPattern.test(emailInput.value.trim());

        if (valid) {
            $("#emailError").text("");
            $("#email").removeClass("is-invalid").addClass("is-valid");
        } else {
            $("#emailError").text("Please enter a valid email.");
            $("#email").removeClass("is-valid").addClass("is-invalid");
        }

        return valid;
    }

    function clearValidationState() {
        $("#name, #email, #room").removeClass("is-valid is-invalid");
        $("#nameError, #emailError, #messageError, #bookingError").text("");
    }

    function updateCounter() {
        const counter = document.getElementById("charCounter");
        counter.textContent = messageInput.value.length + " / 500 characters";
    }

    function getSelectedRoom() {
        const roomName = document.getElementById("room").value;

        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].name === roomName) {
                return rooms[i];
            }
        }

        return null;
    }

    function updateBooking() {
        const selectedRoom = getSelectedRoom();
        const checkIn = document.getElementById("checkIn").value;
        const checkOut = document.getElementById("checkOut").value;
        const guests = Number(document.getElementById("guests").value);

        bookingTotal.textContent = "Select a room and dates to see the total price.";
        bookingError.textContent = "";

        if (!selectedRoom || !checkIn || !checkOut) return false;

        $("#room").removeClass("is-invalid");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (new Date(checkIn + "T00:00:00") < today) {
            bookingError.textContent = "Check-in cannot be in the past.";
            return false;
        }

        if (checkOut <= checkIn) {
            bookingError.textContent = "Check-out must be after check-in.";
            return false;
        }

        if (!Number.isInteger(guests) || guests < 1 || guests > 10) {
            bookingError.textContent = "Please enter between 1 and 10 guests.";
            return false;
        }

        if (guests > selectedRoom.maxGuests) {
            bookingError.textContent = "Maximum " + selectedRoom.maxGuests + " guests for " + selectedRoom.name + ".";
            return false;
        }

        const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
        const total = nights * selectedRoom.price;

        bookingTotal.textContent = "Total: " + total + " KZT for " + nights + " night(s).";

        return true;
    }

    function saveDraft() {
        const draft = {};

        fieldIds.forEach(function(id) {
            draft[id] = document.getElementById(id).value;
        });

        try {
            localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        } catch (error) {
            console.log("Form draft could not be saved.");
        }
    }

    function clearDraft() {
        try {
            localStorage.removeItem(DRAFT_KEY);
        } catch (error) {
            console.log("Form draft could not be cleared.");
        }
    }

    function restoreDraft() {
        try {
            const saved = localStorage.getItem(DRAFT_KEY);
            if (saved === null) return;

            const draft = JSON.parse(saved);

            if (draft === null || typeof draft !== "object" || Array.isArray(draft)) {
                clearDraft();
                return;
            }

            fieldIds.forEach(function(id) {
                const field = document.getElementById(id);
                const value = draft[id];

                if (typeof value !== "string") return;

                if (id === "room") {
                    let exists = false;

                    for (let i = 0; i < field.options.length; i++) {
                        if (field.options[i].value === value) {
                            exists = true;
                        }
                    }

                    if (!exists) return;
                }

                field.value = value;
            });

        } catch (error) {
            clearDraft();
        }
    }

    restoreDraft();
    updateCounter();
    updateBooking();
    messageInput.addEventListener("input", updateCounter);
    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);

    nameInput.addEventListener("input", function() {
        if ($("#name").hasClass("is-invalid")) {
            validateName();
        }
    });

    emailInput.addEventListener("input", function() {
        if ($("#email").hasClass("is-invalid")) {
            validateEmail();
        }
    });

    document.getElementById("room").addEventListener("change", updateBooking);
    document.getElementById("checkIn").addEventListener("change", updateBooking);
    document.getElementById("checkOut").addEventListener("change", updateBooking);
    document.getElementById("guests").addEventListener("input", updateBooking);

    form.addEventListener("input", saveDraft);
    form.addEventListener("change", saveDraft);

    form.addEventListener("reset", function() {
        clearDraft();
        clearValidationState();
        document.getElementById("charCounter").textContent = "0 / 500 characters";
        bookingTotal.textContent = "Select a room and dates to see the total price.";
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        $("#formSuccess").text("");

        const validName = validateName();
        const validEmail = validateEmail();
        const validBooking = updateBooking();

        if (!validBooking) {
            if (document.getElementById("room").value === "") {
                $("#room").addClass("is-invalid");
            }

            if (bookingError.textContent === "") {
                bookingError.textContent = "Please select a room and both dates.";
            }
        }

        if (validName && validEmail && validBooking) {
            $("#formSuccess")
                .text("Booking details are valid! Demo request completed.")
                .hide()
                .fadeIn(500);

            form.reset();
        }
    });
});
