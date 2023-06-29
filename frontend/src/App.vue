<template>
  <div class="container-fluid mt-3 mb-3">
    <div class="row justify-content-center">
      <div class="card bg-light col-sm-5 pt-5 pb-5">
        <div class="card-title">
          <h1><i class="bi bi-list-check"></i> To-Do List</h1>
        </div>
        <div class="card-body container-fluid">
          <CreateTodo :disabled="buttonDisabled" @refresh="fetchTodos"/>
          <ShowTodos :data="Todos" :disabled="buttonDisabled" @refresh="fetchTodos" @disableButton="handleDisableButton"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import CreateTodo from './components/CreateTodo.vue';
  import ShowTodos from './components/ShowTodos.vue';

  export default {
    data() {
        return {
            Todos: [],
            buttonDisabled: false
        }
    },
    name: 'App',
    components: {
      CreateTodo,
      ShowTodos,
    },
    created() {
      try {
          this.fetchTodos();
          this.listenToEvent();       
      } catch (error) {
          console.log(error)
      }
    },
    methods: {
      async fetchTodos() {
          try {
              // const promise = new Promise((resolve, reject) => {
          //     console.log('2')
          //     setTimeout(() => {
          //         console.log('4')
          //         resolve('foo');
          //     }, 1000);
          // });
          let apiURL = 'http://localhost:5000';
          const successGet = await axios.get(apiURL);
          // console.log('1')
          this.Todos = successGet.data;
          this.Todos.forEach(i => i.editing = false);
          this.buttonDisabled = false;
          this.$eventBus.emit('todoEditing', this.buttonDisabled);
          // promise.then(() => console.log('5'))
          // console.log('3')
          } catch (error) {
              console.log(error);
          }
      },
      handleDisableButton(status) {
        this.buttonDisabled = status;
      },
      listenToEvent() {
          this.$eventBus.on('refreshTodos', () => {
              this.fetchTodos();
          });
      }
    }
  }
</script>

<style>
   /* read Flex boxes */
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50; 
  }
</style>
