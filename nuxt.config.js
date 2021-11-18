import axios from 'axios';
require('dotenv').config();

const {
  API_KEY,
  SERVICE_ID,
  GOOGLE_TAG_MANAGER_ID,
} = process.env;

export default {
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined,
    serviceId: process.env.NODE_ENV !== 'production' ? SERVICE_ID : undefined,
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID !== 'production' ? GOOGLE_TAG_MANAGER_ID : undefined,
    },
  },
  privateRuntimeConfig: {
    apiKey: API_KEY,
    serviceId: SERVICE_ID,
  },
  target: 'static',
  /*
   ** Headers of the page
   */
  // https://ja.nuxtjs.org/docs/2.x/configuration-glossary/configuration-server/
  server: {
    port: 8000, // デフォルト: 3000
    host: '0.0.0.0', // デフォルト: localhost,
    timing: false,
  },
  head: {
    htmlAttrs: {
      itemscope: '',
      itemtype: 'https://schema.org/WebPage',
      prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#',
      lang: 'ja', // ←効いてないので下にある pwa の箇所で設定。
    },
    titleTemplate: '%s | WEB屋のあれこれ。',
    meta: [
      {
        charset: 'utf-8',
      }, {
        'http-equiv': 'x-dns-prefetch-control',
        content: 'on',
      }, {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge',
      }, {
        'http-equiv': 'cleartype',
        content: 'on',
      }, {
        name: 'HandheldFriendly',
        content: 'true',
      }, {
        name: 'SKYPE_TOOLBAR',
        content: 'SKYPE_TOOLBAR_PARSER_COMPATIBLE',
      }, {
        name: 'format-detection',
        content: 'telephone=no',
      }, {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover',
      }, {
        hid: 'description',
        name: 'description',
        content: 'WEB屋のあれこれ。',
      }, {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'WEB屋のあれこれ。',
      }, {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      }, {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://webcreatorsstruggle.com',
      }, {
        hid: 'og:title',
        property: 'og:title',
        content: 'WEB屋のあれこれ。',
      }, {
        hid: 'og:description',
        property: 'og:description',
        content: 'WEB屋のあれこれ。',
      }, {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://webcreatorsstruggle.com/images/ogp.png',
      }, {
        name: 'twitter:card',
        content: 'summary_large_image',
      }, {
        name: 'twitter:site',
        content: '@wcrestruggle',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://webcreatorsstruggle.com/favicon.png',
      }, {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: 'https://webcreatorsstruggle.com/feed.xml',
        title: 'WEB屋のあれこれ。',
      }, {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      }, {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@300;700&family=Roboto:wght@300;700&display=swap',
      },
    ],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js',
        async: true,
      },
    ],
    bodyAttrs: {
      class: [],
    },
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#00c9b9',
  },
  /*
   ** Global CSS
   */
  css: [
    'reseter.css/css/reseter.css',
    '@/assets/styles/transition.css',
    '@/assets/styles/colors.css', {
      src: '~/node_modules/highlight.js/styles/hybrid.css',
      lang: 'css',
    },
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-scrollto',
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa',
    '@nuxtjs/gtm',
    '@nuxtjs/vuetify',
    '@nuxtjs/web-vitals',
    'nuxt-purgecss',
    'nuxt-microcms-module',
  ],
  build: {
    postcss: {
      preset: {
        autoprefixer: {
          // Built-in since nuxt@2.14.5
          grid: 'autoplace',
        },
      },
    },
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // https://github.com/nuxt-community/dayjs-module
    '@nuxtjs/dayjs',
    '@nuxtjs/feed',
    '@nuxtjs/proxy',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    // https://www.npmjs.com/package/nuxt-modernizr
    'nuxt-modernizr',
  ],
  microcms: {
    options: {
      serviceDomain: process.env.SERVICE_DOMAIN,
      apiKey: process.env.API_KEY,
    },
    mode: process.env.NODE_ENV === 'production' ? 'server' : 'all',
  },
  webVitals: {
    // provider: '', // auto detectd
    debug: false,
    disabled: false,
  },
  gtm: {
    id: process.GOOGLE_TAG_MANAGER_ID,  // Used as fallback if no runtime config is provided
    pageTracking: true,
    enabled: true,                      // Enable it even when `npm run dev` is running!!👹
  },
  dayjs: {
    locales: [
      'ja',
    ],
    defaultLocale: 'ja',
    defaultTimeZone: 'Asia/Tokyo',
    plugins: [
      'utc',
      'timezone',
    ]
  },
  proxy: [
    'http://localhost:9000/.netlify',
  ],
  modernizr: {
    'feature-detects': [
      'css/objectfit',
      'forcetouch',
      'img/apng',
      'img/webp',
    ],
    options: [
      "setClasses",
    ],
  },
  pwa: {
    manifest: {
      name: 'WEB屋のあれこれ。👹 WEBLOG',
      short_name: 'WEB屋のあれこれ。',
      lang: 'ja',
      theme_color: '#00c9b9',
      background_color: '#fafafa',
    },
    workbox: {
      offlineAssets: [
        '/images/icn-facebook.svg',
        '/images/icn-feed.svg',
        '/images/icn-hatena.svg',
        '/images/icn-quote.svg',
        '/images/icn-search.svg',
        '/images/icn-twitter.svg',
        '/images/logo.svg',
      ],
      runtimeCaching: [
        {
          urlPattern: 'https://images.microcms-assets.io/.*',
          handler: 'staleWhileRevalidate',
        },
      ],
    },
  },
  vuetify: {
    customVariables: [],
    theme: {},
    treeShake: true,
    treeShake: {
      directives: [
        'Ripple',
      ],
      loaderOptions: {
        defaultAssets: false,
      },
    },
  },
  purgeCSS: {
    paths: [
      './node_modules/vuetify/dist/vuetify.js',
    ],
    whitelist: [
      'Ripple',
    ],
    whitelistPatterns: [/(col|row|v-window)/],
  },
  /*
   ** Build configuration
   */
  router: {
    linkActiveClass: 'is-active',
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/page/:id',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'pages',
      });
      routes.push({
        path: '/category/:categoryId/page/:id',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'categories',
      });
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
        name: 'custom',
      });
    },
  },
  generate: {
    interval: 100,
    async routes() {
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
      const limit = 50;
      const popularArticles = await axios
        .get(`https://${SERVICE_ID}.microcms.io/api/v1/popular-articles`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then(({ data }) => {
          return data.articles;
        });
      const banner = await axios
        .get(`https://${SERVICE_ID}.microcms.io/api/v1/banner`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then(({ data }) => {
          return data;
        });

      // 詳細ページ
      const getArticles = (offset = 0) => {
        return axios
          .get(
            `https://${SERVICE_ID}.microcms.io/api/v1/blog?offset=${offset}&limit=${limit}&depth=2`,
            {
              headers: { 'X-API-KEY': API_KEY },
            }
          )
          .then(async (res) => {
            let articles = [];
            if (res.data.totalCount > offset + limit) {
              articles = await getArticles(offset + limit);
            }
            return [
              ...res.data.contents.map((content) => ({
                route: `/${content.id}`,
                payload: { content, popularArticles, banner },
              })),
              ...articles,
            ];
          });
      };
      const articles = await getArticles();

      // 一覧ページ
      const index = {
        route: '/',
        payload: { popularArticles, banner },
      };

      // 一覧のページング
      const pages = await axios
        .get(
          `https://${SERVICE_ID}.microcms.io/api/v1/blog?limit=1&fields=id`,
          {
            headers: { 'X-API-KEY': API_KEY },
          }
        )
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
            route: `/page/${p}`,
            payload: { popularArticles, banner },
          }))
        );

      // 検索ページ
      const search = {
        route: '/search',
        payload: { popularArticles, banner },
      };

      const categories = await axios
        .get(`https://${SERVICE_ID}.microcms.io/api/v1/categories?fields=id`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then(({ data }) => {
          return data.contents.map((content) => content.id);
        });

      // カテゴリーページ
      const categoryPages = await Promise.all(
        categories.map((category) =>
          axios
            .get(
              `https://${SERVICE_ID}.microcms.io/api/v1/blog?limit=1&fields=id&filters=category[equals]${category}`,
              {
                headers: {
                  'X-API-KEY': API_KEY,
                },
              }
            )
            .then((res) => {
              return range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
                route: `/category/${category}/page/${p}`,
                payload: { popularArticles, banner },
              }));
            })
        )
      );
      const flattenCategoryPages = [].concat.apply([], categoryPages);
      return [index, search, ...articles, ...pages, ...flattenCategoryPages];
    },
    dir: 'dist',
  },
  optimizeCSS: true,
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://webcreatorsstruggle.com',
    exclude: [
      '/draft',
      '/404',
    ],
    gzip: true,
    trailingSlash: true,
  },
  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: 'WEB屋のあれこれ。',
          link: 'https://webcreatorsstruggle.com/feed.xml',
          description: 'WEB屋のあれこれ。',
        };

        const posts = await axios
          .get(`https://${SERVICE_ID}.microcms.io/api/v1/blog`, {
            headers: { 'X-API-KEY': API_KEY },
          })
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://webcreatorsstruggle.com/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
    {
      path: '/feed--update.xml',
      async create(feed) {
        feed.options = {
          title: '更新情報｜WEB屋のあれこれ。',
          link: 'https://webcreatorsstruggle.com/feed.xml',
          description: 'WEB屋のあれこれ。',
        };

        const posts = await axios
          .get(
            `https://${SERVICE_ID}.microcms.io/api/v1/blog?filters=category[equals]update`,
            {
              headers: { 'X-API-KEY': API_KEY },
            }
          )
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://webcreatorsstruggle.com/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],
};
