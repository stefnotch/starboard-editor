import { ref } from "vue";
import type { useNotebookStorage } from "./../useNotebookStorage";

export type ModalCloseStatus = "ok" | "discard" | "cancel";

const isShowing = ref(false);
let resolvePromise: ((value: ModalCloseStatus) => void) | null = null;
let rejectPromise: ((reason?: any) => void) | null = null;

export function useUnsavedChangesModal() {
  function closeCallback(status: ModalCloseStatus) {
    isShowing.value = false;
    if (status === "ok" && resolvePromise) {
      resolvePromise(status);
    } else if (status === "discard" && resolvePromise) {
      resolvePromise(status);
    } else if (status === "cancel" && resolvePromise) {
      resolvePromise(status);
    } else if (rejectPromise) {
      rejectPromise("Unknown status " + status);
    } else {
      throw new Error("Something went wrong with the unsaved changes modal");
    }
  }

  function showModal() {
    return new Promise<ModalCloseStatus>((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
      isShowing.value = true;
    });
  }

  /**
   *
   * @returns False if the user pressed 'cancel'
   */
  async function showIfUnsavedChanges(
    notebookStorage: ReturnType<typeof useNotebookStorage>
  ) {
    if (notebookStorage.hasUnsavedChanges.value) {
      const returnStatus = await showModal();
      if (returnStatus === "ok") {
        // First save the notebook
        await notebookStorage.saveShownFile();
      } else if (returnStatus === "discard") {
        // Do nothing
      } else if (returnStatus === "cancel") {
        // Don't create a new notebook
        return false;
      }
    }
    return true;
  }

  return {
    isShowing,
    closeCallback,
    showModal,
    showIfUnsavedChanges,
  };
}
