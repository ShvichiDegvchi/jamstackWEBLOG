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
          <div
            v-if="!data.id"
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

          <article
            v-if="data.id"
            itemscope
            itemtype="https://schema.org/BlogPosting"
          >
            <meta
              itemprop="mainEntityOfPage"
              :content="`https://webcreatorsstruggle.com/${data.id}`"
            >
            <header>
              <figure
                itemprop="image"
                itemscope
                itemtype="https://schema.org/ImageObject"
              >
                <picture v-if="data.ogimage">
                  <source
                    media="(min-width: 1025px)"
                    type="image/webp"
                    :srcset="`${data.ogimage.url}?w=708&fm=webp, ${data.ogimage.url}?w=1416&fm=webp 2x`"
                  >
                  <source
                    media="(min-width: 641px)"
                    type="image/webp"
                    :srcset="`${data.ogimage.url}?fit=crop&w=992&h=411&fm=webp, ${data.ogimage.url}?fit=crop&w=1984&h=822&fm=webp 2x`"
                  >
                  <source
                    media="(max-width: 640px)"
                    type="image/webp"
                    :srcset="`${data.ogimage.url}?w=640&fm=webp, ${data.ogimage.url}?w=1280&fm=webp 2x, ${data.ogimage.url}?w=1920&fm=webp 3x`"
                  >
                  <img
                    ref="ogimage"
                    :src="`${data.ogimage.url}?w=992&q=100`"
                    :alt="data.title"
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
                :id="data.id"
                :title="data.title"
              />

              <div>
                <div class="article">
                  <div>
                    <h1
                      itemprop="name headline"
                      v-html="data.title"
                    />
                    <meta
                      :content="data.description"
                      itemprop="description"
                    >
                    <meta
                      :content="$dayjs(data.createdAt).format()"
                      itemprop="dateCreated"
                    >
                    <meta
                      :content="$dayjs(data.publishedAt).format()"
                      itemprop="datePublished"
                    >
                    <meta
                      :content="$dayjs(data.updatedAt).format()"
                      itemprop="dateModified"
                    >
                    <Meta
                      :category="data.category"
                      :created-at="data.publishedAt || data.createdAt"
                      :author-img="data.writer !== null ? data.writer.image.url : ''"
                      :author-name="data.writer !== null ? data.writer.name : ''"
                    />
                    <Toc
                      v-if="data.toc_visible"
                      :id="data.id"
                      :toc="toc"
                      :visible="data.toc_visible"
                    />
                    <Post
                      :body="data.body"
                      itemprop="articleBody"
                    />
                  </div>
                </div>

                <section
                  v-if="data.writer"
                  class="section--authority"
                >
                  <Writer :writer="data.writer" />
                </section>

                <section
                  v-if="data.related_blogs.length"
                  class="section--related-aritcles"
                >
                  <RelatedBlogs :blogs="data.related_blogs" />
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
            :id="`draft-${id}`"
            :banner="banner"
          />
          <Search />
          <Categories :categories="categories" />
          <Latest :contents="contents" />
        </aside>
      </div>
    </div>

    <Breadcrumb :category="data.category" />
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import cheerio from 'cheerio';
import hljs from 'highlight.js';

export default {
  async asyncData({ $config }) {
    const categories = await axios.get(`https://${$config.serviceId}.microcms.io/api/v1/categories?limit=100`, {
      headers: {
        'X-API-KEY': $config.apiKey,
      },
    });

    const banner = (await axios.get(`https://${$config.serviceId}.microcms.io/api/v1/banner`, {
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

    return {
      categories: categories.data.contents,
      banner,
      contents,
    };
  },
  data() {
    return {
      data: {
        id: '',
        ogimage: {
          url: '',
        },
        body: '',
        title: '',
        createdAt: '',
        publishedAt: '',
        toc_visible: false,
        writer: {
          id: '',
          name: '',
          image: {
            url: '',
          },
          text: '',
        },
        partner: {
          id: '',
          company: '',
          url: '',
          description: '',
          logo: {
            url: '',
          },
        },
        category: {
          name: '',
          color: '',
        },
        related_blogs: [],
      },
      toc: [],
      contents: [],
      categories: [],
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
          content: this.data && this.data.description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.data && this.data.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.data && this.data.description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://webcreatorsstruggle.com/${this.data && this.data.id}`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.data && this.data.ogimage && this.data.ogimage.url,
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css',
        },
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js',
          async: true,
        },
      ],
    };
  },
  async created() {
    const query = this.$route.query;

    // alert(JSON.stringify(query));

    if (query.id === undefined || query.draftKey === undefined) {
      return;
    }

    const {
      data,
      error,
    } = await axios.get(
        `/.netlify/functions/draft?id=${query.id}&draftKey=${query.draftKey}`,
    ).catch((error) => ({
      error,
    }));

    if (error) {
      return;
    }

    this.data = data;
    // 目次作成
    const $ = cheerio.load(data.body);

    const headings = $('h1, h2, h3').toArray();

    const toc = headings.map((d) => {
      return {
        text: d.children[0].data,
        id: d.attribs.id,
        name: d.name,
      };
    });

    this.toc = toc;

    $('pre code').each((_, el) => {
      const res = hljs.highlightAuto($(el).text());
      $(el).html(res.value);
      $(el).addClass('hljs');
    });

    this.data.body = $.html();
  },
  mounted: function() {
    this.$nextTick(() => {
      // alert(JSON.stringify(this.$data));
    });
  },
  beforeUpdate: function() {
    // alert(JSON.stringify(this.$data));
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
</style>
