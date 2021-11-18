<template>
  <div class="widget">
    <header>
      <h3>注目の記事</h3>
    </header>

    <div
      role="list"
    >
      <div
        v-for="content in contents"
        :key="content.id"
        role="listitem"
      >
        <NuxtLink
          v-ripple
          :to="`/${content.id}`"
          rel="bookmark"
        >
          <div class="thumb">
            <picture v-if="content.ogimage">
              <source
                type="image/webp"
                :data-srcset="content.ogimage.url + '?w=577&fm=webp'"
              >
              <img
                :data-src="content.ogimage.url + '?w=577&q=100'"
                :alt="content.title"
                class="image lazyload"
                loading="lazy"
              >
            </picture>
          </div>
          <div class="txt">
            <h4 v-html="content.title" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.widget {
  padding: 0 0 #{(24 / 10)}rem;

  &:last-child,
  &:only-child {
    padding: 0;
  }
}

header {
  padding: #{(8 / 10)}rem #{(16 / 10)}rem;
  border-radius: #{(3 / 10)}rem #{(3 / 10)}rem 0 0;
  background-color: #cfd8dc;
}

h3 {
  margin: 0;
  font-size: #{(18 / 10)}rem;
}

[role="list"] {
  margin-top: #{(8 / 10)}rem;
}

[role="listitem"] {
  a {
    overflow: hidden;
    color: currentColor;
    background-color: #fafafa;

    display: block;
    border-radius: #{(3 / 10)}rem;
    box-shadow: 0 #{(1 / 10)}rem #{(3 / 10)}rem rgba(#000, .12), 0 #{(1 / 10)}rem #{(2 / 10)}rem rgba(#000, .24);


    @media (max-width: 1024px) and (min-width: 641px) {
      display: flex;
      align-content: stretch;
    }


    &:hover {
      background-color: #fff;
    }

    .thumb {
      @media (max-width: 1024px) and (min-width: 641px) {
        flex-shrink: 0;
        flex-basis: #{(176 / 10)}rem;
      }

      img {
        backface-visibility: hidden;
      }
    }

    .txt {
      padding: #{(12 / 10)}rem;

      @media (max-width: 1024px) and (min-width: 641px) {
        flex-grow: 1;
        flex-basis: auto;

        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      h4 {
        margin: 0;
        font-size: #{(16 / 10)}rem;
      }
    }

    span {
      display: block;
      font-size: #{(14 / 10)}rem;

      ::v-deep svg {
        display: inherit;
        fill: #00c9b9;
      }

      + span {
        margin-left: #{(8 / 10)}rem;
      }
    }
  }

  + [role="listitem"] {
    margin-top: #{(8 / 10)}rem;
  }
}

</style>
