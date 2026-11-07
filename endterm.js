$(document).ready(function () {

    // 1. FAQ Accordion
    $(".faq-answer").hide();

    $(".faq-question").click(function () {

        let item = $(this).parent();
        let isOpen = item.hasClass("active");

        $(".faq-item").removeClass("active");
        $(".faq-answer").stop(true, true).slideUp(300);
        $(".faq-question span").text("+");

        if (!isOpen) {
            item.addClass("active");
            item.find(".faq-answer").stop(true, true).slideDown(300);
            $(this).find("span").text("−");
        }
    });

    // 2. More Details
    $(".details-content").hide();

    $(".details-btn").click(function () {

        let btn = $(this);
        let content = btn.next(".details-content");
        let isOpen = btn.hasClass("open");

        btn.toggleClass("open");
        content.stop(true, true).slideToggle(400);

        btn.text(isOpen ? "More Details" : "Less Details");
    });

    // 3. Character Counter
    $("#message").on("input", function () {

        let currentLength = $(this).val().length;
        let maxLength = 500;

        $("#charCounter").text(
            currentLength + " / " + maxLength + " characters"
        );

    });


    // 4. Form Validation
    $(".contact-form form").on("submit", function (event) {

        event.preventDefault();

        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let message = $("#message").val().trim();

        let isValid = true;

        $(".error-message").text("");
        $("#formSuccess").text("");

        if (name.length < 2) {
            $("#nameError").text(
                "Name must contain at least 2 characters."
            );
            isValid = false;
        }

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            $("#emailError").text(
                "Please enter a valid email address."
            );
            isValid = false;
        }

        if (message.length < 10) {
            $("#messageError").text(
                "Message must contain at least 10 characters."
            );
            isValid = false;
        }

        if (isValid) {

            $("#formSuccess")
                .text("Your message was submitted successfully!")
                .hide()
                .fadeIn(500);

            this.reset();

            $("#charCounter").text("0 / 500 characters");
        }

    });

})