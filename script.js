// ===== MENU =====

function openMenu() {
    document.getElementById("side-menu").classList.add("active");
}

function closeMenu() {
    document.getElementById("side-menu").classList.remove("active");
}
// ===== BANNER =====

const banners = [
    "assets/banners/banner1.png",
    "assets/banners/banner2.png",
    "assets/banners/banner3.png"
];

let currentBanner = 0;

const banner = document.getElementById("banner");
const dots = document.querySelectorAll(".dot");

function changeBanner() {

    currentBanner++;

    if (currentBanner >= banners.length) {
        currentBanner = 0;
    }

    banner.src = banners[currentBanner];

    dots.forEach(dot => dot.classList.remove("active"));

    dots[currentBanner].classList.add("active");

}

setInterval(changeBanner, 3000);
// ===== DOT CLICK =====

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentBanner = index;

        banner.src = banners[currentBanner];

        dots.forEach(d => d.classList.remove("active"));

        dots[currentBanner].classList.add("active");

    });

});
// ===== CLOSE MENU WHEN CLICK OUTSIDE =====

document.addEventListener("click", function (e) {

    const menu = document.getElementById("side-menu");
    const menuBtn = document.querySelector(".menu-btn");

    if (
        menu.classList.contains("active") &&
        !menu.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        closeMenu();
    }

});
// ===== SELECT PACKAGE =====

const packageCards = document.querySelectorAll(".package-card");
const payBtn = document.getElementById("pay-btn");

if (packageCards.length > 0) {

    packageCards.forEach(card => {

        card.addEventListener("click", () => {

            packageCards.forEach(c => c.classList.remove("active"));

            card.classList.add("active");

            if (payBtn) {
               payBtn.disabled = false;
payBtn.style.background = "#7c4dff";
payBtn.style.opacity = "1";
payBtn.innerText = "បន្តទៅការទូទាត់";
            }

        });

    });

                         }
// ===== PAYMENT INFO =====

const selectedPackage = document.getElementById("selected-package");
const selectedPrice = document.getElementById("selected-price");

packageCards.forEach(card => {

    card.addEventListener("click", () => {

        const packageName = card.querySelector("h3").innerText;
        const packagePrice = card.querySelector("p").innerText;

        selectedPackage.innerText = packageName;
        selectedPrice.innerText = packagePrice;

    });

});
// ===== GO TO PAYMENT =====

if (payBtn) {

    payBtn.addEventListener("click", () => {

        if (!payBtn.disabled) {

            window.location.href = "payment.html";

        }

    });

}
