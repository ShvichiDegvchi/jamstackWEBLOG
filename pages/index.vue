<template>
  <div class="page-wrapper">
    <Header />

    <div class="layout-grid">
      <div>
        <main
          itemprop="mainContentOfPage"
          itemscope
          itemtype="http://schema.org/WebPageElement"
        >
          <div
            v-if="!contents.length"
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
                        :data-srcset="content.ogimage.url + '?w=640&fm=webp'"
                        type="image/webp"
                      >
                      <img
                        :data-src="content.ogimage.url + '?w=640'"
                        :alt="content.title"
                        width="640"
                        height="396"
                        class="lazyload"
                        loading="lazy"
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

    <Breadcrumb :category="selectedCategory" />
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
export default {
  async asyncData({ params, payload, $config }) {
    const page = params.id || '1';
    const categoryId = params.categoryId;
    const limit = 6;
    const popularArticles = payload !== undefined && payload.popularArticles !== undefined ?
        payload.popularArticles :
        (await axios.get(`https://${$config.serviceId}.microcms.io/api/v1/popular-articles`, {
          headers: {
            'X-API-KEY': $config.apiKey,
          },
        })).data.articles;

    const banner = payload !== undefined ?
        payload.banner :
        (await axios.get(`https://${$config.serviceId}.microcms.io/api/v1/banner`, {
          headers: {
            'X-API-KEY': $config.apiKey,
          },
        })).data;

    const {
      data,
    } = await axios.get(
        `https://${$config.serviceId}.microcms.io/api/v1/blog?limit=${limit}${categoryId === undefined ? '' : `&filters=category[equals]${categoryId}`}&offset=${(page - 1) * limit}`, {
          headers: {
            'X-API-KEY': $config.apiKey,
          },
        });

    const categories = await axios.get(
        `https://${$config.serviceId}.microcms.io/api/v1/categories?limit=100`, {
          headers: {
            'X-API-KEY': $config.apiKey,
          },
        });

    const selectedCategory = categoryId !== undefined ? categories.data.contents.find((content) => content.id === categoryId) : undefined;

    return {
      ...data,
      categories: categories.data.contents,
      selectedCategory,
      popularArticles,
      banner,
      page,
      pagination: [...Array(Math.ceil(data.totalCount / limit)).keys()],
    };
  },
  data() {
    return {
      contents: this.contents || [],
      totalCount: this.totalCount || 0,
      pagination: this.pagination || [],
      loading: true,
    };
  },
  head() {
    return {
      titleTemplate: null,
      title: 'WEB屋のあれこれ。',
    };
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
</style>
