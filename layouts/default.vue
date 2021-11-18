<template>
  <div class="layouts--default">
    <nuxt />
  </div>
</template>

<style lang="scss">
html {
  font-display: swap;
  font-family: "Roboto", "M PLUS 1p", sans-serif;
  font-feature-settings: "pkna";
  line-height: 1.75;
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;

  @media (min-width: 641px) {
    font-size: .625rem !important; // 10px相当
  }

  @media (max-width: 640px) and (min-width: 321px) {
    font-size: calc(.625rem + ((1vw - 3.21px) * 3.1348)) !important; // 640px幅 20px → 321px幅 10px 相当
  }

  @media (max-width: 320px) {
    font-size: .625rem !important; // 10px相当
  }
}

body {
  background-color: #f5f5f5;
  color: #000;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (min-width: 641px) {
    font-size: #{(16 / 10)}rem;
  }

  @media (max-width: 640px) {
    font-size: #{(14 / 10)}rem;
  }
}

img {
  display: block;
  max-width: 100%;
  height: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  -moz-touch-callout: none;
  -ms-touch-callout: none;
  -webkit-user-drag: none;
  user-drag: none;
  aspect-ratio: attr(width) / attr(height);
}

a {
  &:link { color: #00a993; }
}
</style>
