<template>
  <div class="article-list__meta">
    <div class="meta__rows--upper">
      <p
        v-if="$props.category"
        class="meta__category"
      >
        <span v-html="$props.category.name" />
      </p>
    </div>

    <div class="meta__rows--middle">
      <p class="meta__date">
        <IcnPublish :decorative="false" />
        <time
          :datetime="$dayjs($props.createdAt).format()"
          v-html="$dayjs($props.createdAt).format('YYYY.MM.DD.')"
        />
      </p>
      <p class="meta__author">
        <IcnPencil :decorative="false" />
        <span v-html="$props.authorName" />
        <picture>
          <source
            type="image/webp"
            :data-srcset="`${$props.authorImg}?fit=crop&w=120&h=120&fm=webp`"
          >
          <img
            :data-src="`${$props.authorImg}?fit=crop&w=120&h=120&q=100`"
            :alt="$props.authorName"
            class="lazyload"
            width="40"
            height="40"
            loading="lazy"
          >
        </picture>
      </p>
    </div>
    <div
      v-if="$props.description"
      class="meta__rows--lower"
    >
      <p v-html="$props.description" />
    </div>
  </div>
</template>

<script>
import IcnPublish from 'vue-material-design-icons/Publish.vue';
import IcnPencil from 'vue-material-design-icons/Pencil.vue';

export default {
  components: {
    IcnPublish,
    IcnPencil,
  },
  props: {
    category: {
      type: Object,
      required: false,
      default: undefined,
    },
    createdAt: {
      type: String,
      required: true,
    },
    authorImg: {
      type: String,
      required: false,
      default: '',
    },
    authorName: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.meta__category {
  width: fit-content;
  padding: 0 #{(8 / 10)}rem;
  border-radius: #{(3 / 10)}rem;
  background-color: #00a993;
  color: #fff;

  @media (min-width: 641px) {
    font-size: #{(12 / 10)}rem;
  }

  @media (max-width: 640px) {
    font-size: #{(10 / 10)}rem;
  }

  .article & {
    @media (min-width: 641px) {
      font-size: #{(16 / 10)}rem;
    }
  }
}

.meta__rows {
  &--upper {
    margin-top: #{(8 / 10)}rem;
  }

  &--middle {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      display: flex;
      align-items: center;
      margin: 0;

      span {
        &.material-design-icon {
          display: block;
          width: #{(18 / 10)}rem;
          height: #{(18 / 10)}rem;

          .article & {
            @media (min-width: 641px) {
              width: #{(24 / 10)}rem;
              height: #{(24 / 10)}rem;
            }
          }

          ::v-deep svg {
            display: inherit;
            width: inherit;
            height: inherit;
          }
        }

        &:not(.material-design-icon) {
          padding-left: #{(4 / 10)}rem;
          font-size: #{(12 / 10)}rem;

          .article & {
            @media (min-width: 641px) {
              font-size: #{(16 / 10)}rem;
            }
          }
        }
      }

      time {
        padding-left: #{(4 / 10)}rem;
        font-size: #{(12 / 10)}rem;

        .article & {
          @media (min-width: 641px) {
            font-size: #{(16 / 10)}rem;
          }
        }
      }

      picture {
        margin-left: #{(8 / 10)}rem;

        @media (max-width: 640px) {
          width: #{(40 / 10)}rem;
        }
      }

      img {
        border-radius: 50%;
        backface-visibility: hidden;
      }
    }
  }

  &--lower {
    margin-top: #{(8 / 10)}rem;
    padding-top: #{(8 / 10)}rem;
    border-top: 1px solid #edf0f2;

    p {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      margin: 0;
    }
  }
}
</style>
