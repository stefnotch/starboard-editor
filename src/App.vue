<template>
  <nav class="navbar is-transparent">
    <a
      role="button"
      class="navbar-burger menu-burger is-active"
      aria-label="menu"
      aria-expanded="false"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link"> File </a>
      <div class="navbar-dropdown is-boxed">
        <a class="navbar-item"> Open File </a>
        <a class="navbar-item"> Open Folder </a>
        <hr class="navbar-divider" />
        <a class="navbar-item"> Save </a>
        <a class="navbar-item"> Share </a>
        <!-- TODO: Import/export Markdown -->
      </div>
    </div>
  </nav>
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
import { useCompression } from "./useCompression";

export default defineComponent({
  components: { SideBar },
  setup() {
    const starboardWrapContainer = ref<HTMLElement>();

    const urlParams = useURLParams();
    const urlsCompressed = urlParams.getParam("c");
    let initialNotebookContent = Promise.resolve("");
    if (urlsCompressed) {
      const compression = useCompression();
      initialNotebookContent = compression.then((c) =>
        c.decompressFromUrl(urlParams.getParam("notebook") ?? "")
      );
    } else {
      initialNotebookContent = Promise.resolve(
        urlParams.getParam("notebook") ?? ""
      );
    }

    initialNotebookContent.then((notebookContent) => {
      watch(
        starboardWrapContainer,
        (value) => {
          value?.appendChild(
            new StarboardEmbed({
              notebookContent,
              preventNavigationWithUnsavedChanges: true,
              onSaveMessage: (payload) => {
                // Save notebook
              },
              onContentUpdateMessage: (payload) => {
                // Keep a periodic localstorage backup
              },
              // TODO: If you replace the src with something, make sure that it's still hosted on a different domain!
              // src:
            })
          );
        },
        { immediate: true }
      );
    });

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

nav .menu-burger {
  display: block;
  margin-left: initial;
}
</style>
