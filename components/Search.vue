<template>
  <div class="widget">
    <label class="label">
      <span v-html="`サイト内検索`" />
      <input
        class="input"
        type="text"
        placeholder="キーワードを入力してください。"
        @keypress="setSearchable"
        @keypress.enter="search"
      >
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchable: false,
    };
  },
  methods: {
    setSearchable() {
      this.searchable = true;
    },
    search(e) {
      if (!e.target.value.trim() || !this.searchable) {
        return;
      }
      this.$router.push({ path: '/search', query: { q: e.target.value } });
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

.label {
  display: block;
  font-size: #{(14 / 10)}rem;
  font-weight: 700;
  color: #455a64;
}

.input {
  margin-top: #{(8 / 10)}rem;
  padding-left: #{(40 / 10)}rem;
  width: 100%;
  height: #{(40 / 10)}rem;
  border: 1px solid #cfd8dc;
  border-radius: #{(3 / 10)}rem;
  background: url('/images/icn-search.svg') no-repeat #{(10 / 10)}rem 50%, #eceff1;
  background-size: auto 56%;
  font: inherit;
  font-weight: 300;
  box-shadow: none;
  -webkit-appearance: none;
  transition: box-shadow .24s ease, background-color .25s cubic-bezier(.175, .885, .32, 1.275);

  &:hover {
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .1) inset;
  }

  &:focus {
    outline: none;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .1) inset;
  }
}
</style>
