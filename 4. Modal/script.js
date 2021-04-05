"use strict";
// initialize all classes in values
const btnShowModal = document.querySelectorAll(".show-modal");
const btnCloseModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const hidden = document.querySelector(".hidden");
const modal = document.querySelector(".modal");

// function to show the modal
const showModal = function () {
  //   console.log("I am clicked");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// function to close the modal
const closeModal = function () {
  //   console.log("I am clicked");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// To access all button of similar class
for (let i = 0; i < btnShowModal.length; i++) {
  console.log(btnShowModal[i]);
  btnShowModal[i].addEventListener("click", showModal);
}

// it will close modal when we click close button
btnCloseModal.addEventListener("click", closeModal);
// it will close modal when we click outside the modal
overlay.addEventListener("click", closeModal);

// Use escape key for close the modal
document.addEventListener("keydown", function (e) {
  //   console.log(e);

  if (e.key == "Escape" && !modal.classList.contains("hidden")) {
    // console.log("Escape pressed");
    closeModal();
  }
});
