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

 // ===== AUTO CHECK PLAYER ID =====

const playerInput = document.getElementById("player-id");
const loading = document.getElementById("loading");
const playerInfo = document.getElementById("player-info");
const playerName = document.getElementById("player-name");
const playerIdShow = document.getElementById("player-id-show");

let checkTimer;
let requestNumber = 0;

if (playerInput && loading && playerInfo && playerName && playerIdShow) {
    playerInput.addEventListener("input", function () {
        clearTimeout(checkTimer);
        const id = this.value.trim();
        const currentRequest = ++requestNumber;

        playerInfo.style.display = "none";

        if (id.length < 5) {
            loading.style.display = "none";
            return;
        }

        checkTimer = setTimeout(async () => {
            loading.style.display = "flex";

            try {
                const response = await fetch(
                    "https://e-kenzo-api.onrender.com/check-player",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            slug: "free-fire",
                            player_id: id
                        })
                    }
                );

                const data = await response.json();

                if (currentRequest !== requestNumber) return;

                if (!response.ok || data.result === "invalid") {
                    throw new Error("មិនអាចរកគណនីនេះបានទេ");
                }

                const name =
                    data.name ||
                    data.player_name ||
                    data.data?.name;

                if (!name) {
                    throw new Error("API មិនបានផ្ញើឈ្មោះអ្នកលេងមកទេ");
                }

                playerName.textContent = name;
                playerIdShow.textContent = id;
                playerInfo.style.display = "flex";

            } catch (error) {
                if (currentRequest === requestNumber) {
                    playerInfo.style.display = "none";
                    playerName.textContent = error.message;
                }
                console.error("Player check failed:", error);
            } finally {
                if (currentRequest === requestNumber) {
                    loading.style.display = "none";
                }
            }
        }, 700);
    });
}


    }
