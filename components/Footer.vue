<template>
  <div class="site-footer">
    <footer class="footer" role="contentinfo">
      <small>©<span itemprop="copyrightHolder">WEB屋のあれこれ。</span></small>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.site-footer {
  position: relative;
  z-index: 2;
  padding: #{(8 / 10)}rem 0;
  background-color: #cfd8dc;
}

small {
  display: inherit;
  margin: 0 auto;
  width: fit-content;
  font-size: #{(12 / 10)}rem;
}
</style>
