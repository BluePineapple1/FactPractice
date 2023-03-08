<script setup>

import Modal from './Modal.vue';

const props = defineProps({
        showModal: {
            type: Boolean,
            required: true,
        },
})

</script>

<template>
    <Teleport to="body">
  <!-- use the modal component, pass in the prop -->
  <Modal id="CM" @close="$emit('close')" :show="showModal" >
    <template #header>
      <h4>Подтверждение</h4>
    </template>
    <template #body>
        <h5>Вы уверены что хотите удалить запись?</h5>
    </template>
    <template #footer>
        <div class="container-xxl p-0">
            <div class="row p-0 d-flex justify-content-between">
                <div class="col-auto">
                    <button class="confirm-action" @click="$emit('confirm')">
                    Удалить</button>
                </div>
                <div class="col-auto">
                    <button class="cancel-action" @click="$emit('cancel')">
                    Отменить</button>
                </div>
            </div> 
        </div>
    </template>
    </Modal>
</Teleport>
</template>

<style>

    #CM .modal-header {
        border-bottom:1px solid #d8d5d5;
    }

    #CM .modal-body {
        padding-top: 0.3rem;
        padding-bottom: 0rem;
        border-bottom: 0;
    }

    #CM .modal-footer {
        border-top: 0;
    }

    #CM .modal-container {
        width: 500px;
        margin: auto;
        padding: 20px 30px;
        background-color: #f2f2f2;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
    }

    #CM .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(63, 63, 63, 0.466);
        display: flex;
        transition: opacity 0.3s ease;
    }

    #CM .confirm-action {
        border: 0;
        padding: 0;
        background-color: transparent;
        color: rgb(144, 30, 30);
    }

    #CM .confirm-action:hover {
        color: rgb(103, 17, 17);
    }

    #CM .cancel-action {
        border: 0;
        padding: 0;
        background-color: transparent;
        color: rgb(11, 132, 11);
    }

    #CM .cancel-action:hover {
        color: rgb(6, 44, 6);
    }

    
</style>