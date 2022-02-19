// Initialization of function to avoid issues with JEST tests

let heroImages = () => ({
  default: "",
});

try {
  heroImages = require.context("../assets", true);
} catch (error) {}
export const loadImage = (image) => heroImages(`./${image}.jpg`).default;
