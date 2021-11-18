<template>
  <div class="post" v-html="body" />
</template>

<script>
export default {
  props: {
    body: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  margin-top: #{(16 / 10)}rem;
  padding-top: #{(16 / 10)}rem;
  border-top: 1px solid #eceff1;

  @media (max-width: 640px) {
    font-size: #{(11.11p / 10)}rem;
  }

  > ::v-deep h1 {
    margin: #{(40 / 10)}rem 0 #{(24 / 10)}rem;
    padding: #{(16 / 10)}rem #{(24 / 10)}rem;
    border-radius: #{(3 / 10)}rem;
    background-color: #eee;

    @media (min-width: 641px) {
      font-size: #{(67.77 / 10)}rem;
    }

    @media (max-width: 640px) {
      font-size: #{(27.65 / 10)}rem;
    }

    &:first-child { margin-top: 0; }
    &:last-child { margin-bottom: 0; }
  }

  > ::v-deep h2 {
    padding-bottom: #{(8 / 10)}rem;
    border-bottom: 1px solid #ddd;
    line-height: 1.42;

    @media (min-width: 641px) {
      margin: #{(40 / 10)}rem 0 #{(16 / 10)}rem;
      font-size: #{(41.89 / 10)}rem;
    }

    @media (max-width: 640px) {
      margin: #{(36 / 10)}rem 0 #{(16 / 10)}rem;
      font-size: #{(23.04 / 10)}rem;
    }

    + h3 { margin-top: 0; }

    &:first-child { margin-top: 0; }
    &:last-child { margin-bottom: 0; }
  }

  > ::v-deep h3 {
    margin: #{(32 / 10)}rem 0 #{(16 / 10)}rem;

    @media (min-width: 641px) {
      font-size: #{(25.89 / 10)}rem;
      line-height: 1.42;
    }

    @media (max-width: 640px) {
      font-size: #{(19.20 / 10)}rem;
    }

    + h4 { margin-top: 0; }
    // + p { margin-top: #{(-8 / 10)}rem; }

    &:first-child { margin-top: 0; }
    &:last-child { margin-bottom: 0; }
  }

  > ::v-deep h4 {
    margin: #{(24 / 10)}rem 0 #{(16 / 10)}rem;
    color: #00a993;

    @media (min-width: 641px) {
      font-size: #{(20 / 10)}rem;
    }

    @media (max-width: 640px) {
      font-size: #{(16 / 10)}rem;
    }

    strong {
      background: linear-gradient(transparent 75%, #a0fff1 75%);
      color: #37474f;
      font-weight: 700;
    }

    + h5 { margin-top: 0; }
    + p { margin-top: #{(-8 / 10)}rem; }

    &:first-child { margin-top: 0; }
    &:last-child { margin-bottom: 0; }
  }

  > ::v-deep h5 {
    margin: #{(24 / 10)}rem 0 #{(8 / 10)}rem;

    @media (min-width: 641px) {
      font-size: #{(18 / 10)}rem;
    }

    @media (max-width: 640px) {
      font-size: #{(13.33 / 10)}rem;
    }

    &:first-child { margin-top: 0; }
    &:last-child { margin-bottom: 0; }
  }

  > ::v-deep p {
    letter-spacing: .2px;
    word-break: break-word;

    @media (min-width: 641px) {}
    @media (max-width: 640px) {}

    > code {
      margin: 0 #{(2 / 10)}rem;
      padding: #{(2 / 10)}rem #{(4 / 10)}rem;
      border: 1px solid var(--color-border);
      border-radius: #{(3 / 10)}rem;
      background-color: var(--color-gray-light);
      color: var(--color-pink);

      @media (min-width: 641px) {}

      @media (max-width: 640px) {}
    }

    strong {
      background: linear-gradient(transparent 75%, #a0fff1 75%);
      color: #37474f;
      font-weight: 700;

      @media (min-width: 641px) {
        font-size: #{(20 / 10)}rem;
      }

      @media (max-width: 640px) {
        font-size: #{(16 / 10)}rem;
      }
    }

    &[style*="center"] {
      img {
        margin: 0 auto;
      }
    }

    &[style*="right"] {
      img {
        margin-left: auto;
      }
    }
  }

  > ::v-deep em {
    font-style: italic;

    @media (min-width: 641px) {}

    @media (max-width: 640px) {}
  }

  > ::v-deep ol {
    list-style-type: decimal;
    list-style-position: inside;

    @media (min-width: 641px) {}

    @media (max-width: 640px) {}

    > li {
      line-height: 2;

      @media (min-width: 641px) {}

      @media (max-width: 640px) {}
    }
  }

  > ::v-deep ul {
    > li {
      line-height: 2;
      list-style: none;

      @media (min-width: 641px) {}

      @media (max-width: 640px) {}

      &::before {
        content: '-';
        margin-right: #{(10 / 10)}rem;

        @media (min-width: 641px) {}

        @media (max-width: 640px) {}
      }
    }
  }

  > ::v-deep img {
    max-width: 100%;

    @media (min-width: 641px) {}

    @media (max-width: 640px) {}
  }

  > ::v-deep a {
    color: var(--color-purple);
    text-decoration: underline;
    word-wrap: break-word;
    word-break: break-all;

    @media (min-width: 641px) {}
    @media (max-width: 640px) {}
  }

  > ::v-deep strong {
    background: linear-gradient(transparent 75%, #a0fff1 75%);
    font-weight: 700;

    @media (min-width: 641px) {}
    @media (max-width: 640px) {}
  }

  > ::v-deep blockquote {
    margin: #{(24 / 10)}rem 0;
    border-radius: #{(3 / 10)}rem;
    background: url('/images/icn-quote.svg') no-repeat #b3efea;
    background-size: #{(36 / 10)}rem #{(36 / 10)}rem;

    @media (min-width: 641px) {
      padding: #{(48 / 10)}rem #{(24 / 10)}rem #{(24 / 10)}rem;
      background-position: #{(20 / 10)}rem #{(10 / 10)}rem;
    }

    @media (max-width: 640px) {
      padding: #{(48 / 10)}rem #{(12 / 10)}rem #{(12 / 10)}rem;
      background-position: #{(10 / 10)}rem #{(10 / 10)}rem;
    }
  }

  > ::v-deep pre {
    margin: #{(24 / 10)}rem 0;
    border-radius: #{(3 / 10)}rem;
    // white-space: pre-wrap;
    // word-wrap: break-word;
    // word-break: break-all;

    @media (min-width: 641px) {}

    @media (max-width: 640px) {}

    > code {
      border-radius: #{(3 / 10)}rem;

      @media (min-width: 641px) {
        padding: #{(12 / 10)}rem #{(24 / 10)}rem;
      }

      @media (max-width: 640px) {
        padding: #{(8 / 10)}rem #{(16 / 10)}rem;
      }
    }
  }
}
</style>
