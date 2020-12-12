<template>
  <div class="home">
    <div class="title" ref="scene" data-scalar-x="25" data-scalar-y="25">
      <video class="title-video" data-depth="0.1" autoplay loop muted>
        <source :src="require('./assets/eruption.mp4')" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <svg
        :viewBox="`0 0 ${width} ${height}`"
        class="svg-title"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="cut-off-bottom">
            <text
              :y="height / 2.2"
              class="title-text"
              fill="white"
              xml:space="preserve"
            >
              <tspan x="0" text-anchor="middle">MY</tspan>
              <tspan x="0" :y="height / 1.2" text-anchor="middle">WORLD</tspan>
            </text>
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";

import Parallax from "parallax-js";

export default {
  setup() {
    const scene = ref(null);
    const height = ref(0);
    const width = ref(0);

    onMounted(() => {
      if (scene.value != null) {
        const bound = scene.value.getBoundingClientRect();
        [height.value, width.value] = [bound.height, bound.width];

        window.addEventListener("resize", () => {
          const bound = scene.value.getBoundingClientRect();
          [height.value, width.value] = [bound.height, bound.width];
        });

        const parallax = new Parallax(scene.value);
      }
    });

    return { scene, height, width };
  }
};
</script>
