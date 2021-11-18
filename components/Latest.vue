<template>
  <div class="widget">
    <header>
      <h3>直近の記事</h3>
    </header>

    <div
      v-if="$props.contents.length"
      role="list"
    >
      <div
        v-for="content in $props.contents"
        :key="content.id"
        role="listitem"
      >
        <NuxtLink
          v-ripple
          :to="`/${content.id}`"
          rel="bookmark"
        >
          <span v-html="content.title" />
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
    contents: {
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
    border-top: 1px solid #cfd8dc;
  }
}
</style>
