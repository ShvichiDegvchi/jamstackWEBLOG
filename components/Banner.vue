<template>
  <div
    v-if="banner && banner.image"
    class="widget"
  >
    <a
      v-ripple
      :href="`${banner.url}`"
      target="banner"
      rel="noopener"
    >
      <picture v-if="banner.image">
        <source
          type="image/webp"
          :srcset="`${banner.image.url}?fm=webp`"
        >
        <img
          :src="banner.image.url"
          :alt="banner.alt"
          width="640"
          height="396"
          class="lazyload"
          loading="lazy"
        >
      </picture>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: Object,
      required: false,
      default: undefined,
    },
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.widget {
  padding: 0 0 #{(24 / 10)}rem;
}

a {
  overflow: hidden;
  display: block;
  margin: 0 auto;
  width: fit-content;
  border-radius: #{(3 / 10)}rem;
  box-shadow: 0 #{(1 / 10)}rem #{(3 / 10)}rem rgba(#000, .12), 0 #{(1 / 10)}rem #{(2 / 10)}rem rgba(#000, .24);
  touch-action: manipulation;
}
</style>
