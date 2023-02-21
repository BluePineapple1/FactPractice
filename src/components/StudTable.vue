<script setup >
  import addIcon from "@/components/icons/addIcon.vue";
  import addStudForm from "./addStudForm.vue";
  import editStudForm from "./editStudForm.vue";
  import PeopleTableFilter from "./PeopleTableFilter.vue";
</script>


<template>  
    <PeopleTableFilter
     class=""
     @set="setFilter"
     @clear="clearFilter"
     :groups="groups"
     :filter="filter"
    />

    <addStudForm
        :show-modal="showAddModal"
        :groups="groups"
        :new-record="newRecord"
        @close = "showAddModal = false"
        @create_elem="save"
        @clear_inputs="clickCreate"
    />

    <editStudForm
        :show-modal="showEditModal"
        :item="currentEditableRecord"
        :groups="groups"
        @close="showEditModal = false"
        @save="saveEdit"
    />
    
    <div class="table">
        <EasyDataTable
        class="easy-table"
        v-model:items-selected="itemsSelected"
        buttons-pagination
        border-cell

        :headers="headers"
        :items="items"

        alternating

        :filter-options="this.filterOptions"

        :body-item-class-name="getBodyItemName"
        header-text-direction="center"
        body-text-direction="center">

    <template #header-operations="header">
        <div class="customize-header">
            <svg @click="clickDisplay" xmlns="http://www.w3.org/2000/svg" width="35" height="50" fill="currentColor" font-weight="700" class="bi display bi-gear" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
            </svg>
            {{ header.text }}
        </div>
    </template>

    <template #item-group="{group}">
        <div>{{ this.groups[group] }}</div>
    </template>

    <template #item-operations="{ uuid }">
        <div class="customize-header">
            <svg @click="clickEdit(uuid)" xmlns="http://www.w3.org/2000/svg" width="30" height="45" fill="currentColor" class="bi create bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
            <svg  @click="click_delete(uuid)" xmlns="http://www.w3.org/2000/svg" width="30" height="45" fill="currentColor" class="bi delete bi-x-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            
            <!-- {{ header.text }} -->
        </div>
    </template>
        </EasyDataTable>

    <div class="button-container">
            <div class="add" @click="clickAdd">
                <addIcon/>
            </div> 
        </div>
    </div>
</template>

<script>
// import gear from './icons/gear.vue';
// import pen from './icons/pen.vue';
// import createIcon from './icons/createIcon.vue';

import axious from "axios";

const httpClient = axious.create();
httpClient.defaults.timeout = 500;

import { uuid } from "vue3-uuid";

import { ref } from "vue";

const filter = {
    "name": ref(null),
    "surname": ref(null),
    "middleName": ref(null),
    "GPA": ref(null),
    "group": ref(null),
    "yearOfStudy": ref(null),
};

