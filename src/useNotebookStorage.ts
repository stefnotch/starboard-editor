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

// TODO: Schema version

// TODO: Whenever the active file changes (opened/edited/deleted) --> we note down the latest state (overwriting the state every time) (slightly debounced) (maybe extra-executed in beforeunload)
const shownNotebook = shallowRef<NotebookFile>();
const files = shallowReactive<Map<string, DatabaseFile>>(
  new Map<string, DatabaseFile>()
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
    await initPromise;

    // Deduplicate file handles
    if (file.handle) {
      for (const existingFile of files.values()) {
        if (
          existingFile.fileHandle.handle &&
          file.handle.isSameEntry(existingFile.fileHandle.handle)
        ) {
          return existingFile.id;
        }
      }
    }

    const id = uuidv4();
    files.set(id, {
      id,
      name: file.name,
      fileHandle: file,
    });

    await set("notebook-files", toRaw(files));

    return id;
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

  async function saveFile(file: NotebookFile) {
    const databaseFile = file.id ? files.get(file.id) : undefined;

    // Doesn't rename the databaseFile, so you can safely save a notebook with a custom name

    await fileSave(
      new Blob([file.content], {
        type: "text/plain",
      }),
      {
        fileName: file.name,
        extensions: [".nb"],
      },
      databaseFile?.fileHandle?.handle
    );

    databaseFile?.fileHandle;
  }

  // TODO: Rename function
  // TODO: Close function

  return {
    isLoaded,
    addFile,
    showFile,
    saveFile,
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
