"use strict";

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.contains("hidden");

  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("flex");

  menuToggle.setAttribute("aria-expanded", String(isHidden));
});

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.remove("hidden");
  } else {
    backToTop.classList.add("hidden");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

("use strict");

const TIMER_DURATION = 5 * 60;

const hoursElements = document.querySelectorAll('[data-timer="hours"]');

const minutesElements = document.querySelectorAll('[data-timer="minutes"]');

const secondsElements = document.querySelectorAll('[data-timer="seconds"]');

let time = TIMER_DURATION;

function updateTimer() {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  hoursElements.forEach((element) => {
    element.textContent = String(hours).padStart(2, "0");
  });

  minutesElements.forEach((element) => {
    element.textContent = String(minutes).padStart(2, "0");
  });

  secondsElements.forEach((element) => {
    element.textContent = String(seconds).padStart(2, "0");
  });

  if (time === 0) {
    clearInterval(timerInterval);
    return;
  }

  time--;
}

updateTimer();

const timerInterval = setInterval(updateTimer, 1000);

async function fetchData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/mmhz23/mft-final/main/public/assets/data/data.json",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    console.log("Collections:", data.collections);
    console.log("Creators:", data.creators);
    console.log("Categories:", data.categories);
    console.log("NFTs:", data.nfts);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

async function renderCreators() {
  const container = document.getElementById("creators-container");

  if (!container) return;

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/mmhz23/mft-final/main/public/assets/data/data.json",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data.json");
    }

    const data = await response.json();

    const creators = data.creators;

    container.replaceChildren();

    creators.forEach((creator, index) => {
      const card = document.createElement("div");

      card.className =
        "relative grid w-full grid-cols-[1fr_2fr] items-center rounded-2xl bg-[#3B3B3B] px-6 py-4 lg:h-67  lg:grid-cols-1 lg:justify-items-center";

      if (index >= 5) {
        card.classList.add("hidden", "lg:grid");
      }

      const imageWrapper = document.createElement("div");

      imageWrapper.className = "row-span-2";

      const image = document.createElement("img");

      image.src = creator.image;
      image.alt = creator.name;

      image.className = "h-15 w-15 rounded-full object-cover lg:h-30 lg:w-30";

      const rank = document.createElement("div");

      rank.className =
        "absolute left-4.5 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#2B2B2B] text-[#858584] lg:top-4.5";

      rank.textContent = index + 1;

      imageWrapper.append(image, rank);

      const name = document.createElement("span");

      name.className = "text-xl font-semibold";
      name.textContent = creator.name;

      const salesWrapper = document.createElement("div");

      salesWrapper.className = "flex gap-2";

      const salesLabel = document.createElement("span");

      salesLabel.className = "text-[#858584]";
      salesLabel.textContent = "Total Sales:";

      const salesValue = document.createElement("span");

      salesValue.textContent = `${creator.total_sales} ETH`;

      salesWrapper.append(salesLabel, salesValue);

      card.append(imageWrapper, name, salesWrapper);

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error rendering creators:", error);

    container.textContent = "Unable to load creators.";
  }
}

renderCreators();

async function renderCategories() {
  const container = document.getElementById("categories-container");

  if (!container) return;

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/mmhz23/mft-final/main/public/assets/data/data.json",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data.json");
    }

    const data = await response.json();

    container.replaceChildren();

    data.categories.forEach((category) => {
      const card = document.createElement("div");
      card.className = "overflow-hidden rounded-2xl bg-[#3B3B3B]";

      const imageWrapper = document.createElement("div");
      imageWrapper.className = "relative";

      const image = document.createElement("img");
      image.src = category.image;
      image.alt = category.name;
      image.className = "h-auto w-full object-cover blur-sm";

      const icon = document.createElement("img");
      icon.src = category.icon;
      icon.alt = "";
      icon.className =
        "absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2";

      imageWrapper.append(image, icon);

      const name = document.createElement("h3");
      name.className = "p-5 text-base font-semibold";
      name.textContent = category.name;

      card.append(imageWrapper, name);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading categories:", error);
    container.textContent = "Unable to load categories.";
  }
}

renderCategories();

async function renderNFTs() {
  const container = document.getElementById("nfts-container");

  if (!container) return;

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/mmhz23/mft-final/main/public/assets/data/data.json",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data.json");
    }

    const data = await response.json();

    const nfts = data.nfts;
    const creators = data.creators;

    container.replaceChildren();

    nfts.forEach((nft, index) => {
      const creator = creators.find((item) => item.id === nft.creator_id);

      const card = document.createElement("div");

      card.className = "flex flex-col overflow-hidden rounded-2xl";

      // Hide the third card on medium screens
      if (index === 2) {
        card.classList.add("md:hidden", "lg:flex");
      }

      // NFT image
      const image = document.createElement("img");

      image.src = nft.image;
      image.alt = nft.name;

      image.className = "h-65.5 w-full object-cover lg:h-74";

      // Card information
      const information = document.createElement("div");

      information.className = "flex flex-col gap-6 bg-[#3B3B3B] p-5";

      // NFT name and creator
      const details = document.createElement("div");

      details.className = "flex flex-col gap-2";

      const name = document.createElement("span");

      name.className = "text-2xl font-semibold";
      name.textContent = nft.name;

      const creatorInfo = document.createElement("div");

      creatorInfo.className = "flex items-center gap-3";

      if (creator) {
        const creatorImage = document.createElement("img");

        creatorImage.src = creator.image;
        creatorImage.alt = creator.name;

        creatorImage.className = "h-6 w-6 rounded-full object-cover";

        const creatorName = document.createElement("span");

        creatorName.textContent = creator.name;

        creatorInfo.append(creatorImage, creatorName);
      }

      details.append(name, creatorInfo);

      // Price and highest bid
      const prices = document.createElement("div");

      prices.className = "grid grid-cols-2 gap-2 text-xs";

      const priceLabel = document.createElement("span");

      priceLabel.className = "text-[#858584]";
      priceLabel.textContent = "Price";

      const bidLabel = document.createElement("span");

      bidLabel.className = "justify-self-end text-[#858584]";
      bidLabel.textContent = "Highest Bid";

      const priceValue = document.createElement("span");

      priceValue.textContent = `${nft.price.amount} ${nft.price.currency}`;

      const bidValue = document.createElement("span");

      bidValue.className = "justify-self-end";

      bidValue.textContent = `${nft.highest_bid.amount} ${nft.highest_bid.currency}`;

      prices.append(priceLabel, bidLabel, priceValue, bidValue);

      information.append(details, prices);

      card.append(image, information);

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error rendering NFTs:", error);

    container.textContent = "Unable to load NFTs.";
  }
}

renderNFTs();
