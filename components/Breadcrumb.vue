<template>
  <nav
    v-if="category && Object.keys(category).length"
    class="topicpath"
    aria-label="サイト内現在地メニュー"
  >
    <div>
      <ol
        class="topicpath__container"
        itemscope
        itemtype="http://schema.org/BreadcrumbList"
      >
        <li
          class="topicpath__item"
          itemprop="itemListElement"
          itemscope
          itemtype="http://schema.org/ListItem"
        >
          <NuxtLink
            :aria-current="category !== undefined && category !== null ? 'page' : null"
            to="/"
            itemprop="item"
            itemid="https://webcreatorsstruggle.com/"
            itemscope
            itemtype="http://schema.org/Thing"
          >
            <span
              itemprop="name"
              v-html="`記事一覧`"
            />
          </NuxtLink>
          <meta
            content="1"
            itemprop="position"
          >
        </li>
        <li
          class="topicpath__item"
          itemprop="itemListElement"
          itemscope
          itemtype="http://schema.org/ListItem"
        >
          <IcnArrowRight :decorative="false" />
          <NuxtLink
            :to="`/category/${category.id}/page/1`"
            itemprop="item"
            :itemid="`https://webcreatorsstruggle.com/category/${category.id}/page/1`"
            itemscope
            itemtype="http://schema.org/Thing"
          >
            <span
              itemprop="name"
              v-html="category.name"
            />
          </NuxtLink>
          <meta
            content="2"
            itemprop="position"
          >
        </li>
      </ol>
    </div>
  </nav>
</template>

<script>
import IcnArrowRight from 'vue-material-design-icons/ArrowRight.vue';

export default {
  components: {
    IcnArrowRight,
  },
  props: {
    category: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.topicpath {
  $this: &;
  overflow: auto;
  position: sticky;
  z-index: 1;
  bottom: 0;
  padding: 0 #{(12 / 10)}rem;
  background-color: #00a993;
  color: #fff;
  font-size: #{(12 / 10)}rem;
  box-shadow: 0 #{(3 / 10)}rem #{(6 / 10)}rem rgba(#000, .16), 0 #{(3 / 10)}rem #{(6 / 10)}rem rgba(#000, .23);

  @media (min-width: 641px) {
    font-size: #{(14 / 10)}rem;
  }

  @media (max-width: 640px) {
    font-size: #{(12 / 10)}rem;
  }

  > div {
    padding: #{(8 / 10)}rem 0;
  }

  &__container {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  &__item {
    display: flex;
    align-items: center;

    span {
      &.material-design-icon {
        display: block;
        margin: 0 #{(8 / 10)}rem;
        width: #{(16 / 10)}rem;
        height: #{(16 / 10)}rem;

        ::v-deep svg {
          display: inherit;
          width: inherit;
          height: inherit;
        }
      }
    }

    a {
      color: currentColor;

      span {
        white-space: nowrap;
      }
    }

    + #{$this}__item {}
  }
}
</style>
