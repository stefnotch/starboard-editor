<template>
  <div>
    <aside class="menu sidebar">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li><a>Open File</a></li>
        <li><a>Save File</a></li>
        <li><a>Open Directory</a></li>
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
import { ref, defineComponent, watchEffect, watch, computed } from "vue";
import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
} from "browser-fs-access";

export default defineComponent({
  components: {},
  setup() {
    if (!supported) {
      console.log(
        "Native Filesystem API not supported, please nicely ask your local browser vendor"
      );
    }

    return {};
  },
});
</script>

<style scoped>
.sidebar {
  padding: 8px;
}
</style>
