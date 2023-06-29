<template>
  <div class="row justify-content-center">
    <div class="col-sm-10">
      <form @submit.prevent="handleSubmitForm">
        <!-- <label for="detail">What to do ?</label> -->
        <!-- <div class="form-group row"> -->
        <div class="form-group input-group">
          <input class="form-control" :disabled="disabled" type="text" v-model="todo.detail" placeholder="What to do?" required>
          <button :disabled="disabled" class="btn btn-success btn-block btn-lg">
            ADD <i class="bi bi-plus-lg"></i>
          </button>
        </div>
        <!-- </div> -->
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    props: {
      disabled: Boolean
    },
    data() {
        return {
          todo: {
            detail: '',
          },
        }
    },
    methods: {
      async handleSubmitForm() {
        try {
          let apiURL = 'http://localhost:5000';
          await axios.post(apiURL, this.todo);
          // this.$router.push('/');
          this.todo = {
            detail: '',
          }
          this.$emit('refresh');
        } catch (error) {
          console.log(error)
        }
      },
    },
  }
</script>

<style>
</style>