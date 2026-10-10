// ===== MENU =====
function openMenu() {
    document.getElementById("side-menu")?.classList.add("active");
}

function closeMenu() {
    document.getElementById("side-menu")?.classList.remove("active");
}

// ===== BANNER =====
const banners = [
    "assets/banners/banner1.png",
    "assets/banners/banner2.png",
    "assets/banners/banner3.png",
];

let currentBanner = 0;

const banner = document.getElementById("banner");
const dots = document.querySelectorAll(".dot");

function showBanner(index) {
    if (!banner) return;

    banner.src = banners[index];

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

function changeBanner() {
    currentBanner++;

    if (currentBanner >= banners.length) {
        currentBanner = 0;
    }

    showBanner(currentBanner);
}

if (banner) {
    setInterval(changeBanner, 3000);
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentBanner = index;
        showBanner(index);
    });
});

// ===== CLOSE MENU =====
document.addEventListener("click", function (e) {

    const menu = document.getElementById("side-menu");
    const menuBtn = document.querySelector(".menu-btn");

    if (
        menu &&
        menuBtn &&
        menu.classList.contains("active") &&
        !menu.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        closeMenu();
    }

});

// ===== PACKAGE =====
const packageCards = document.querySelectorAll(".package-card");
const payBtn = document.getElementById("pay-btn");

const selectedPackage = document.getElementById("selected-package");
const selectedPrice = document.getElementById("selected-price");

packageCards.forEach(card => {

    card.addEventListener("click", () => {

        packageCards.forEach(c => c.classList.remove("active"));
        e.preventDefault();
        card.classList.add("active");

        if (selectedPackage) {
            selectedPackage.textContent =
                card.querySelector("h3")?.innerText || "";
        }

        if (selectedPrice) {
            selectedPrice.textContent =
                card.querySelector("p")?.innerText || "";
        }

        if (payBtn) {
            payBtn.disabled = false;
            payBtn.style.opacity = "1";
            payBtn.innerText = "បន្តទៅការទូទាត់";
        }

    });

});

if (payBtn) {

    payBtn.addEventListener("click", () => {

        if (!payBtn.disabled) {

            location.href = "payment.html";

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

if (playerInput && loading && playerInfo && playerName && playerIdShow) {

    playerInput.addEventListener("input", function () {

        clearTimeout(checkTimer);

        const playerId = this.value.trim();

        playerInfo.style.display = "none";

        if (playerId.length < 5) {
            loading.style.display = "none";
            return;
        }

        loading.style.display = "flex";

        checkTimer = setTimeout(async () => {

            try {

                const response = await fetch(
                    "https://e-kenzo-api.onrender.com/check-player",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            slug: "freefire-sgmy",
                            player_id: playerId
                        })
                    }
                );

                const data = await response.json();

                loading.style.display = "none";

                if (!response.ok) {
                    throw new Error(data.message || "Check failed");
                }

                const nickname =
                    data.nickname ||
                    data.data?.nickname ||
                    data.name ||
                    "Unknown";

                playerName.textContent = nickname;
                playerIdShow.textContent = playerId;

                playerInfo.style.display = "flex";

            } catch (err) {

                loading.style.display = "none";

                playerInfo.style.display = "none";

                console.error(err);

            }

        }, 800);

    });

                     }
// ===== OPEN PACKAGE PANEL =====

const packageOverlay = document.getElementById("packageOverlay");
const closePanel = document.getElementById("closePanel");

// Card Free Fire
const freeFireCard = document.getElementById("freefire-card");

if (freeFireCard) {

    freeFireCard.onclick = () => {

        packageOverlay.classList.add("active");

    };

}

if (closePanel) {

    closePanel.onclick = () => {

        packageOverlay.classList.remove("active");

    };

}

packageOverlay.onclick = (e) => {

    if (e.target === packageOverlay) {

        packageOverlay.classList.remove("active");

    }

};
