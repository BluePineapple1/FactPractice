<style>
    .filter-holder {
       border: 1px solid #e0e0e0;
       border-bottom: none;
       width: 1151px;
    }

    .buttons {
        gap: 0.5%;
    }

</style>

<template>
    <div class="containet-xxl filter-holder p-0">
        <div class="row m-0 ps-2 pt-1 pb-1 pe-2">
            <div class="d-flex align-items-end justify-content-between">          
                <h4 class="pt-3">Фильтр</h4>    
            </div>
            <hr class="w-100 mt-1 mb-3"/>
        </div>
        <div class="row m-0 table">
            <div class="container-xxl ps-4 pe-4 pt-2 pb-1 table-container">
                <div class="row m-0 pb-2 d-flex">
                    <div class="col">
                        <input v-model="filter.surname.value" type="text" class="form-control" placeholder="Фамилия">
                    </div>
                    
                    <div class="col">
                        <input v-model="filter.name.value" type="text" class="form-control" placeholder="Имя">
                    </div>

                    <div class="col">
                        <input v-model="filter.middleName.value" type="text" class="form-control" placeholder="Отчество">
                    </div>

                    <div class="col">
                        <select v-model="filter.group.value" id="group" class="form-control" placeholder="Группа">
                            <option v-for="value, key in groups" :value="key">{{ value }}</option>
                        </select>
                    </div>

                    <div class="col">
                        <input @keypress="isNumber($event)" v-model="filter.GPA.value" type="text" class="form-control" placeholder="Средний балл">
                    </div>

                    <!-- <div class="col">
                        <Datepicker v-model="filter.yearOfStudy.value" placeholder="Год обучения" :enable-time-picker="false" range auto-apply></Datepicker>
                    </div> -->
                    <div class="col">
                            <input @keypress="isNumber($event)" id="year_of_study" v-model="filter.yearOfStudy.value" type="number" class="form-control" placeholder="Год обучения">
                    </div>
                </div>

                <div class="row m-0 pt-1 pb-4">
                    <div class="d-flex buttons align-items-end justify-content-start">
                        <button :disabled = "(filter.name.value === null || filter.name.value === '')
                            && (filter.surname.value === null || filter.surname.value === '')
                            && (filter.middleName.value === null || filter.middleName.value === '')
                            && (filter.GPA.value === null || filter.GPA.value === '')
                            && filter.group.value === null
                            && filter.yearOfStudy.value === null" class="applyButton" @click="set">Применить</button>
                        <button class="cancelButton" @click="clear">Очистить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup >

    const props = defineProps({
        groups: {
            reqired: true,
        },

        filter: {
            required: true,
        }

    });

</script>

<script>

    export default {
        methods: {
            set() {
                this.$emit("set");
            },

            clear() {
                this.$emit("clear");
            },

            isNumber: function(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if (((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46)) {
                    evt.preventDefault();
                } else {
                    if ((evt.target.value + evt.key > 5) || (evt.target.value + evt.key < 2)) {
                        evt.preventDefault();
                    }
                    return true;
            }}
        }
        
    }

</script>

<style>
    .pt-3 {
        color: hsla(160, 100%, 37%, 1);
    }

    .applyButton {
        width: 90px;
        color: var(--bs-light);
    }

    .cancelButton {
        width: 90px;
        
    }
</style>