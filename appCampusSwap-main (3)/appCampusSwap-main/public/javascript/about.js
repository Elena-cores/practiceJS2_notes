document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const images = Array.from(track.children);
    const nextButton = document.querySelector(".carousel-button.right");
    const prevButton = document.querySelector(".carousel-button.left");
    const imageWidth = images[0].getBoundingClientRect().width;

    // Colocar imágenes una al lado de otra
    images.forEach((image, index) => {
        image.style.left = imageWidth * index + "px";
    });

    let currentIndex = 0;

    const moveToImage = (index) => {
        track.style.transform = `translateX(-${imageWidth * index}px)`;
        currentIndex = index;
    };

    nextButton.addEventListener("click", () => {
        const nextIndex = (currentIndex + 1) % images.length;
        moveToImage(nextIndex);
    });

    prevButton.addEventListener("click", () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        moveToImage(prevIndex);
    });
});
