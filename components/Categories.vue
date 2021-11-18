<template>
  <div class="widget">
    <header>
      <h3>記事のカテゴリー</h3>
    </header>

    <div
      v-if="$props.categories.length"
      role="list"
    >
      <div
        v-for="category in $props.categories"
        :key="category.id"
        role="listitem"
      >
        <NuxtLink
          v-ripple
          :to="`/category/${category.id}/page/1`"
          rel="bookmark"
        >
          <span v-html="category.name" />
          <IcnArrowRight :decorative="false" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import IcnArrowRight from 'vue-material-design-icons/ArrowRight.vue';

export default {
  components: {
    IcnArrowRight,
  },
  props: {
    categories: {
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

}

[role="listitem"] {
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: #{(8 / 10)}rem #{(12 / 10)}rem;
    color: currentColor;
    text-decoration: none;

    &:hover {
      background-color: #fff;
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
    border-top: 1px solid#cfd8dc;
  }
}
</style>
