<template>
  <nav class="navbar is-transparent">
    <a
      role="button"
      class="navbar-burger menu-burger"
      :class="{ 'is-active': showSidebar }"
      @click="showSidebar = !showSidebar"
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
        <!-- TODO: Hook those buttons up -->
        <a class="navbar-item" @click="newFile()"> New File </a>
        <a class="navbar-item"> Open File </a>
        <hr class="navbar-divider" />
        <a class="navbar-item"> Save </a>
        <a class="navbar-item"> Share </a>
        <hr class="navbar-divider" />
        <a class="navbar-item"> Export Markdown </a>
        <!-- TODO: Import/export Markdown -->
      </div>
    </div>
  </nav>
  <div class="columns is-gapless full-height">
    <side-bar
      class="column is-one-fifth side-bar"
      :class="{ 'show-sidebar': showSidebar }"
    ></side-bar>
    <div ref="starboardWrapContainer" class="starboard-container column"></div>
    <div
      class="column is-one-fifth"
      :class="{ 'is-hidden': !showSidebar }"
    ></div>
  </div>
  <unsaved-changes-modal
    v-if="unsavedChangesModal.isShowing.value"
    v-on:close="(ev) => unsavedChangesModal.closeCallback(ev)"
  ></unsaved-changes-modal>
</template>

<script lang="ts">
import { ref, defineComponent, watchEffect, watch, computed, toRaw } from "vue";
import SideBar from "./components/SideBar.vue";
import UnsavedChangesModal from "./components/UnsavedChangesModal.vue";
import {
  ModalCloseStatus,
  useUnsavedChangesModal,
} from "./components/useUnsavedChangesModal";
import { StarboardEmbed } from "starboard-wrap";
import { useURLParams } from "./useUrlParams";
import { useCompression } from "./useCompression";
import { NotebookFile, useNotebookStorage } from "./useNotebookStorage";
import { get, set } from "idb-keyval";
import { throttle } from "@github/mini-throttle";

let waitBeforeUnload = false;
function beforeUnloadCallback(e: BeforeUnloadEvent) {
  if (waitBeforeUnload) {
    e.preventDefault();
    e.returnValue = "Unsaved Changes";
  }
}

window.addEventListener("beforeunload", beforeUnloadCallback);

async function getInitialNotebook(urlParams: ReturnType<typeof useURLParams>) {
  const urlsCompressed = urlParams.getParam("c");
  let notebook: NotebookFile = {
    name: urlParams.getParam("name") ?? "Untitled",
    content: "",
  };
  if (urlsCompressed) {
    const compression = await useCompression();
    notebook.content = compression.decompressFromUrl(
      urlParams.getParam("notebook") ?? ""
    );
  } else {
    notebook.content = urlParams.getParam("notebook") ?? "";
  }

  if (!notebook.content) {
    const lastNotebook = await get<NotebookFile>("last-notebook");
    if (lastNotebook && lastNotebook.name && lastNotebook.content) {
      notebook.name = lastNotebook.name + "";
      notebook.content = lastNotebook.content + "";
    }
  }

  return notebook;
}

export default defineComponent({
  components: { SideBar, UnsavedChangesModal },
  setup() {
    const starboardWrapContainer = ref<HTMLElement>();

    const showSidebar = ref(true);
    const unsavedChangesModal = useUnsavedChangesModal();

    const urlParams = useURLParams();
    let initialNotebook = getInitialNotebook(urlParams);
    const notebookStorage = useNotebookStorage();

    initialNotebook.then((v) => {
      notebookStorage.shownNotebook.value = v;
    });

    watchEffect(
      () => (waitBeforeUnload = notebookStorage.hasUnsavedChanges.value)
    );

    // TODO: Pyodide kernel, sympy support and then make waves about it (sympy community, reddit, hackernews, ..)

    /**
     * Shows a notebook and refreshes starboard
     */
    function showNotebook(
      container: HTMLElement | undefined,
      notebookContent: string
    ) {
      if (!container) return;
      container.innerHTML = "";
      // TODO: runtimeConfig for scroll past end
      // TODO: runtimeConfig for dark theme
      container.appendChild(
        new StarboardEmbed({
          notebookContent,
          autoResize: false,
          onSaveMessage: (payload) => {
            if (notebookStorage.shownNotebook.value && payload.content) {
              notebookStorage.shownNotebook.value.content = payload.content;
            }
            notebookStorage.saveShownFile();
          },
          onContentUpdateMessage: (payload) => {
            notebookStorage.hasUnsavedChanges.value = true;
            urlParams.setParam("notebook", undefined);
            urlParams.setParam("c", undefined);
            urlParams.setParam("name", undefined);

            if (notebookStorage.shownNotebook.value && payload.content) {
              notebookStorage.shownNotebook.value.content = payload.content;
            }
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

    const storeNotebook = throttle(
      (notebook: NotebookFile | undefined) => {
        set("last-notebook", toRaw(notebook));
      },
      500,
      {
        middle: false, // TODO: is this a bug with the library?
      }
    );

    watch(
      notebookStorage.shownNotebook,
      (notebook) => {
        storeNotebook(notebook);
      },
      { immediate: true, deep: true }
    );

    // TODO: Global save event listener

    async function newFile() {
      if (!(await unsavedChangesModal.showIfUnsavedChanges(notebookStorage))) {
        return;
      }
      notebookStorage.shownNotebook.value = {
        name: "Untitled",
        content: "",
      };
      notebookStorage.hasUnsavedChanges.value = false;
    }

    return {
      starboardWrapContainer,
      showSidebar,
      newFile,
      unsavedChangesModal,
    };
  },
});
</script>
<style scoped>
/* custom selectors don't work with vue components */
.side-bar {
  height: 100%;
  overflow: auto;
  border-right: 1px solid #bbbbbb;
  display: none;
  background: white;
}
.show-sidebar {
  display: initial;
  animation: showSidebar 250ms ease-in-out both;
}
@keyframes showSidebar {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}
.full-height {
  min-height: 0;
}
</style>
<style>
/* TODO: Fix CSS for small windows (mobile)*/
/* Seems to happen whenever we have a text editor with an overflow */
/* Caused by the starboard-insertion-line ?? */
.starboard-container starboard-embed {
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
