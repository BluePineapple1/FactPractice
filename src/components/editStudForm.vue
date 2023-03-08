<script setup>

    import Modal from './Modal.vue';

    const props = defineProps({
        showModal: {
            type: Boolean,
            required: true,
        },

        item: {
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
  <Modal @close="$emit('close')" :show="showModal" >
    <template #header>
      <h3>Режим редактирования</h3>
    </template>
    <template #body>
        <div class="container-xs">
            <form>
                <!-- <ul class="edit-list"> -->
                    <li class="row edit-item">
                        <div class="col">
                            <input id="surname" v-model="item.surname" type="text" class="form-control" placeholder="Фамилия">
                        </div>

                        <div class="col">
                            <input id="name" v-model="item.name" type="text" class="form-control" placeholder="Имя">
                        </div>

                        <div class="col">
                            <input id="middle_name" v-model="item.middleName" type="text" class="form-control" placeholder="Отчество">
                        </div>

                        <div v-tooltip.tooltip="'Выберите группу'" class="col">
                            <select id="group" v-model="item.group" type="text" class="form-control" placeholder="Группа">
                                <option disabled selected value> -- Выберите группу -- </option>
                                <option v-for="item, value in groups" :value="value">{{ item }}</option>
                            </select>
                        </div>

                        <div class="col">
                            <input @keypress="isNumber($event)" id="average_mark" v-model="item.GPA" type="text" class="form-control" placeholder="Средний балл">
                        </div>


                        <div class="col">
                            <input @keypress="isYearOfStudyNumber($event)" id="year_of_study" v-model="item.yearOfStudy" type="number" class="form-control" placeholder="Год обучения">
                        </div>
                    </li>
                <!-- </ul> -->
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
                <div class="col-auto main_action">
                    <button @click="save">
                    Сохранить</button>
                </div>
            </div>
            
        </div>

    </template>
</Modal>
</Teleport>

</template>

<script>
    // console.log(groups)
    export default {
        emits: ['save', 'hideHint', 'showHint', 'close'],
        data() {
            return {

                // currentItems: [...this.items],
            }
        },

        methods: {
            save() {
                console.log(this.groups)
                this.$emit('save', this.item);
            },

            isNumber: function(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    return true;
            }},

            isYearOfStudyNumber:  function(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    return true;
            }},

            setCurrentField(event) {
                console.log(this.items);
                var responseText = "";
                switch(event.target.attributes.id.value) {
                    
                    case('surname'):
                        responseText = "Фамилия";
                        break;

                    case('name'):
                        responseText = "Имя";
                        break;

                    case('middlName'):
                        responseText = "Отчество";
                        break;

                    case('group'):
                        responseText = "Группа";
                        break;
                    
                        case('GPA'):
                        responseText = "Средний балл";
                        break;

                    case('yearOfStudy'):
                        responseText = "Год обучения";
                        break;
                }
                this.$emit("showHint", responseText);
            },

            removeCurrentField() {
                this.$emit("hideHint");
            },

            // change(event, type, uuid) {
            //     this.items.forEach(item => {
            //         console.log(item.target);
            //         if (item.uuid === uuid){
            //             item.name = event.target.value;
            //         }
            //     })

            //     console.log(this.items)

            //     console.log(uuid);
            //     console.log(event.target.value);
                
            // },

            close() {
                this.$emit('close');
            },

            getItemClassName() {
                return "body-item"
            }
        }
    }

</script>

<style>

    .form-control .table-input {
        width: 100%;
        height: 100%;
        border-radius: 0;
        padding: 0;
    }

    .edit-list {
        padding-left: 2%;
        padding-right: 2%;
        padding-top: 2%;
        max-height: 60vh;

        overflow-y: scroll;
        overflow-x: scroll;
    }

    .edit-item {
        min-width: fit-content;
        padding-bottom: 2%;
    }

    input.form-control {
        min-width: 100px;
        border-radius: 0px;
        border: 0;
        border-bottom: 1px ridge rgb(103, 103, 103);
        font-size: 12px;
        background-color: transparent;

    }

    select.form-control {
        min-width: 100px;
        border-radius: 0px;
        border: 0;
        border-bottom: 1px ridge rgb(103, 103, 103);
        font-size: 12px;
        background-color: transparent;
        color: rgb(111, 107, 107);

    }

    input.form-control:focus { 
        outline: none;
        border-color: #dedede;
        box-shadow:  -1px -1px 6px #f2f2f2, 1px 1px 6px #D7E1F0
    }

    .modal-container {
    width: 1100px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    }

</style>