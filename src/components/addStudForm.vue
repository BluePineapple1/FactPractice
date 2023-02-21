<script setup >

    import Modal from './Modal.vue';

    const props = defineProps({
        showModal: {
            type: Boolean,
            required: true,
        },

        newRecord: {
            required: true,
        },

        groups: {
            required: true,
        }
    })
</script>

<template>

<Teleport to="body">
  <!-- use the modal component, pass in the prop -->
  <Modal :show="showModal" >
    <template #header>
      <h3>Добавить пользователя</h3>
    </template>
    <template #body>
        <div class="container-xs">
            <form>
                <div class="row">
                    <div class="col">
                        <input v-model="newRecord.surname" type="text" class="form-control" placeholder="Фамилия">
                    </div>
                    
                    <div class="col">
                        <input v-model="newRecord.name" type="text"  class="form-control" placeholder="Имя">
                    </div>

                    <div class="col">
                        <input v-model="newRecord.middleName" type="text" class="form-control" placeholder="Отчество">
                    </div>

                    <div class="col">
                        <select id="group" v-model="newRecord.group" type="text" class="form-control" placeholder="Группа">
                            <option v-for="value, key in groups" :value="key">{{ value }}</option>
                        </select>
                    </div>

                    <div class="col">
                        <input @keypress="isNumber($event)" v-model="newRecord.GPA" type="text" class="form-control" placeholder="Средний балл">
                    </div>

                    <div class="col">
                        <input v-model="newRecord.yearOfStudy" type="number" class="form-control" placeholder="Год обучения"> 
                    </div>
                </div>
                </form>
        </div>
    </template>
    <template #footer>
        <div class="container-xxl p-0">
            <div class="row p-0 d-flex justify-content-between">
                <div class="col-auto close_action">
                    <button @click="$emit('close')">
                    Закрыть</button>
                </div>
                <div class="row col-auto main_action">
                    <div class="col pe-1">
                        <button :disabled="
                        newRecord.group === null 
                        || newRecord.name.length < 1
                        || newRecord.surname.length < 1
                        || newRecord.middleName.length < 1
                        || newRecord.GPA === null
                        || (newRecord.yearOfStudy === null || newRecord.yearOfStudy === '') 
                    " @click="save">

                    Добавить</button>
                    </div>
                    
                    <div class="col ps-1">
                        <button @click="$emit('clear_inputs')">
                    Очистить</button>
                    </div>
                </div>
            </div> 
        </div>
    </template>
</Modal>
</Teleport>

</template>

<script>

    import { ref } from 'vue';

    export default {
        
        emits: ['close', 'clear_inputs', 'create_elem'],

        methods: {
            save() {
                this.$emit('create_elem');
            },

            isNumber: function(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    return true;
            }},
        },

        // data: {
        //     flow: ['month', 'year', 'calendar'],
        // }
        // data: {
            
        // }
    }

</script>

<style>

    .modal-container {
        width: 400px;
        margin: auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
    }

    .main_action{
        min-width: fit-content;
        color: aqua;
    }

</style>