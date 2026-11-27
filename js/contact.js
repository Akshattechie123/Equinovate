document.addEventListener("DOMContentLoaded", function () {

    // Dynamic copyright year
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Back to top button
    const backTop = document.getElementById("backTop");
    if (backTop) {
        window.addEventListener("scroll", function () {
            backTop.classList.toggle("show", window.scrollY > 300);
        });

        backTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // AOS scroll animations (if the library fails to load, show content normally)
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 70
        });
    } else {
        document.querySelectorAll("[data-aos]").forEach(function (el) {
            el.removeAttribute("data-aos");
        });
    }

    // Enquiry form: validate, then open WhatsApp with the details filled in
    const form = document.getElementById("contactForm");
    const message = document.getElementById("formMessage");
    const WHATSAPP_NUMBER = "919725192139";

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!form.reportValidity()) {
                return;
            }

            const data = new FormData(form);
            const lines = [
                "Hello Equinovate, I would like to enquire about your software.",
                "",
                "Name: " + data.get("name"),
                "Company: " + data.get("company"),
                "Email: " + data.get("email"),
                "Mobile: " + data.get("mobile")
            ];

            if (data.get("type")) {
                lines.push("Requirement: " + data.get("type"));
            }
            if (String(data.get("message")).trim()) {
                lines.push("Message: " + String(data.get("message")).trim());
            }

            const url = "https://wa.me/" + WHATSAPP_NUMBER +
                "?text=" + encodeURIComponent(lines.join("\n"));

            window.open(url, "_blank", "noopener");

            message.textContent = "Opening WhatsApp… just press send to share your enquiry.";
            form.reset();
        });
    }
});
