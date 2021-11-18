<template>
  <section
    v-if="$props.visible"
    class="table-of-contents"
  >
    <header>
      <h2 v-html="`目次`" />
    </header>

    <div
      v-if="$props.toc"
      role="list"
    >
      <div
        v-for="item in $props.toc"
        :key="item.id"
        :class="`this-indent--${item.name}`"
        role="listitem"
      >
        <NuxtLink
          v-ripple
          v-scroll-to="{
            el: `#${item.id}`,
            duration: 500,
            lazy: false,
            easing: 'ease-in',
            offset: -65,
            force: true,
            cancelable: true,
          }"
          to
        >
          <IcnArrowDown :decorative="false" />
          <span v-html="item.text" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
import IcnArrowDown from 'vue-material-design-icons/ArrowDown.vue';

export default {
  components: {
    IcnArrowDown,
  },
  props: {
    toc: {
      type: Array,
      required: true,
      default: () => [],
    },
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: function() {
    return {
      header: null,
    };
  },
  computed: {},
  mounted: function() {
    this.$nextTick(() => {});
  },
};
</script>

<style lang="scss" scoped>
.table-of-contents {
  margin-top: #{(16 / 10)}rem;
  margin-bottom: #{(24 / 10)}rem;
  background-color: #cfd8dc;
  border-radius: #{(3 / 10)}rem;
  box-shadow: 0 #{(1 / 10)}rem #{(3 / 10)}rem rgba(#000, .12), 0 #{(1 / 10)}rem #{(2 / 10)}rem rgba(#000, .24);

  h2 {
    margin: 0;

    @media (min-width: 641px) {
      padding: #{(16 / 10)}rem;
    }

    @media (max-width: 640px) {
      padding: #{(12 / 10)}rem;
    }
  }

  [role="listitem"] {
    border-top: 1px solid #b0bec5;

    &.this-indent--h1 {
      a {
        font-weight: 700;
        font-size: #{(18 / 10)}rem;

        span {
          &.material-design-icon {
            width: #{(31 / 10)}rem;
            height: #{(31 / 10)}rem;
          }
        }
      }
    }

    &.this-indent--h2 {
      a {
        font-weight: 700;
      }
    }

    &.this-indent--h3 {
      a {
        font-size: #{(14 / 10)}rem;

        @media (min-width: 641px) {
          padding-left: #{(32 / 10)}rem;
        }

        @media (max-width: 640px) {
          padding-left: #{(24 / 10)}rem;
        }

        span {
          &.material-design-icon {
            width: #{(24 / 10)}rem;
            height: #{(24 / 10)}rem;
          }
        }
      }
    }

    a {
      display: flex;
      color: #263238;
      touch-action: manipulation;
      text-decoration: none;

      @media (min-width: 641px) {
        padding: #{(8 / 10)}rem #{(16 / 10)}rem;
      }

      @media (max-width: 640px) {
        padding: #{(8 / 10)}rem #{(12 / 10)}rem;
      }

      span {
        &.material-design-icon {
          display: block;
          width: #{(28 / 10)}rem;
          height: #{(28 / 10)}rem;
          flex: 0 1 auto;

          ::v-deep svg {
            display: inherit;
            width: inherit;
            height: inherit;
          }
        }

        &:not(.material-design-icon) {
          padding-left: #{(8 / 10)}rem;
          flex: 1 1 auto;
        }
      }
    }
  }
}
</style>
