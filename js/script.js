
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

    // Subtle scroll reveal for cards and key blocks
    const revealTargets = document.querySelectorAll(
        ".products-section .row > [class*='col'], " +
        "#about .row > [class*='col'], " +
        "#cases .row > [class*='col'], " +
        ".custom-section .row > [class*='col-lg']"
    );

    if ("IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        const revealObserver = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealTargets.forEach(function (el, i) {
            const siblings = Array.prototype.indexOf.call(el.parentNode.children, el);
            el.style.setProperty("--reveal-delay", (siblings % 4) * 0.08 + "s");
            el.classList.add("reveal");
            revealObserver.observe(el);
        });
    }

    // Industries: drag-to-scroll with mouse (touch swipe is native)
    const track = document.getElementById("industryTrack");

    if (track) {
        let startX = 0;
        let startScroll = 0;
        let isDown = false;
        let moved = false;

        track.addEventListener("pointerdown", function (e) {
            if (e.pointerType !== "mouse" || e.button !== 0) {
                return;
            }
            isDown = true;
            moved = false;
            startX = e.clientX;
            startScroll = track.scrollLeft;
        });

        window.addEventListener("pointermove", function (e) {
            if (!isDown) {
                return;
            }
            const dx = e.clientX - startX;
            if (!moved && Math.abs(dx) > 4) {
                moved = true;
                track.classList.add("is-dragging");
            }
            if (moved) {
                track.scrollLeft = startScroll - dx;
            }
        });

        function endDrag() {
            if (!isDown) {
                return;
            }
            isDown = false;
            if (moved) {
                // Re-enable snapping so the track settles on the nearest card
                const slide = track.querySelector(".industry-slide");
                const step = slide ? slide.offsetWidth + parseFloat(getComputedStyle(track).columnGap || 0) : 0;
                const target = step ? Math.round(track.scrollLeft / step) * step : track.scrollLeft;
                track.classList.remove("is-dragging");
                track.scrollTo({ left: target, behavior: "smooth" });
            }
        }

        window.addEventListener("pointerup", endDrag);
        window.addEventListener("pointercancel", endDrag);
    }

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
