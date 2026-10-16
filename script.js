// ===================================
// E-KENZO GAME TOP UP
// script.js
// PART 1 : MENU
// ===================================

// Open Menu
function openMenu() {

    const menu = document.getElementById("side-menu");

    if (menu) {
        menu.classList.add("active");
    }

}

// Close Menu
function closeMenu() {

    const menu = document.getElementById("side-menu");

    if (menu) {
        menu.classList.remove("active");
    }

}

// Close menu when click outside
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
// ===================================
// PART 2 : BANNER SLIDER
// ===================================

const banners = [
    "assets/banners/banner1.png",
    "assets/banners/banner2.png",
    "assets/banners/banner3.png"
];

let currentBanner = 0;

const banner = document.getElementById("banner");
const dots = document.querySelectorAll(".dot");

function showBanner(index){

    if(!banner) return;

    banner.style.opacity = "0";

    setTimeout(()=>{

        banner.src = banners[index];

        dots.forEach((dot,i)=>{
            dot.classList.toggle("active", i===index);
        });

        banner.style.opacity = "1";

    },300);

}

function nextBanner(){

    currentBanner++;

    if(currentBanner >= banners.length){
        currentBanner = 0;
    }

    showBanner(currentBanner);

}

if(banner){

    showBanner(0);

    setInterval(nextBanner,3000);

}

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentBanner = index;

        showBanner(index);

    });

});

// ===================================
// PART 3 : FREE FIRE PACKAGE PANEL
// ===================================

const packageOverlay = document.getElementById("packageOverlay");
const packageGrid = document.getElementById("packageGrid");
const freeFireCard = document.getElementById("freefire-card");
const closePanel = document.getElementById("closePanel");

const freefirePackages = [

    {name:"25 Diamonds",price:"$0.25",img:"assets/icons/diamond.png"},
    {name:"50 Diamonds",price:"$0.45",img:"assets/icons/diamond.png"},
    {name:"100 Diamonds",price:"$0.90",img:"assets/icons/diamond.png"},
    {name:"210 Diamonds",price:"$1.80",img:"assets/icons/diamond.png"},

    {name:"310 Diamonds",price:"$2.70",img:"assets/icons/diamond.png"},
    {name:"520 Diamonds",price:"$4.50",img:"assets/icons/diamond.png"},
    {name:"1060 Diamonds",price:"$8.90",img:"assets/icons/diamond.png"},
    {name:"2180 Diamonds",price:"$17.90",img:"assets/icons/diamond.png"},

    {name:"5600 Diamonds",price:"$44.90",img:"assets/icons/diamond.png"},
    {name:"Weekly",price:"$1.89",img:"assets/icons/diamond.png"},
    {name:"Monthly",price:"$7.99",img:"assets/icons/diamond.png"},
    {name:"Level Up",price:"$3.99",img:"assets/icons/diamond.png"}

];

if(packageGrid){

    packageGrid.innerHTML = "";

    freefirePackages.forEach(item=>{

        packageGrid.innerHTML += `
        <div class="package-card">
            <img src="${item.img}" alt="">
            <h3>${item.name}</h3>
            <p>${item.price}</p>
        </div>
        `;

    });

}

if(freeFireCard){

    freeFireCard.addEventListener("click",(e)=>{

        e.preventDefault();

        packageOverlay.classList.add("active");

    });

}

if(closePanel){

    closePanel.addEventListener("click",()=>{

        packageOverlay.classList.remove("active");

    });

}

if(packageOverlay){

    packageOverlay.addEventListener("click",(e)=>{

        if(e.target===packageOverlay){

            packageOverlay.classList.remove("active");

        }

    });

                        }
// ===================================
// PART 4 : PACKAGE SELECT
// ===================================

document.addEventListener("click",(e)=>{

    const card = e.target.closest(".package-card");

    if(!card) return;

    document.querySelectorAll(".package-card").forEach(item=>{

        item.classList.remove("active");

    });

    card.classList.add("active");

    const playerSection = document.getElementById("playerSection");

    if(playerSection){

        playerSection.style.display = "block";

    }

});

// ===================================
// PART 6 : CONTINUE BUTTON
// ===================================

const continueBtn = document.getElementById("continueBtn");

