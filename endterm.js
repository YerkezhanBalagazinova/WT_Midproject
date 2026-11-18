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

});

