
document.addEventListener("DOMContentLoaded", function () {

    // Dynamic copyright year
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Back to top button
    const backTop = document.getElementById("backTop");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    });

    backTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Mobile navbar auto close
    const navLinks = document.querySelectorAll(
        "#navbarMenu .nav-link"
    );

    const navbarMenu = document.getElementById("navbarMenu");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navbarMenu.classList.contains("show")) {
                bootstrap.Collapse
                    .getOrCreateInstance(navbarMenu)
                    .hide();
            }

        });

    });

    // Contact form validation
    const demoForm = document.getElementById("demoForm");
    const formMessage = document.getElementById("formMessage");

    demoForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!demoForm.reportValidity()) {
            return;
        }

        formMessage.textContent =
            "Thank you! Your enquiry has been validated successfully.";

        demoForm.reset();

    });

});
