<template>
  <div class="wrapper">
    <Header />

    <div class="layout-grid">
      <div>
        <main>
          <div class="search-bar">
            <input
              v-model="q"
              type="search"
              placeholder="キーワードを入力してください。"
              @keyup.enter="(e) => search(e.target.value)"
              @keypress="setSearchable"
            >
          </div>
          <div
            v-if="loading === true"
            class="spinner"
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 66 66"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="検索中"
            >
              <circle
                class="path"
                fill="none"
                stroke-width="6"
                stroke-linecap="round"
                cx="33"
                cy="33"
                r="30"
              />
            </svg>
          </div>
          <div v-else>
            <div
              v-show="loading === false && contents.length === 0"
              class="content-status"
            >
              <img
                alt="記事が見つかりません。"
                width="577"
                height="73"
                src="/images/cannot-find-the-article.svg"
                loading="lazy"
              >
            </div>
            <div
              v-if="contents.length"
              class="article-list"
            >
              <div
                class="article-list__container"
                role="list"
              >
                <div
                  v-for="content in contents"
                  :key="content.id"
                  class="article-list__item"
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
                          :data-srcset="content.ogimage.url + '?w=640&fm=webp'"
                        >
                        <img
                          :data-src="content.ogimage.url + '?w=640'"
                          class="lazyload"
                          alt
                        >
                      </picture>
                    </div>
                    <div class="txt">
                      <h2 v-html="content.title" />
                      <Meta
                        :category="content.category"
                        :created-at="content.publishedAt || content.createdAt"
                        :author-img="content.writer !== null ? content.writer.image.url : ''"
                        :author-name="content.writer !== null ? content.writer.name : ''"
                        :description="content.description ? content.description : null"
                      />
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>

            <div
              v-if="contents.length"
              class="pagination"
            >
              <div
                class="pagination__container"
                role="list"
              >
                <div
                  v-for="p in $data.pagination"
                  :key="p"
                  class="pagination__item"
                  role="listitem"
                >
                  <NuxtLink
                    v-ripple
                    :aria-current="$data.page === `${p + 1}` ? 'page' : null || $route.fullPath === '/'"
                    :to="`/${selectedCategory !== undefined ? `category/${selectedCategory.id}/` : ''}page/${p + 1}`"
                  >
                    <span
                      v-html="p + 1"
                    />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </main>
        <aside role="complementary">
          <Banner
            id="list"
            :banner="banner"
          />
          <Search />
          <Categories :categories="categories" />
          <PopularArticles :contents="popularArticles" />
        </aside>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData({ payload, $config }) {
    const popularArticles = payload !== undefined && payload.popularArticles !== undefined ?
      payload.popularArticles :
      (await axios.get(
          `https://${$config.serviceId}.microcms.io/api/v1/popular-articles`, {
            headers: {
              'X-API-KEY': $config.apiKey,
            },
          })).data.articles;

    const banner = payload !== undefined ?
      payload.banner :
      (await axios.get(
          `https://${$config.serviceId}.microcms.io/api/v1/banner`, {
            headers: {
              'X-API-KEY': $config.apiKey,
            },
          })).data;

    const categories = await axios.get(
        `https://${$config.serviceId}.microcms.io/api/v1/categories?limit=100`, {
          headers: {
            'X-API-KEY': $config.apiKey,
          },
        });

    return {
      popularArticles,
      banner,
      categories: categories.data.contents,
    };
  },
  data() {
    return {
      searchable: true,
      contents: this.contents || [],
      totalCount: this.totalCount || 0,
      categories: this.categories || [],
      pagination: this.pagination || [],
      loading: true,
      q: this.$route.query.q,
    };
  },
  head() {
    return {
      titleTemplate: null,
      title: 'WEB屋のあれこれ。',
    };
  },
  created() {
    const query = this.$route.query;
    this.search(query.q);
  },
  methods: {
    setSearchable() {
      this.searchable = true;
    },
    async search(q = '') {
      if (!q.trim() || !this.searchable) {
        return;
      }

      this.loadingStart();

      const { data, error } = await axios.get(`/.netlify/functions/search?q=${q}`)
          .catch((error) => ({
            error,
          }));

      this.loadingFinish();

      if (error) {
        return;
      }

      this.contents = data.contents;
      this.totalCount = data.totalCount;
      this.searchable = false;
    },
    loadingStart() {
      this.loading = true;
    },
    loadingFinish() {
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.content-status {
  @media (min-width: 641px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  @media (max-width: 1024px) and (min-width: 641px) {
    margin-bottom: #{(32 / 10)}rem;
  }

  @media (max-width: 640px) {
    padding: #{(12 / 10)}rem;
  }

  img {
    backface-visibility: hidden;
  }
}

.search-bar {
  @media (min-width: 641px) {
    margin-bottom: #{(24 / 10)}rem;
  }

  @media (max-width: 640px) {
    padding: #{(12 / 10)}rem;
  }

  [type="search"] {
    padding-left: #{(40 / 10)}rem;
    width: 100%;
    height: #{(40 / 10)}rem;
    border: 1px solid #cfd8dc;
    border-radius: #{(3 / 10)}rem;
    background: url('/images/icn-search.svg') no-repeat #{(10 / 10)}rem 50%, #eceff1;
    background-size: auto 56%;
    font: inherit;
    font-weight: 300;
    box-shadow: none;
    box-sizing: inherit;
    -webkit-appearance: none;
    transition: box-shadow .24s ease, background-color .25s cubic-bezier(.175, .885, .32, 1.275);

    &:hover {
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, .1) inset;
    }

    &:focus {
      outline: none;
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, .1) inset;
    }
  }
}

.spinner {
  margin: #{(40 / 10)}rem auto;
  width: fit-content;

  svg {
    animation: rotator 1.4s linear infinite;
  }

  circle {
    stroke-dasharray: 187;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
  }
}

.layout-grid {
  @media (min-width: 641px) {
    padding: #{(24 / 10)}rem #{(16 / 10)}rem 0;
  }

  > div {
    margin: 0 auto;
    max-width: 1280px;

    @media (min-width: 1025px) {
      display: grid;
      grid-template-columns: 1fr #{(300 / 10)}rem;
      grid-template-rows: 1fr;
      gap: 0px #{(16 / 10)}rem;
      grid-template-areas: ". .";
    }
  }

  main {
    @media (min-width: 1025px) {
      max-width: #{(960 / 10)}rem;
    }
  }

  aside {
    @media (min-width: 1025px) {
      padding-bottom: #{(32 / 10)}rem;
      max-width: #{(300 / 10)}rem;
    }

    @media (max-width: 1024px) and (min-width: 641px) {
      padding-bottom: #{(16 / 10)}rem;
    }

    @media (max-width: 640px) {
      padding: #{(16 / 10)}rem #{(12 / 10)}rem;
      border-top: 1px solid #cfd8dc;
    }
  }
}

.article-list {
  $this: &;

  &__container {}
  &__item {

    + #{$this}__item {
      @media (min-width: 641px) {
        margin-top: #{(8 / 10)}rem;
      }
    }
  }
}

