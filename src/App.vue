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
        <a class="navbar-item"> New File </a>
        <a class="navbar-item"> Open File </a>
        <a class="navbar-item"> Open Folder </a>
        <hr class="navbar-divider" />
        <a class="navbar-item"> Save </a>
        <a class="navbar-item"> Share </a>
        <!-- TODO: Import/export Markdown -->
      </div>
    </div>
  </nav>
  <div class="columns is-gapless full-height">
    <side-bar class="column is-one-fifth"></side-bar>
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
import { useNotebookStorage } from "./useNotebookStorage";

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

    initialNotebookContent = initialNotebookContent.then(async (v) => {
      if (v) {
        return v;
      } else {
        // TODO: Load notebook from localstorage
        return "";
      }
    });

    const notebookStorage = useNotebookStorage();
    initialNotebookContent.then((v) => {
      notebookStorage.shownNotebook.value = {
        name: "Untitled",
        content: v,
      };
    });

    /**
     * Shows a notebook and refreshes starboard
     */
    function showNotebook(
      container: HTMLElement | undefined,
      notebookContent: string
    ) {
      if (!container) return;
      container.innerHTML = "";
      container.appendChild(
        new StarboardEmbed({
          notebookContent,
          preventNavigationWithUnsavedChanges: true,
          autoResize: false,
          onSaveMessage: (payload) => {
            // Save notebook
          },
          onContentUpdateMessage: (payload) => {
            urlParams.setParam("notebook", "");
            // Keep a periodic localstorage backup
          },
          // TODO: If you replace the src with something, make sure that it's still hosted on a different domain!
          src: "https://unpkg.com/starboard-notebook@0.12.0/dist/index.html",
        })
      );
    }

    watch(
      [starboardWrapContainer, notebookStorage.shownNotebook],
      ([container, notebook]) => {
        showNotebook(container, notebook?.content ?? "");
      },
      {
        immediate: true,
      }
    );

    return {
      starboardWrapContainer,
    };
  },
});
</script>
<style scoped>
side-bar {
  height: 100%;
  overflow: auto;
}
</style>
<style>
.starboard-container starboard-embed {
  display: block;
  padding-right: 8px;
  padding-left: 8px;
}
.starboard-container,
starboard-embed,
starboard-embed > iframe {
  height: 100%;
  border: 0px;
  outline: 0px;
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  max-height: 100%;
  display: block;
}
</style>
