// =========================
// MENU
// =========================

function openMenu() {
    const menu = document.getElementById("side-menu");
    if (menu) {
        menu.classList.add("active");
    }
}

function closeMenu() {
    const menu = document.getElementById("side-menu");
    if (menu) {
        menu.classList.remove("active");
    }
}

docu// =========================
// BANNER
// =========================

const banners = [
    "assets/banners/banner1.png",
    "assets/banners/banner2.png",
    "assets/banners/banner3.png"
];

let currentBanner = 0;

const banner = document.getElementById("banner");
const dots = document.querySelectorAll(".dot");

function showBanner(index) {

    if (!banner) return;

    banner.style.opacity = "0";

    setTimeout(() => {

        banner.src = banners[index];

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        banner.style.opacity = "1";

    }, 250);

}

function nextBanner() {

    currentBanner++;

    if (currentBanner >= banners.length) {
        currentBanner = 0;
    }

    showBanner(currentBanner);

}

if (banner) {

    showBanner(0);

    setInterval(nextBanner, 3000);

}

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentBanner = index;

        showBanner(index);

    });

});ment.addEventListener("click", function (e) {

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

// =========================
// IRE PACKAGE PANEL
// =========================

const packageOverlay = document.getElementById("packageOverlay");
const packageGrid = document.getElementById("packageGrid");
const freeFireCard = document.getElementById("freefire-card");
const closePanel = document.getElementById("closePanel");

const freefirePackages = [

    { name: "25 Diamonds", price: "$0.25", img: "assets/icons/diamond.png" },
    { name: "50 Diamonds", price: "$0.45", img: "assets/icons/diamond.png" },
    { name: "100 Diamonds", price: "$0.90", img: "assets/icons/diamond.png" },
    { name: "210 Diamonds", price: "$1.80", img: "assets/icons/diamond.png" },

    { name: "310 Diamonds", price: "$2.70", img: "assets/icons/diamond.png" },
    { name: "520 Diamonds", price: "$4.50", img: "assets/icons/diamond.png" },
    { name: "1060 Diamonds", price: "$8.90", img: "assets/icons/diamond.png" },
    { name: "2180 Diamonds", price: "$17.90", img: "assets/icons/diamond.png" },

    { name: "5600 Diamonds", price: "$44.90", img: "assets/icons/diamond.png" },
    { name: "Weekly", price: "$1.89", img: "assets/icons/diamond.png" },
    { name: "Monthly", price: "$7.99", img: "assets/icons/diamond.png" },
    { name: "Level Up", price: "$3.99", img: "assets/icons/diamond.png" }

];

if (packageGrid) {

    packageGrid.innerHTML = "";

    freefirePackages.forEach(item => {

        packageGrid.innerHTML += `
            <div class="package-card">
                <img src="${item.img}" alt="">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
            </div>
        `;

    });

}

if (freeFireCard) {

    freeFireCard.addEventListener("click", function (e) {

        e.preventDefault();

        packageOverlay.classList.add("active");

    });

}

if (closePanel) {

    closePanel.addEventListener("click", function () {

        packageOverlay.classList.remove("active");

    });

}

if (packageOverlay) {

    packageOverlay.addEventListener("click", function (e) {

        if (e.target === packageOverlay) {

            packageOverlay.classList.remove("active");

        }

    });

    }
        // =========================
// SELECT PACKAGE
// =========================

const payBtn = document.getElementById("pay-btn");
const selectedPackage = document.getElementById("selected-package");
const selectedPrice = document.getElementById("selected-price");

document.addEventListener("click", function (e) {

    const card = e.target.closest(".package-card");

    if (!card) return;

    document.querySelectorAll(".package-card").forEach(item => {
        item.classList.remove("active");
    });

    card.classList.add("active");

    if (selectedPackage) {
        selectedPackage.textContent =
            card.querySelector("h3").textContent;
    }

    if (selectedPrice) {
        selectedPrice.textContent =
            card.querySelector("p").textContent;
    }

    if (payBtn) {
        payBtn.disabled = false;
        payBtn.innerText = "បន្តទៅការទូទាត់";
    }

});

// =========================
// PAYMENT BUTTON
// =========================

if (payBtn) {

    payBtn.addEventListener("click", function () {

        if (payBtn.disabled) return;

        alert("ជំហានបន្ទាប់យើងនឹងទៅ Payment Page");

        // location.href = "payment.html";

    });

        }
    // =========================
// AUTO CHECK PLAYER ID
// =========================

const playerInput = document.getElementById("player-id");
const loading = document.getElementById("loading");
const playerInfo = document.getElementById("player-info");
const playerName = document.getElementById("player-name");
const playerIdShow = document.getElementById("player-id-show");

let checkTimer;

if (playerInput) {

    playerInput.addEventListener("input", function () {

        clearTimeout(checkTimer);

        const playerId = this.value.trim();

        if (playerInfo) {
            playerInfo.style.display = "none";
        }

        if (playerId.length < 5) {

            if (loading) {
                loading.style.display = "none";
            }

            return;

        }

        if (loading) {
            loading.style.display = "flex";
        }

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

                if (loading) {
                    loading.style.display = "none";
                }

                if (!response.ok) {
                    throw new Error(data.message || "Check Failed");
                }

                const nickname =
                    data.nickname ||
                    data.data?.nickname ||
                    data.name ||
                    "Unknown";

                if (playerName) {
                    playerName.textContent = nickname;
                }

                if (playerIdShow) {
                    playerIdShow.textContent = playerId;
                }

                if (playerInfo) {
                    playerInfo.style.display = "flex";
                }

            } catch (err) {

                console.log(err);

                if (loading) {
                    loading.style.display = "none";
                }

                if (playerInfo) {
                    playerInfo.style.display = "none";
                }

            }

        }, 800);

    });

        }
    // =========================
// START APP
// =========================

window.addEventListener("load", function () {

    console.log("✅ E-KENZO Loaded");

    if (banner) {
        showBanner(0);
    }

});