export default {

    created() {
        // console.log(

        httpClient.get("http://localhost:5050/groups.api/get").then(response => {
            if (response.status === 200) {
                response.data.forEach(item => {
                    console.log(item);

                    const key = item.unique_id;
                    // var data = {}

                    // data[key] = item.group_name,
                    this.groups[key] = item.group_name;
                    console.log(this.groups);
                });
            }
        })

        httpClient.get("http://localhost:5050/human.api/get_human").then(response => {
            if (response.status === 200) {
                response.data.forEach(item => {
                    console.log(item);
                    this.items.push({
                        "name": item.name,
                        "surname": item.surname,
                        "middleName": item.middle_name,
                        "GPA": item.average_mark,
                        // "birth_date": new Date(item.birth_date),
                        "uuid": item.uuid,
                        "group": item.unique_group,
                        "yearOfStudy": item.study_year,
                    })
                })

                // this.people = response.data;
                // console.log(typeof(this.people[0].birth_date))
                // this.isLoading = false;
            }
            // this.isLoading = false;

        }).catch(error => {
            if (error.code === axious.AxiosError.ERR_INVALID_URL) {
                this.info = "Люди не найдены.";
            }
            else if (error.code === axious.AxiosError.ERR_BAD_RESPONSE) {
                this.info = "Произошла серверная ошибка.";
            }
            else {
                this.info = "Произошла ошибка";
            }
        });
    },

    data() {
        return {
            groups: {},

            filterOptions: [],

            newRecord: {
                uuid: "",
                name: "",
                surname: "",
                middleName: "",
                GPA: "",
                group: null,
                yearOfStudy: null
            },

            currentEditableRecord: {
                uuid: "",
                name: "",
                surname: "",
                middleName: "",
                GPA: "",
                group: null,
                yearOfStudy: null
            },

            showAddModal: false,
            showEditModal: false,

            headers: [
                { text: "Фамилия", value: "surname", sortable: true, width: 10},
                { text: "Имя", value: "name", width: 10},
                { text: "Отчество", value: "middleName", width: 10},
                { text: "Группа", value: "group", width: 5},
                { text: "Средний балл", value: "GPA", width: 5},
                { text: "Год обучения", value: "yearOfStudy", width: 5},
                { text: null, value: "operations", width: 5},
            ],

            

            items: [

                // { operations: customize-create},

            ]
        };
    },

    methods: {
        getBodyItemName() {
            return "body-items";
        },

        setFilter() {
            this.filterOptions = [];

            if (filter.name.value !== null) {
                this.filterOptions.push({
                    field: "name",
                    comparison: "in",
                    criteria: filter.name.value,
            })};

            if (filter.surname.value !== null) {
                this.filterOptions.push({
                    field: "surname",
                    comparison: "in",
                    criteria: filter.surname.value,
            })};

            if (filter.middleName.value !== null) {
                this.filterOptions.push({
                    field: "middleName",
                    comparison: "in",
                    criteria: filter.middleName.value,
            })};

            if (filter.GPA.value !== null) {
                this.filterOptions.push({
                    field: "GPA",
                    comparison: "=",
                    criteria: parseFloat(filter.GPA.value),
            })};

            if (filter.group.value !== null) {
                this.filterOptions.push({
                    field: "group",
                    comparison: "=",
                    criteria: filter.group.value,
            })};

            if (filter.yearOfStudy.value !== null) {
                this.filterOptions.push({
                    field: "yearOfStudy",
                    comparison: "=",
                    criteria: filter.yearOfStudy.value,
            })};
            
            console.log(filter.name.value);
            // this.filterOptions = {}
        },

        clearFilter() {
            this.filterOptions = [];

            filter.name.value = null;
            filter.surname.value = null;
            filter.middleName.value = null;
            filter.GPA.value = null;
            filter.group.value = null;
            filter.yearOfStudy.value = null;
        },


        clickEdit(uuid) {
            console.log(uuid);

            var currentItem;

            this.items.forEach(item => {
                if (item.uuid === uuid) {
                    currentItem = item;
                }
            })

            console.log(currentItem);

            this.currentEditableRecord.uuid = currentItem.uuid;
            this.currentEditableRecord.name = currentItem.name;
            this.currentEditableRecord.surname = currentItem.surname;
            this.currentEditableRecord.middleName = currentItem.middleName;
            this.currentEditableRecord.GPA = currentItem.GPA;
            this.currentEditableRecord.group = currentItem.group;
            this.currentEditableRecord.yearOfStudy = currentItem.yearOfStudy;

            this.showEditModal = true;

        },

        saveEdit() {
            var currentItem;

            this.items.forEach(item => {
                if (item.uuid === this.currentEditableRecord.uuid) {
                    currentItem = item;
                }
            })

            console.log(currentItem);

            currentItem.uuid =this.currentEditableRecord.uuid;
            currentItem.name = this.currentEditableRecord.name;
            currentItem.surname = this.currentEditableRecord.surname;
            currentItem.middleName = this.currentEditableRecord.middleName;
            currentItem.GPA = this.currentEditableRecord.GPA;
            currentItem.group = this.currentEditableRecord.group;
            currentItem.yearOfStudy = this.currentEditableRecord.yearOfStudy;


            httpClient.post("http://localhost:5050/human.api/update", {
                name: this.currentEditableRecord.name, 
                surname: this.currentEditableRecord.surname,
                middle_name: this.currentEditableRecord.middleName,
                birth_date: null,
                average_mark: this.currentEditableRecord.GPA,
                uuid: this.currentEditableRecord.uuid,
                group: this.currentEditableRecord.group, 
                study_year: this.currentEditableRecord.yearOfStudy

            }).then(
                setTimeout(() => {
                    this.loadHuman();
                }, 100),
            ).catch(
                err => {
                    if (err.code === 500) {
                        info = "Произошла серверная ошибка";
                    }
                }
            );


            this.showEditModal = false;

            
        },

        clickkDelete(event) {

                console.log(event);
            
        },

        clickDisplay() {
            alert(3);
        },

        clickAdd() {
            this.showAddModal = true;
            
            // alert(4);
        },

        save() {
            this.showAddModal = false;

            console.log(this.newRecord);

            this.newRecord.uuid = uuid.v4();

            this.items.push({
                uuid: this.newRecord.uuid,
                name: this.newRecord.name,
                surname: this.newRecord.surname,
                middleName: this.newRecord.middleName,
                GPA: this.newRecord.GPA,
                group: this.newRecord.group,
                yearOfStudy: this.newRecord.yearOfStudy
            });

            httpClient.post("http://localhost:5050/human.api/add", this.newRecord).then(
                response => {
                    if (response.status === 200) {
                        info = "Изменения сохранены";
                    }
                }
            ).catch(
                err => {
                    if (err.code === 500) {
                        info = "Произошла серверная ошибка";
                    }
                }
            );
        },

        loadHuman() {
            this.items.splice(0);

            httpClient.get("http://localhost:5050/human.api/get_human").then(response => {
                        if (response.status === 200) {
                            response.data.forEach(item => {
                                this.items.push({
                                    "name": item.name,
                                    "surname": item.surname,
                                    "middleName": item.middle_name,
                                    "GPA": item.average_mark,
                                    "uuid": item.uuid,
                                    "group": item.unique_group,
                                    "yearOfStudy": item.study_year,
                                })
                            })

                            // this.people = response.data;
                            // console.log(typeof(this.people[0].birth_date))
                            // this.isLoading = false;
                        }
                        // this.isLoading = false;

                    }).catch(error => {
                        if (error.code === axious.AxiosError.ERR_INVALID_URL) {
                            this.info = "Люди не найдены.";
                        }
                        else if (error.code === axious.AxiosError.ERR_BAD_RESPONSE) {
                            this.info = "Произошла серверная ошибка.";
                        }
                        else {
                            this.info = "Произошла ошибка";
                        }
                    });
        },

        click_delete(uuid) {
            httpClient.post("http://localhost:5050/human.api/delete", {
                uuid: uuid
            }).then(
                setTimeout(() => {
                    this.loadHuman();
                }, 100),
            ).catch(
                err => {
                    if (err.code === 500) {
                        info = "Произошла серверная ошибка";
                    }
                }
            );

        }

    },

    components: {  }
} 

