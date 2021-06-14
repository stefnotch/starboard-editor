import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
  FileWithHandle,
  FileWithDirectoryHandle,
} from "browser-fs-access";
import { get, set } from "idb-keyval";
import {
  computed,
  readonly,
  ref,
  shallowReactive,
  shallowRef,
  toRaw,
  watch,
} from "vue";
import { v4 as uuidv4 } from "uuid";

export interface NotebookFile {
  id?: string;
  name: string;
  content: string;
}

interface DatabaseFile {
  id: string;
  name: string; // Because the file could be renamed online
  fileHandle: FileWithHandle;
}

// TODO: Whenever the active file changes (opened/edited/deleted) --> we note down the latest state (overwriting the state every time) (slightly debounced) (maybe extra-executed in beforeunload)
const shownNotebook = shallowRef<NotebookFile>();
const files = shallowReactive<Map<string, DatabaseFile>>(
  new Map<string, DatabaseFile>()
);
const folders = shallowReactive<Map<string, FileWithDirectoryHandle>>(
  new Map<string, FileWithDirectoryHandle>()
);
const isLoaded = ref(false);

const initPromise = Promise.allSettled([
  get<Map<string, DatabaseFile>>("notebook-files").then((v) => {
    if (v) {
      for (const entry of v.entries()) {
        files.set(entry[0], entry[1]);
      }
    }
  }),
]).then((v) => {
  isLoaded.value = true;
  return v;
});

export function useNotebookStorage() {
  async function addFile(file: FileWithHandle): Promise<string> {
    try {
      await initPromise;

      // TODO: Maybe deduplicate file handles?
      const id = uuidv4();
      files.set(id, {
        id,
        name: file.name,
        fileHandle: file,
      });

      await set("notebook-files", toRaw(files));

      return id;
    } catch (e) {
      console.warn(e);
    }
  }

  async function showFile(id: string) {
    await initPromise;

    const databaseFile = files.get(id);
    if (!databaseFile) return;

    const shownFile: NotebookFile = {
      id: databaseFile.id,
      name: databaseFile.name,
      content: await databaseFile.fileHandle.text(),
    };

    shownNotebook.value = shownFile;
  }

  return {
    isLoaded,
    addFile,
    showFile,
    shownNotebook,
    files: computed(() =>
      Array.from(files.values()).map((v) => {
        return {
          id: v.id,
          name: v.name,
        };
      })
    ),
  };
}
