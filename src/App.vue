<template>
  <div ref="starboardWrapContainer" class="starboard-container"></div>
</template>

<script lang="ts">
import { ref, defineComponent, watchEffect, watch, computed } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { StarboardEmbed } from "starboard-wrap";

export default defineComponent({
  components: { HelloWorld },
  setup() {
    const starboardWrapContainer = ref<HTMLElement>();

    watch(
      starboardWrapContainer,
      (value) => {
        value?.appendChild(
          new StarboardEmbed({
            notebookContent: "",
            autoResize: false,
            preventNavigationWithUnsavedChanges: true,

            // src:
          })
        );
      },
      { immediate: true }
    );

    return {
      starboardWrapContainer,
    };
  },
});
</script>
<style>
starboard-embed {
  display: block;
}
.starboard-container,
starboard-embed,
starboard-embed > iframe {
  height: 100% !important;
}
</style>
