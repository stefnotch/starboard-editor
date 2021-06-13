import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
  FileWithHandle,
  FileWithDirectoryHandle,
} from "browser-fs-access";
import { get, set } from "idb-keyval";
import { computed, readonly, shallowRef, watch } from "vue";
import { v4 as uuidv4 } from "uuid";

export interface NotebookFile {
  id: string;
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
const files = shallowRef<Map<string, DatabaseFile>>(
  new Map<string, DatabaseFile>()
);
const folders = shallowRef<Map<string, FileWithDirectoryHandle>>(
  new Map<string, FileWithDirectoryHandle>()
);
const initPromise = Promise.allSettled([
  get<Map<string, DatabaseFile>>("notebook-files").then((v) => {
    if (v) {
      files.value = v;
    }
  }),
]);

export async function useNotebookStorage() {
  await initPromise;

  async function addFile(file: FileWithHandle): Promise<string> {
    // TODO: Maybe deduplicate files with the same name?
    const id = uuidv4();
    files.value.set(id, {
      id,
      name: file.name,
      fileHandle: file,
    });

    await set("notebook-files", files.value);

    return id;
  }

  async function showFile(id: string) {
    const databaseFile = files.value.get(id);
    if (!databaseFile) return;

    const shownFile: NotebookFile = {
      id: databaseFile.id,
      name: databaseFile.name,
      content: await databaseFile.fileHandle.text(),
    };

    shownNotebook.value = shownFile;
  }

  return {
    addFile,
    showFile,
    shownNotebook,
  };
}
