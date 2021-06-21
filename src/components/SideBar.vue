<template>
  <div>
    <aside class="menu sidebar">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <button class="button is-small is-fullwidth" @click="openFile">
            Open File
          </button>
        </li>
        <li>
          <button class="button is-small is-fullwidth" @click="saveShownFile">
            Save File
          </button>
        </li>
        <!-- TODO: Set sharing options (compression, show if succeeded, ...) -->
        <li>
          <button
            class="button is-small is-fullwidth"
            @click="shareNotebook"
            :class="{ 'share-popup': showSharePopup }"
          >
            Share Notebook
          </button>
        </li>
      </ul>
      <p class="menu-label">Files</p>
      <ul class="menu-list">
        <li v-for="file in files" :key="file.id">
          <!-- TODO: Remove button -->
          <a @click="showFile(file.id)">{{ file.name }}</a>
        </li>
        <!--<li>
          <a class="is-active">dolor sit amet</a>
          <ul>
            <li><a>consectetur</a></li>
            <li><a>adipisicing elit.</a></li>
          </ul>
        </li>-->
      </ul>
    </aside>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  watchEffect,
  watch,
  computed,
  shallowRef,
  shallowReactive,
} from "vue";
import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
  FileWithHandle,
  FileWithDirectoryHandle,
} from "browser-fs-access";
import { useNotebookStorage } from "../useNotebookStorage";
import { useCompression } from "../useCompression";
import { useUnsavedChangesModal } from "./useUnsavedChangesModal";

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export default defineComponent({
  components: {},
  setup(props, context) {
    if (!supported) {
      console.log(
        "Native Filesystem API not supported, please nicely ask your local browser vendor"
      );
    }

    const notebookStorage = useNotebookStorage();
    const unsavedChangesModal = useUnsavedChangesModal();

    // TODO: Lazy loader function
    let compression: null | Awaited<ReturnType<typeof useCompression>> = null;

    const showSharePopup = ref(false);

    // Open file --> added to file storage (which reads the text, notes it down in the indexeddb, ...)
    // When the user hits "save" --> file saved (disk and indexeddb, file storage takes care of it)
    async function openFile() {
      if (!(await unsavedChangesModal.showIfUnsavedChanges(notebookStorage))) {
        return;
      }

      try {
        const selectedFiles = await fileOpen({
          extensions: [".md", ".sb", ".nb"],
          multiple: true,
        });
        const fileIds = await Promise.allSettled(
          selectedFiles.map((f) => notebookStorage.addFile(f))
        );

        const fileId = fileIds.find((v) => v.status === "fulfilled");
        if (fileId?.status === "fulfilled") {
          await notebookStorage.showFile(fileId.value);
        } else {
          console.warn(fileIds);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          return console.error(err);
        } else {
          console.warn(err);
        }
      }
    }

    function saveShownFile() {
      return notebookStorage.saveShownFile();
    }

    async function showFile(id: string) {
      if (!(await unsavedChangesModal.showIfUnsavedChanges(notebookStorage))) {
        return;
      }
      await notebookStorage.showFile(id);
    }

    async function shareNotebook() {
      const notebook = notebookStorage.shownNotebook.value;
      if (compression === null) {
        compression = await useCompression();
      }

      if (notebook) {
        const compressedNotebook = compression.compressForUrl(notebook.content);

        let urlParams = new URLSearchParams(window.location.search);
        urlParams.set("notebook", compressedNotebook);
        urlParams.set("c", "true");
        urlParams.set("name", notebook.name);

        const fullUrl =
          location.protocol +
          "//" +
          location.host +
          location.pathname +
          "?" +
          urlParams + // TODO: Support fancy characters as well (like chinese characters)
          location.hash;

        navigator.clipboard.writeText(fullUrl).then(
          function () {
            showSharePopup.value = true;
            setTimeout(() => {
              if (showSharePopup.value) {
                showSharePopup.value = false;
              }
            }, 1000);
          },
          function () {
            /* TODO: clipboard write failed */
          }
        );
      }
    }

    return {
      openFile,
      saveShownFile,
      files: notebookStorage.files,
      showFile,
      shareNotebook,
      showSharePopup,
    };
  },
});
</script>

<style scoped>
.sidebar {
  padding: 8px;
}
.share-popup::after {
  position: absolute;
  content: "Copied";
  transform: translateY(125%);
  background: white;
  border: 1px solid black;
  padding: 4px 8px;
  border-radius: 8px;
}
</style>
