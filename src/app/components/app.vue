<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="task.title"
                    placeholder="Insert A Task"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    cols="30"
                    rows="10"
                    v-model="task.description"
                    class="form-control"
                    placeholder="Insert A Description"
                  ></textarea>
                </div>
                <template v-if="!edit">
                  <button class="btn btn-primary btn-block">Send</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Update</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks" v-bind:key="task._id">
                <td>{{task.title}}</td>
                <td>{{task.description}}</td>
                <td>
                   <button @click="deleteTask(task._id)" class="btn btn-sm btn-danger">Delete</button>
                   <button @click="editTask(task._id)" class="btn btn-sm btn-warning">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      task: {
        title: "",
        description: ""
      },
      tasks: [],
      edit: false
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    addTask() {
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(this.task),
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
           this.getTasks();
        });
    },
    getTasks() {
      fetch("/api/tasks")
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
        });
    },
    deleteTask(id) {
       fetch("/api/tasks/" + id, {
         method: "DELETE",
         headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
         }
         })
        .then(res => res.json())
        .then(data => {
           this.getTasks();
        })
    },
    editTask(id) {
       fetch("/api/tasks/"+ id)
        .then(res => res.json())
        .then(data => {
           this.edit = true;
           this.task = data;
        });
    },
    updateTask() {
       fetch("/api/tasks/"+this.task._id, {
        method: "PUT",
        body: JSON.stringify(this.task),
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
           this.task = {title: "",description: ""};
           this.edit = false;
           this.getTasks();
        });
    },
    sendTask() {
       if(!this.edit){
          return this.addTask();
       }
       return this.updateTask();
    }

  }
};
</script>