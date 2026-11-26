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

    // Subtle scroll reveal (content stays visible if JS or IntersectionObserver is unavailable)
    const targets = document.querySelectorAll(".c-rv");

    if ("IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        const observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        targets.forEach(function (el, i) {
            el.style.setProperty("--reveal-delay", (i % 3) * 0.1 + "s");
            el.classList.add("reveal");
            observer.observe(el);
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