if (continueBtn) {

    continueBtn.addEventListener("click", function () {

        const playerId = document.getElementById("player-id").value.trim();

        if (playerId === "") {

            alert("Please enter Player ID");

            return;

        }

        alert("Player ID : " + playerId);

        // ជំហានបន្ទាប់យើងនឹងទៅ Payment Page

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
                    "❌ id មិនត្រឹមត្រូវ";

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
// ===================================
// PART 7 : START APP
// ===================================

window.addEventListener("load", () => {

    console.log("✅ E-KENZO Loaded");

    if (banner) {
        showBanner(0);
    }

});
// ===================================
// PART 8 : TELEGRAM ONLINE
// ===================================

const onlineDot = document.querySelector(".online-dot");

if (onlineDot) {

    setInterval(() => {

        onlineDot.classList.toggle("pulse");

    }, 800);

}
// ===================================
// CHECK PLAYER BUTTON
// ===================================

const checkPlayerBtn = document.getElementById("checkPlayerBtn");

if (checkPlayerBtn) {

    checkPlayerBtn.addEventListener("click", async () => {

        const playerId = document.getElementById("player-id").value.trim();

        if (playerId === "") {
            alert("Please enter Player ID");
            return;
        }

        loading.style.display = "block";
        playerInfo.style.display = "none";

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
                throw new Error(data.message || "Check Failed");
            }

            const nickname =
                data.nickname ||
                data.data?.nickname ||
                data.name ||
                "Unknown";

            playerName.textContent = nickname;
            playerIdShow.textContent = playerId;

            playerInfo.style.display = "block";
            const packageSection = document.getElementById("packageSection");

if (packageSection) {

    packageSection.style.display = "block";

    packageSection.scrollIntoView({
        behavior: "smooth"
    });

}

        } catch (err) {

            loading.style.display = "none";
            alert("Player ID not found");

        }

    });

}
// ===================================
// PACKAGE SELECT + AUTO SCROLL
// ===================================

document.querySelectorAll(".package-card").forEach(card => {

    card.addEventListener("click", () => {

        document.querySelectorAll(".package-card").forEach(c => {
            c.classList.remove("active");
        });

        card.classList.add("active");

        document.getElementById("paymentSection")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});
document.querySelectorAll(".package-card").forEach(card=>{
    card.addEventListener("click",()=>{
        document.querySelectorAll(".package-card")
            .forEach(c=>c.classList.remove("selected"));

        card.classList.add("selected");
    });
});
const payNowBtn = document.getElementById("payNow");
const khqrModal = document.getElementById("khqrModal");
const closeKhqr = document.getElementById("closeKhqr");
let paymentTimer = null;
let paymentSeconds = 120;
function startPaymentTimer() {
    clearInterval(paymentTimer);

    paymentSeconds = 120;

    const countdown = document.getElementById("paymentCountdown");
    const expired = document.getElementById("paymentExpired");

    if (expired) expired.style.display = "none";

    function updateCountdown() {
        const minutes = Math.floor(paymentSeconds / 60);
        const seconds = paymentSeconds % 60;

        if (countdown) {
            countdown.textContent =
                String(minutes).padStart(2, "0") + ":" +
                String(seconds).padStart(2, "0");
        }

        if (paymentSeconds <= 0) {
            clearInterval(paymentTimer);
            paymentTimer = null;

            if (expired) expired.style.display = "block";
            return;
        }

        paymentSeconds--;
    }

    updateCountdown();
    paymentTimer = setInterval(updateCountdown, 1000);
}
payNowBtn.addEventListener("click", function () {

    const payment = document.querySelector(
        'input[name="payment"]:checked'
    ).value;

    if (payment === "aba") {

        document.getElementById("khqrImage").src =
            "assets/icons/aba-qr.jpg";

        khqrModal.classList.add("active");
        startPaymentTimer();

    } else if (payment === "acleda") {

        document.getElementById("khqrImage").src =
            "assets/icons/acleda-qr.jpg";

        khqrModal.classList.add("active");
        startPaymentTimer();

    } else if (payment === "khqr") {

        document.getElementById("khqrImage").src =
            "assets/icons/khqr-qr.jpg";

        khqrModal.classList.add("active");
startPaymentTimer();
    }

});

closeKhqr.addEventListener("click", function () {
    khqrModal.classList.remove("active");
    clearInterval(paymentTimer);
    paymentTimer = null;
});

khqrModal.addEventListener("click", function (e) {
    if (e.target === khqrModal) {
        khqrModal.classList.remove("active");
        clearInterval(paymentTimer);
        paymentTimer = null;
    }
});

