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
          <button class="button is-small is-fullwidth" @click="saveFile">
            Save File
          </button>
        </li>
        <!-- TODO: Set sharing options (compression, show if succeeded, ...) -->
        <li>
          <button class="button is-small is-fullwidth" @click="shareNotebook">
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

    // TODO: Lazy loader function
    let compression: null | Awaited<ReturnType<typeof useCompression>> = null;

    // Open file --> added to file storage (which reads the text, notes it down in the indexeddb, ...)
    // When the user hits "save" --> file saved (disk and indexeddb, file storage takes care of it)
    async function openFile() {
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

    async function saveFile() {
      try {
        const notebook = notebookStorage.shownNotebook.value;

        if (notebook) {
          notebookStorage.hasUnsavedChanges.value = false;
          await notebookStorage.saveFile(notebook);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          return console.error(err);
        }
      }
    }

    function showFile(id: string) {
      return notebookStorage.showFile(id);
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
            /* TODO: clipboard successfully set */
          },
          function () {
            /* TODO: clipboard write failed */
          }
        );
      }
    }

    return {
      openFile,
      saveFile,
      files: notebookStorage.files,
      showFile,
      shareNotebook,
    };
  },
});
</script>

<style scoped>
.sidebar {
  padding: 8px;
}
</style>
