<template>
  <div class="wrapper">
    <Header />
    <div class="layout-grid">
      <div>
        <main
          itemprop="mainContentOfPage"
          itemscope
          itemtype="http://schema.org/WebPageElement"
        >
          <article
            itemscope
            itemtype="https://schema.org/BlogPosting"
          >
            <meta
              itemprop="mainEntityOfPage"
              :content="`https://webcreatorsstruggle.com/${id}`"
            >
            <header>
              <figure
                itemprop="image"
                itemscope
                itemtype="https://schema.org/ImageObject"
              >
                <picture v-if="ogimage">
                  <source
                    media="(min-width: 1025px)"
                    type="image/webp"
                    :srcset="`${ogimage.url}?w=708&fm=webp, ${ogimage.url}?w=1416&fm=webp 2x`"
                  >
                  <source
                    media="(min-width: 641px)"
                    type="image/webp"
                    :srcset="`${ogimage.url}?fit=crop&w=992&h=411&fm=webp, ${ogimage.url}?fit=crop&w=1984&h=822&fm=webp 2x`"
                  >
                  <source
                    media="(max-width: 640px)"
                    type="image/webp"
                    :srcset="`${ogimage.url}?w=640&fm=webp, ${ogimage.url}?w=1280&fm=webp 2x, ${ogimage.url}?w=1920&fm=webp 3x`"
                  >
                  <img
                    ref="ogimage"
                    :src="`${ogimage.url}?w=992&q=100`"
                    :alt="title"
                    width="708"
                    height="438"
                    itemprop="url contentUrl"
                    loading="lazy"
                  >
                  <meta itemprop="width" content="992">
                  <meta itemprop="height" content="411">
                </picture>
              </figure>
            </header>

            <section>
              <Share
                :id="id"
                :title="title"
              />

              <div>
                <div class="article">
                  <div>
                    <h1
                      itemprop="name headline"
                      v-html="title"
                    />
                    <meta
                      :content="description"
                      itemprop="description"
                    >
                    <meta
                      :content="$dayjs(createdAt).format()"
                      itemprop="dateCreated"
                    >
                    <meta
                      :content="$dayjs(publishedAt).format()"
                      itemprop="datePublished"
                    >
                    <meta
                      :content="$dayjs(updatedAt).format()"
                      itemprop="dateModified"
                    >
                    <Meta
                      :category="category"
                      :created-at="publishedAt || createdAt"
                      :author-img="writer !== null ? writer.image.url : ''"
                      :author-name="writer !== null ? writer.name : ''"
                    />
                    <Toc
                      v-if="toc_visible"
                      :id="id"
                      :toc="toc"
                      :visible="toc_visible"
                    />
                    <Post
                      :body="body"
                      itemprop="articleBody"
                    />
                  </div>
                </div>

                <section
                  v-if="writer"
                  class="section--authority"
                >
                  <Writer :writer="writer" />
                </section>

                <section
                  v-if="related_blogs.length"
                  class="section--related-aritcles"
                >
                  <RelatedBlogs :blogs="related_blogs" />
                </section>
              </div>
            </section>
          </article>
        </main>

        <aside
          class="aside"
          role="complementary"
        >
          <Banner
            :id="`blog-${id}`"
            :banner="banner"
          />
          <Search />
          <Categories :categories="categories" />
          <PopularArticles :contents="popularArticles" />
          <Latest :contents="contents" />
        </aside>
      </div>
    </div>

    <Breadcrumb :category="category" />
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import cheerio from 'cheerio';
import hljs from 'highlight.js';

