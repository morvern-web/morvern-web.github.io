<template>
  <div class="hover-overlay">
    <h3 class="item-title" :class="item.type || type">
      {{ item.title }}
    </h3>

    <h6 class="item-date" :class="item.type || type">
      {{ $date(item.date).format('DD MMMM YYYY') }}
    </h6>
  </div>
</template>

<script>
export default {
  name: 'MorvHover',

  props: {
    item: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less" scoped>
.hover-overlay {
  @media(pointer: coarse) {
    display: none;
  }

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 30px;
  background: fade(black, 85%);
  align-content: center;  
  text-align: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity .35s;
  &:hover {
    opacity: 1;
  }

  .item-title {
    line-height: 1.2;
    &.single, &.video {
      font-style: normal;
    }
  }
}
</style>
