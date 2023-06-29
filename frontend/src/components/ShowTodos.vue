<template>
    <div class="row justify-content-center">
        <div class="table-responsive-sm mt-3 col-sm-10">
            <table class="table">
                <thead>
                    <tr class="col-sm-10">
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="todo in data" :key="todo._id">
                        <td class="row align-items-center" v-if="!todo.editing">
                            <input id="cross-out" class="col-sm-1" v-if="!todo.editing" :disabled="disabled" type="checkbox" v-model="todo.done" :checked="todo.done" @change="handleEditForm(todo)"/>              
                            <div for="cross-out" class="text-start col-sm">
                                {{ todo.detail }}
                            </div>
                            <div class="text-end col-sm-4">
                                <button v-if="!todo.editing" :disabled="disabled" @click.prevent="toggleEdit(todo)" class="btn btn-warning">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                                <button v-if="!todo.editing" :disabled="disabled" @click.prevent="deleteTodo(todo._id)" class="btn btn-danger ms-1">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </td>
                        <td v-else>
                            <form @submit.prevent="handleEditForm(todo)">
                                <div class="form-group input-group">
                                    <input class="form-control" type="text" v-model="todo.detail" required>
                                    <button class="btn btn-primary btn-block ms-1">
                                        Submit
                                    </button>
                                    <button @click.prevent="cancelEdit(todo)" class="btn btn-success ms-1">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="text-end me-2 col-sm-10">
            <button :disabled="disabled" @click.prevent="deleteTodos()" class="btn btn-danger mt-3">
                Clear all
            </button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    
    export default {
        props: {
            data: Array,
            disabled: Boolean
        },
        methods: {
            toggleEdit(todo) {
                // save value before editing
                this.TodosBeforeEdit = Object.assign({}, this.data);
                // toggle editing status
                todo.editing = !todo.editing;
                // disable button in this component
                // disable button in other components
                this.$emit('disableButton', !this.disabled);
            },
            cancelEdit(todo) {
                this.$emit('disableButton', false);
                todo.editing = !todo.editing;
                Object.assign(this.data, this.TodosBeforeEdit)
                this.$emit('refresh');
            },
            async handleEditForm(todo) {
                try {
                    let apiURL = `http://localhost:5000/${todo._id}`;
                    await axios.put(apiURL, todo);
                    // this.$router.push('/');
                    this.$emit('refresh');
                } catch (error) {
                    console.log(error)
                }
            },
            async deleteTodo(id) {
                try {
                    let apiURL = `http://localhost:5000/${id}`;

                    if (window.confirm("Are you sure?")) {
                        await axios.delete(apiURL);
                        this.$emit('refresh');
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            async deleteTodos() {
                try {
                    let apiURL = `http://localhost:5000`;

                    if (window.confirm("Are you sure?")) {
                        if (window.confirm("Everything will be deleted. Are you really sure?")) {
                            await axios.delete(apiURL);
                            this.$emit('refresh');
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            
        }
    }
</script>

<style>
    input[type=checkbox]:checked + div {
        color: grey;
        text-decoration: line-through;
    }

    td {
        vertical-align: middle;
    }
</style>