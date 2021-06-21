<template>
  <teleport to="#modal">
    <div class="modal is-active">
      <div class="modal-background" @click.self="emit('close', 'cancel')"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Unsaved Changes</p>
          <!-- <button class="delete" aria-label="close"></button> -->
        </header>
        <section class="modal-card-body">
          Do you want to save the changes to this notebook?
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="emit('close', 'ok')">
            Save
          </button>
          <button class="button is-danger" @click="emit('close', 'discard')">
            Discard
          </button>
          <div style="flex-grow: 1"></div>
          <button class="button" @click="emit('close', 'cancel')">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ModalCloseStatus } from "./useUnsavedChangesModal";

export default defineComponent({
  components: {},
  emits: {
    close: (status: ModalCloseStatus) => true,
  },
  setup(props, context) {
    return {
      emit: context.emit,
    };
  },
});
</script>

<style scoped>
.modal-card-head {
  background: white;
  border: 0px;
}
.modal-card-foot {
  background: white;
  border: 0px;
}
</style>