[rel="bookmark"] {
  overflow: hidden;
  background-color: #fafafa;
  border-radius: #{(3 / 10)}rem;
  color: currentColor;

  @media (min-width: 641px) {
    display: flex;
    box-shadow: 0 #{(1 / 10)}rem #{(3 / 10)}rem rgba(#000, .12), 0 #{(1 / 10)}rem #{(2 / 10)}rem rgba(#000, .24);
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

    @media (max-width: 640px) {
      margin: 0 auto;
      max-width: #{(288 / 10)}rem;
      background-color: #fff;
      border-radius: #{(3 / 10)}rem;
      box-shadow: 0 #{(1 / 10)}rem #{(3 / 10)}rem rgba(#000, .12), 0 #{(1 / 10)}rem #{(2 / 10)}rem rgba(#000, .24);
      transform: translateY(-1.6rem);
    }

    h2 {
      margin: 0;
    }
  }
}

.pagination {
  $this: &;

  @media (min-width: 641px) {
    padding: #{(36 / 10)}rem 0;
  }

  @media (max-width: 640px) {
    padding: 0 0 #{(16 / 10)}rem;
  }

  &__container {
    text-align: center;
  }

  &__item {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #eceff1;
      box-shadow: 0 #{(1 / 10)}rem #{(3 / 10)}rem rgba(#000, .12), 0 #{(1 / 10)}rem #{(2 / 10)}rem rgba(#000, .24);
      color: currentColor;

      @media (min-width: 641px) {
        width: #{(40 / 10)}rem;
        height: #{(40 / 10)}rem;
      }

      @media (max-width: 640px) {
        width: #{(30 / 10)}rem;
        height: #{(30 / 10)}rem;
      }

      &:hover {
        background-color: #00a993;
        color: #fff;
        text-decoration: none;
      }

      &[aria-current="page"] {
        background-color: #00a993;
        color: #fff;
        pointer-events: none;
      }

      span {}
    }

    + #{$this}__item {
      margin-left: #{(8 / 10)}rem;
    }
  }
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

@keyframes colors {
  0% {
    stroke: red;
  }
  14.285714286% {
    stroke: orange;
  }
  28.571428572% {
    stroke: yellow;
  }
  42.857142858% {
    stroke: #00c9b9;
  }
  57.142857144% {
    stroke: blue;
  }
  71.42857143% {
    stroke: indigo;
  }
  100% {
    stroke: violet;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    -webkit-transform: rotate(450deg);
            transform: rotate(450deg);
  }
}
</style>
