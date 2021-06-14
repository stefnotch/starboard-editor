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
        <!-- TODO: Get shareable url -->
        <li>
          <button class="button is-small is-fullwidth" @click="saveFile">
            Share Notebook
          </button>
        </li>
        <li>
          <button class="button is-small is-fullwidth" @click="openFolder">
            Open Directory
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
      <p class="menu-label">Directories</p>
      <ul class="menu-list">
        <li><a>culpa, ipsam temporibus</a></li>
        <li><a>soluta dicta</a></li>
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

export default defineComponent({
  components: {},
  setup(props, context) {
    if (!supported) {
      console.log(
        "Native Filesystem API not supported, please nicely ask your local browser vendor"
      );
    }

    const notebookStorage = useNotebookStorage();

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
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          return console.error(err);
        }
      }
    }

    async function openFolder() {
      try {
        const selectedFolders = await directoryOpen();
        console.log(selectedFolders);
        // notebookStorage.folders.value.push(...selectedFolders);
      } catch (err) {
        if (err.name !== "AbortError") {
          return console.error(err);
        }
      }
    }

    async function saveFile() {
      try {
        const notebook = notebookStorage.shownNotebook.value;
        if (notebook) {
          await fileSave(
            new Blob([notebook.content], {
              type: "text/plain",
            }),
            {
              fileName: notebook.name,
              extensions: [".nb"],
            }
          );
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

    return {
      openFile,
      saveFile,
      openFolder,
      files: notebookStorage.files,
      showFile,
    };
  },
});
</script>

<style scoped>
.sidebar {
  padding: 8px;
}
</style>
