<template>
  <div class="columns is-gapless">
    <side-bar class="column is-one-fifth" @showFile="showFile"></side-bar>
    <div ref="starboardWrapContainer" class="starboard-container column"></div>
    <div class="column is-one-fifth"></div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watchEffect, watch, computed } from "vue";
import SideBar from "./components/SideBar.vue";
import { StarboardEmbed } from "starboard-wrap";
import { useURLParams } from "./useUrlParams";

export default defineComponent({
  components: { SideBar },
  setup() {
    const starboardWrapContainer = ref<HTMLElement>();

    const urlParams = useURLParams();
    const initialNotebookContent = urlParams.getParam("notebook") ?? "";

    watch(
      starboardWrapContainer,
      (value) => {
        value?.appendChild(
          new StarboardEmbed({
            notebookContent: initialNotebookContent,
            preventNavigationWithUnsavedChanges: true,
            // TODO: If you replace the src with something, make sure that it's still hosted on a different domain!
            // src:
          })
        );
      },
      { immediate: true }
    );

    function showFile(file: { name: string; content: string }) {
      // TODO: Load this file
    }

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
  height: 100vh;
  border: 0px;
  outline: 0px;
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  max-height: 100vh;
  display: block;
}
</style>
