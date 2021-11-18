<template>
  <div class="related-articles">
    <header>
      <h2
        class="pageTitle"
        v-html="`関連記事`"
      />
    </header>

    <div
      class="related-articles__container"
      role="list"
    >
      <div
        v-for="blog in blogs"
        :key="blog.id"
        class="related-articles__item"
        role="listitem"
      >
        <NuxtLink
          v-ripple
          :to="`/${blog.id}`"
          rel="bookmark"
        >
          <div class="thumb">
            <picture>
              <source
                type="image/webp"
                :data-srcset="blog.ogimage.url + '?w=592&fm=webp'"
              >
              <img
                :data-src="blog.ogimage.url + '?w=592'"
                :alt="blog.title"
                width="592"
                height="366"
                class="img lazyload"
                loading="lazy"
              >
            </picture>
          </div>

          <div class="txt">
            <h3 v-html="blog.title" />
            <Meta
              :category="blog.category"
              :created-at="blog.createdAt"
              :author-name="blog.writer !== null ? blog.writer.name : ''"
              :author-img="blog.writer.image.url"
              :description="blog.description ? blog.description : null"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blogs: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.related-articles {
  margin-top: #{(16 / 10)}rem;

  &__container {}
  &__item {
    margin-top: #{(8 / 10)}rem;
  }
}

header {
  padding: #{(8 / 10)}rem #{(16 / 10)}rem;
  border-radius: #{(3 / 10)}rem #{(3 / 10)}rem 0 0;
  background-color: #cfd8dc;
}

h2 {
  margin: 0;
  font-size: #{(18 / 10)}rem;
}

[rel="bookmark"] {
  overflow: hidden;
  background-color: #fafafa;
  border-radius: #{(3 / 10)}rem;
  box-shadow: 0 #{(1 / 10)}rem #{(3 / 10)}rem rgba(#000, .12), 0 #{(1 / 10)}rem #{(2 / 10)}rem rgba(#000, .24);
  color: currentColor;

  @media (min-width: 641px) {
    display: flex;
  }

  @media (max-width: 640px) {
    display: block;
  }

  &:hover {
    background-color: #fff;
    text-decoration: none;

    .txt {
      h2 {
        text-decoration: underline;
      }
    }
  }

  .thumb {
    @media (min-width: 641px) {
      width: 50%;
    }

    img {
      backface-visibility: hidden;

      @media (min-width: 641px) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .txt {
    padding: #{(16 / 10)}rem;

    @media (min-width: 641px) {
      width: 50%;
    }

    h3 {
      margin: 0;
    }
  }
}
</style>
