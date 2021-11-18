<template>
  <div class="site-header">
    <header
      class="header"
      role="banner"
    >
      <h1>
        <NuxtLink
          :to="`/`"
          rel="index"
        >
          <img
            alt="WEB屋のあれこれ。"
            width="240"
            height="26"
            src="/images/logo.svg"
            loading="lazy"
          >
        </NuxtLink>
      </h1>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.site-header {
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: #fff;
  box-shadow: 0 #{(3 / 10)}rem #{(6 / 10)}rem rgba(#000, .16), 0 #{(3 / 10)}rem #{(6 / 10)}rem rgba(#000, .23);
}

header {

}

h1 {
  margin: 0 auto;
  width: fit-content;

  a {
    display: inherit;
    padding: #{(10 / 10)}rem 0;

    img {
      backface-visibility: hidden;

      @media (min-width: 641px) {
      }

      @media (max-width: 640px) {
        width: #{(107 / 10)}rem;
      }
    }
  }
}
</style>
