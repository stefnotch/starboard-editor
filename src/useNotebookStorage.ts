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

const shownNotebook = ref<NotebookFile>();
const files = shallowReactive<Map<string, DatabaseFile>>(
  new Map<string, DatabaseFile>()
);
const isLoaded = ref(false);
const hasUnsavedChanges = ref(false);

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

    const hasExtension = /\.nb|\.sb/.test(file.name);

    await fileSave(
      new Blob([file.content], {
        type: "text/plain",
      }),
      {
        fileName: hasExtension ? file.name : file.name + ".sb",
        extensions: [".sb", ".nb"],
      },
      databaseFile?.fileHandle?.handle
    );
  }

  async function saveShownFile() {
    try {
      const notebook = shownNotebook.value;

      if (notebook) {
        hasUnsavedChanges.value = false;
        await saveFile(notebook);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        return;
      } else {
        throw err;
      }
    }
  }

  // TODO: Rename function
  // TODO: Close function

  return {
    isLoaded,
    addFile,
    showFile,
    saveFile,
    saveShownFile,
    shownNotebook,
    files: computed(() =>
      Array.from(files.values()).map((v) => {
        return {
          id: v.id,
          name: v.name,
        };
      })
    ),
    hasUnsavedChanges,
  };
}
