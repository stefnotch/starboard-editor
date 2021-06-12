import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
  FileWithHandle,
  FileWithDirectoryHandle,
} from "browser-fs-access";
import { get, set } from "idb-keyval";
import { shallowRef } from "vue";

export function useNotebookStorage() {
  //const shownNotebook = shallowRef<FileWithHandle>();
  const files = shallowRef<FileWithHandle[]>([]);
  const folders = shallowRef<FileWithDirectoryHandle[]>([]);

  return {
    files,
    folders,
  };
}
