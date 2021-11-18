<template>
  <section class="authoritative-authors">
    <header>
      <h3>
        <span>この記事を</span>
        <IcnPencil :decorative="false" />
        <span>書いた人</span>
      </h3>
    </header>

    <div
      v-if="$props.writer.image"
      itemprop="author"
      itemscope
      itemtype="https://schema.org/Person"
      class="authoritative-authors__container"
    >
      <div class="thumb">
        <picture>
          <source
            type="image/webp"
            :data-srcset="`${$props.writer.image.url}?fit=crop&w=200&h=200&fm=webp`"
          >
          <img
            :data-src="`${$props.writer.image.url}?fit=crop&w=200&h=200&q=100`"
            :alt="$props.writer.name"
            class="lazyload"
            loading="lazy"
          >
        </picture>
      </div>

      <div class="txt">
        <dl>
          <dt>
            <span
              itemprop="name"
              v-html="writer.name"
            />
            <a
              :href="$props.writer.twitter ? $props.writer.twitter : 'https://twitter.com/wcrestruggle'"
              rel="author"
              itemprop="url"
            >
              <img src="/images/icn-twitter.svg" alt="Twitter">
            </a>
          </dt>
          <dd>
            <p v-html="writer.text" />
          </dd>
        </dl>
      </div>
    </div>
    <span
      itemprop="publisher"
      itemscope
      itemtype="https://schema.org/Organization"
    >
      <meta
        itemprop="name"
        content="WEB屋のあれこれ。"
      >

      <span
        itemprop="logo"
        itemscope
        itemtype="https://schema.org/ImageObject"
      >
        <meta
          itemprop="url"
          content="https://webcreatorsstruggle.com/images/logo--desktop.svg"
        >
        <meta itemprop="width" content="240">
        <meta itemprop="height" content="45">
      </span>
    </span>
  </section>
</template>

<script>
import IcnPencil from 'vue-material-design-icons/Pencil.vue';

export default {
  components: {
    IcnPencil,
  },
  props: {
    writer: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.authoritative-authors {
  overflow: hidden;
  position: relative;
  margin-top: #{(8 / 10)}rem;
  border-radius: #{(3 / 10)}rem;
  background-color: #fff;
  box-shadow: 0 #{(1 / 10)}rem #{(3 / 10)}rem rgba(#000, .12), 0 #{(1 / 10)}rem #{(2 / 10)}rem rgba(#000, .24);

  &__container {
    display: flex;

    @media (min-width: 641px) {
      align-items: center;
      padding: 0 #{(16 / 10)}rem #{(16 / 10)}rem;
      transform: translateY(-.8rem);
    }

    @media (max-width: 640px) {
      padding: #{(8 / 10)}rem #{(12 / 10)}rem #{(12 / 10)}rem;
    }

    .thumb {
      @media (min-width: 1025px) {
        flex-shrink: 0;
        flex-basis: #{(120 / 10)}rem;
      }

      @media (max-width: 1024px) and (min-width: 641px) {
        width: percentage(200 / 737);
      }

      @media (max-width: 640px) {
        flex-shrink: 0;
        flex-basis: #{(40 / 10)}rem;
      }

      picture {
        display: block;

        img {
          margin: 0 auto;
          border-radius: 50%;
          backface-visibility: hidden;
        }
      }
    }

    .txt {
      @media (min-width: 1025px) {
        flex-grow: 1;
        flex-basis: auto;
      }

      @media (max-width: 1024px) and (min-width: 641px) {
        width: percentage(537 / 737);
      }

      @media (min-width: 641px) {
        padding-left: #{(16 / 10)}rem;
      }

      @media (max-width: 640px) {
        flex-grow: 1;
        flex-basis: auto;
        padding-left: #{(12 / 10)}rem;
      }
    }
  }
}

header {
  margin-left: auto;
  padding: #{(8 / 10)}rem;
  width: fit-content;
  background-color: #00c9b9;
  color: #fff;
  line-height: 1;

  h3 {
    margin: 0;
    font-size: #{(14 / 10)}rem;

    ::v-deep svg {
      width: #{(18 / 10)}rem;
      height: #{(18 / 10)}rem;
    }
  }
}

dl {
  margin: 0;
}

dt {
  display: flex;
  align-items: center;

  span {
    display: block;

    @media (min-width: 641px) {
      font-size: #{(22 / 10)}rem;
    }

    + a {
      margin-left: #{(8 / 10)}rem;
    }
  }

  a {
    display: block;

    img {
      backface-visibility: hidden;

      @media (min-width: 641px) {
        width: #{(28 / 10)}rem;
        height: #{(28 / 10)}rem;
      }

      @media (max-width: 640px) {
        width: #{(20 / 10)}rem;
        height: #{(20 / 10)}rem;
      }
    }
  }
}

dd {
  margin: 0;

  p {
    @media (max-width: 640px) {
      font-size: #{(12 / 10)}rem;
    }
  }
}
</style>
