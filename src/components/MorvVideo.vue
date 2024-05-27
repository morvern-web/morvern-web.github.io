<template>
  <MorvOverlay @closeOverlay="$emit('closeOverlay')">
    <template v-slot:default>
      <div class="video-container">
        <iframe
          width="100%" height="100%"
          :src="`https://www.youtube-nocookie.com/embed/${id}?si=JXRtZWqOtyG4lDIQ&amp`"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </template>
  </MorvOverlay>
</template>

<script>
export default {
  name: 'MorvVideo',

  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.video-container {
  position: relative;
  height: 100%;
  margin: auto;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}


@media (width <= 600px) {
  .video-container {
    height: 0px;
    width: 100%;
    padding-bottom: 56.25%;
  }
}
</style>
