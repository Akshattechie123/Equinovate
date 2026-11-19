document.addEventListener("DOMContentLoaded", function () {

    // Copyright year
    document.querySelectorAll(".js-year").forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    // Back to top
    const backTop = document.getElementById("backTop");
    if (backTop) {
        window.addEventListener("scroll", function () {
            backTop.classList.toggle("show", window.scrollY > 300);
        });
        backTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Close mobile menu on link click
    const menu = document.getElementById("navbarMenu");
    document.querySelectorAll("#navbarMenu .nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            if (menu.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(menu).hide();
            }
        });
    });

    // Tabs: highlight the tab of the section being viewed
    const tabs = Array.from(document.querySelectorAll(".ptabs a"));
    const sections = tabs
        .map(function (t) { return document.querySelector(t.getAttribute("href")); })
        .filter(Boolean);

    function setActive() {
        const offset = 190;
        let current = sections[0];
        sections.forEach(function (s) {
            if (s.getBoundingClientRect().top - offset <= 0) { current = s; }
        });
        // last section when page bottom is reached
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
            current = sections[sections.length - 1];
        }
        tabs.forEach(function (t) {
            const on = t.getAttribute("href") === "#" + current.id;
            t.classList.toggle("active", on);
            if (on) {
                const bar = t.parentElement;
                const left = t.offsetLeft - (bar.clientWidth - t.offsetWidth) / 2;
                bar.scrollTo({ left: left, behavior: "smooth" });
            }
        });
    }
    if (tabs.length) {
        window.addEventListener("scroll", setActive, { passive: true });
        setActive();
    }

    // Forms
    function handleForm(form, needCheckbox) {
        if (!form) return;
        const msg = form.querySelector(".form-msg");
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            msg.classList.remove("err");
            if (!form.reportValidity()) return;

            if (needCheckbox && !form.querySelector('input[type="checkbox"]:checked')) {
                msg.classList.add("err");
                msg.textContent = "Please select at least one option.";
                return;
            }
            const mobile = form.querySelector('input[type="tel"]');
            if (mobile && !/^[0-9+\-\s]{8,15}$/.test(mobile.value.trim())) {
                msg.classList.add("err");
                msg.textContent = "Please enter a valid mobile number.";
                return;
            }
            msg.textContent = "Thank you! Our team will contact you shortly.";
            form.reset();
        });
    }
    handleForm(document.getElementById("demoForm"), false);
    handleForm(document.getElementById("ctaForm"), true);
});
