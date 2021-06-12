<template>
  <div>
    <aside class="menu sidebar">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li><button @click="openFile">Open File</button></li>
        <li><button @click="saveFile">Save File</button></li>
        <!-- TODO: Get shareable url -->
        <li><button @click="saveFile">Share Notebook</button></li>
        <li><button @click="openFolder">Open Directory</button></li>
      </ul>
      <p class="menu-label">Files</p>
      <ul class="menu-list">
        <li><a>Lorem ipsum</a></li>
        <li>
          <a class="is-active">dolor sit amet</a>
          <ul>
            <li><a>consectetur</a></li>
            <li><a>adipisicing elit.</a></li>
          </ul>
        </li>
        <li><a>Consequuntur</a></li>
        <li><a>excepturi</a></li>
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
} from "vue";
import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
  FileWithHandle,
  FileWithDirectoryHandle,
} from "browser-fs-access";
import { get, set } from "idb-keyval";

export default defineComponent({
  components: {},
  emits: {
    showFile: (value: { name: string; content: string }) => true,
  },
  setup(props, context) {
    if (!supported) {
      console.log(
        "Native Filesystem API not supported, please nicely ask your local browser vendor"
      );
    }

    const files = shallowRef<FileWithHandle[]>([]);
    const folders = shallowRef<FileWithDirectoryHandle[]>([]);

    context.emit("showFile", { name: "cat", content: "lorem ipsum" });

    async function openFile() {
      try {
        const selectedFiles = await fileOpen({
          extensions: [".md", ".sb", ".nb"],
          multiple: true,
        });
        selectedFiles.forEach((f) => console.log(f));
        // TODO: Store in indexed database
        files.value.push(...selectedFiles);
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
        folders.value.push(...selectedFolders);
      } catch (err) {
        if (err.name !== "AbortError") {
          return console.error(err);
        }
      }
    }

    async function saveFile() {
      try {
        // TODO: Actually save the file
        await fileSave(new Blob(), {
          fileName: "name.nb",
          extensions: [".nb"],
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          return console.error(err);
        }
      }
    }

    return { openFile, saveFile, openFolder };
  },
});
</script>

<style scoped>
.sidebar {
  padding: 8px;
}
</style>
