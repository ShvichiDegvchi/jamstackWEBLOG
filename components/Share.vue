<template>
  <div class="sns-sticky share">
    <div role="list">
      <div role="listitem">
        <a
          v-ripple
          :href="`https://twitter.com/intent/tweet?text=${$props.title}&url=https://webcreatorsstruggle.com/${$props.id}/&hashtags=WEB屋のあれこれ`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="Twitter"
            width="24"
            height="20"
            src="/images/icn-twitter.svg"
            loading="lazy"
          >
        </a>
      </div>
      <div role="listitem">
        <a
          v-ripple
          :href="`https://www.facebook.com/sharer.php?u=https://webcreatorsstruggle.com/${$props.id}/`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="Facebook"
            width="13"
            height="24"
            src="/images/icn-facebook.svg"
            loading="lazy"
          >
        </a>
      </div>
      <div role="listitem">
        <a
          v-ripple
          :href="`https://b.hatena.ne.jp/entry/https://webcreatorsstruggle.com/${$props.id}/`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="はてなブックマーク"
            width="24"
            height="20"
            src="/images/icn-hatena.svg"
            loading="lazy"
          >
        </a>
      </div>
      <div role="listitem">
        <a
          v-ripple
          href="https://webcreatorsstruggle.com/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="フィード"
            width="24"
            height="24"
            src="/images/icn-feed.svg"
            loading="lazy"
          >
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.sns-sticky {
  @media (min-width: 641px) {
    padding-top: #{(8 / 10)}rem;
  }

  @media (max-width: 640px) {
    margin-top: #{(24 / 10)}rem;
  }
}

[role="list"] {
  @media (min-width: 641px) {
    position: sticky;
    top: #{(74 / 10)}rem;
  }

  @media (max-width: 640px) {
    display: flex;
    justify-content: space-evenly;
  }
}

[role="listitem"] {
  + [role="listitem"] {
    @media (min-width: 641px) {
      margin-top: #{(8 / 10)}rem;
    }
  }
}

img {
  max-width: #{(24 / 10)}rem;
  max-height: #{(24 / 10)}rem;
}

a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: #{(40 / 10)}rem;
  height: #{(40 / 10)}rem;
  border-radius: 50%;
  background-color: #fafafa;
  box-shadow: 0 #{(1 / 10)}rem #{(3 / 10)}rem rgba(#000, .12), 0 #{(1 / 10)}rem #{(2 / 10)}rem rgba(#000, .24);

  &:hover {
    background-color: #fff;
  }
}
</style>
