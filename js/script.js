"use strict";

// Hamburger-menu
const mobileMenutrigger = document.getElementById("mobileMenuTrigger");
const mobileMenu = document.querySelector(".nav-links-container");
const navLinks = document.querySelectorAll(".nav-links li a");

mobileMenutrigger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  mobileMenutrigger.classList.toggle("active");
  mobileMenutrigger.setAttribute(
    "aria-expanded",
    mobileMenu.classList.contains("active")
  );
});

navLinks.forEach((link) => {
  if (link.href === window.location.href) {
    link.setAttribute("aria-current", "page");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    mobileMenu.classList.remove("active");
    mobileMenutrigger.classList.remove("active");
  }
});

// Slider
if (document.querySelector(".carousel")) {
  let nextDom = document.getElementById("next");
  let prevDom = document.getElementById("prev");
  let carouselDom = document.querySelector(".carousel");
  let SliderDom = carouselDom.querySelector(".carousel .list");
  let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
  let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
  let timeDom = document.querySelector(".carousel .time");

  thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
  let timeRunning = 3000;
  let timeAutoNext = 7000;

  nextDom.onclick = function () {
    showSlider("next");
  };

  prevDom.onclick = function () {
    showSlider("prev");
  };

  let runTimeOut;
  let runNextAuto = setTimeout(() => {
    nextDom.click();
  }, timeAutoNext);

  function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
    let thumbnailItemsDom = document.querySelectorAll(
      ".carousel .thumbnail .item"
    );

    if (type === "next") {
      SliderDom.appendChild(SliderItemsDom[0]);
      thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
      carouselDom.classList.add("next");
    } else {
      SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
      thumbnailBorderDom.prepend(
        thumbnailItemsDom[thumbnailItemsDom.length - 1]
      );
      carouselDom.classList.add("prev");
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      carouselDom.classList.remove("next");
      carouselDom.classList.remove("prev");
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);
  }
}