export default {
  async asyncData({ params, payload, $config }) {
    const data = payload !== undefined ?
      payload.content :
      (await axios.get(`https://${$config.serviceId}.microcms.io/api/v1/blog/${params.slug}?depth=2`, {
        headers: {
          'X-API-KEY': $config.apiKey,
        },
      })).data;

    const popularArticles = payload !== undefined ?
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
      data: {
        contents,
      },
    } = await axios.get(`https://${$config.serviceId}.microcms.io/api/v1/blog`, {
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

    const $ = cheerio.load(data.body);

    const headings = $('h1, h2, h3').toArray();

    const toc = headings.map((d) => {
      return {
        text: d.children[0].data,
        id: d.attribs.id,
        name: d.name,
      };
    });

    $('pre code').each((_, el) => {
      const res = hljs.highlightAuto($(el).text());
      $(el).html(res.value);
      $(el).addClass('hljs');
    });

    $('img').each((_, el) => {
      $(el).attr('class', 'lazyload');
      $(el).attr('data-src', el.attribs.src);
      $(el).removeAttr('src');
    });

    return {
      ...data,
      popularArticles,
      banner,
      body: $.html(),
      toc,
      categories: categories.data.contents,
      contents,
    };
  },
  data() {
    return {
      publishedAt: '',
      ogimage: null,
    };
  },
  head() {
    return {
      title: this.title,
      titleTemplate: '%s | WEB屋のあれこれ。',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://webcreatorsstruggle.com/${this.id}/`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.ogimage && this.ogimage.url,
        },
      ],
    };
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {
    this.$nextTick(function() {});
  },
};
</script>

<style lang="scss" scoped>
.layout-grid {
  @media (min-width: 641px) {
    padding: #{(24 / 10)}rem #{(16 / 10)}rem 0;
  }

  > div {
    margin: 0 auto;
    max-width: 1024px;

    @media (min-width: 1025px) {
      display: grid;
      grid-template-columns: 1fr #{(300 / 10)}rem;
      grid-template-rows: 1fr;
      gap: 0 #{(16 / 10)}rem;
      grid-template-areas: ". .";
    }
  }

  header {
    figure {
      margin: 0;

      picture {
        overflow: hidden;
        display: inherit;

        @media (min-width: 641px) {
          border-radius: #{(3 / 10)}rem;
        }

        img {
          backface-visibility: hidden;

          @media (max-width: 1024px) and (min-width: 641px) {
            width: 100%;
          }
        }
      }
    }

    + section {
      backface-visibility: hidden;
    }
  }

  main {
    @media (min-width: 1025px) {
      max-width: #{(768 / 10)}rem;
    }

    article {
      padding-bottom: #{(24 / 10)}rem;

      > section {
        @media (min-width: 641px) {
          display: grid;
          grid-template-columns: #{(40 / 10)}rem 1fr;
          grid-template-rows: 1fr;
          gap: 0 #{(8 / 10)}rem;
          grid-template-areas: ". .";
        }

        @media (max-width: 640px) {
          display: flex;
          flex-direction: column-reverse;
        }

        > div {
          + div {}
        }
      }

      .article {
        @media (min-width: 641px) {
          margin-top: #{(8 / 10)}rem;
        }

        @media (max-width: 640px) {
          margin-top: #{(-24 / 10)}rem;
          padding: 0 #{(12 / 10)}rem;
        }

        > div {
          border-radius: #{(3 / 10)}rem;
          background-color: #fff;
          box-shadow: 0 #{(1 / 10)}rem #{(3 / 10)}rem rgba(#000, .12), 0 #{(1 / 10)}rem #{(2 / 10)}rem rgba(#000, .24);
          -webkit-font-smoothing: antialiased;

          @media (min-width: 641px) {
            padding: #{(16 / 10)}rem;
          }

          @media (max-width: 640px) {
            padding: #{(12 / 10)}rem;
          }
        }

        h1 {
          margin: 0;
          line-height: 1.42;

          @media (min-width: 641px) {
            font-size: #{(41.89 / 10)}rem;
          }

          @media (max-width: 640px) {
            font-size: #{(23.04 / 10)}rem;
          }
        }
      }

      .section--authority,
      .section--related-aritcles {
        @media (max-width: 640px) {
          padding: 0 #{(12 / 10)}rem;
        }
      }
    }
  }

  aside {
    @media (min-width: 1025px) {
      max-width: #{(300 / 10)}rem;
    }

    @media (max-width: 640px) {
      padding: #{(16 / 10)}rem #{(12 / 10)}rem 0;
      border-top: 1px solid #cfd8dc;
    }
  }
}
</style>