</script>

<style>

    .table {
        display: flex;
        gap: 20px;
    }

    .easy-table {
        width: 100%;
    }

    .button-container {
        max-width: fit-content;
        display: flex;
        justify-content: end;
        align-items: start;
    }

    .add {
        width: 45px;
        height: 50px;
        color: hsla(160, 100%, 37%, 1);
    }

    .add:hover {
        transform: scale(0.96);
    }

    .body-items {
        text-align: center;
        font-size: 14px;
        --easy-table-body-item-padding: 0 10px;
        
    }
    .header {
        text-align: center;
        font-weight: 700;
        font-size: 14px;
        color: hsla(160, 100%, 37%, 1);
    }

    .create {
        padding: 5px;
        color: hsla(159, 77%, 17%, 0.8);
    }

    .create:hover {
        padding: 6px;
        color: rgba(85, 146, 88, 0.486);
    }

    .delete {
        padding: 5px;
        color: hsla(352, 66%, 37%, 0.8);
    }

    .delete:hover {
        padding: 6px;
        color: rgba(255, 0, 13, 0.486);
    }

    .display {
        margin-top: -8px;
        color: hsla(159, 77%, 17%, 0.8);
    }

    .display:hover {
        padding: 6px;
        color: rgba(85, 146, 88, 0.486);
    }




</style>