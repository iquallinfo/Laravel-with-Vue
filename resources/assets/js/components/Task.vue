<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <button @click="initAddTask()" class="btn btn-primary btn-xs pull-right">
                            + Add New Task
                        </button>
                        My Tasks
                    </div>

                    <div class="panel-body">
                        <table id="example" class="table table-bordered table-striped table-responsive" v-if="tasks.length > 0">
                            <thead>
                            <tr>
                                <th>
                                    No.
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Image
                                </th>
                                <th width="30%">
                                    Description
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(task, index) in tasks">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    {{ task.name }}
                                </td>
                                <td>
                                    <img @click="enlargeImage(task.image)" :src="task.image" height="50px" width="50px">
                                </td>
                                <td width="30%">
                                    {{ task.description }}
                                </td>
                                <td>
                                    <button @click="initUpdate(index)" class="btn btn-success btn-xs">Edit</button>
                                    <button @click="deleteTask(index)" class="btn btn-danger btn-xs">Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" tabindex="-1" role="dialog" id="add_task_model">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Add New Task</h4>
                    </div>
                    <div class="modal-body">

                        <div class="alert alert-danger" v-if="errors.length > 0">
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </div>

                        <div class="form-group">
                            <label for="name">Name:</label>
                            <input type="text" name="name" id="name" placeholder="Task Name" class="form-control"
                                   v-model="task.name">
                        </div>
                    
                        <div class="form-group">
                            <label for="description">Description:</label>
                            <textarea name="description" id="description" cols="30" rows="5" class="form-control"
                                      placeholder="Task Description" v-model="task.description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="image">Image:</label>
                            <input type="file" v-on:change="onFileChange" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" @click="createTask" class="btn btn-primary">Submit</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" tabindex="-1" role="dialog" id="update_task_model">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Update Task</h4>
                    </div>
                    <div class="modal-body">

                        <div class="alert alert-danger" v-if="errors.length > 0">
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </div>

                        <div class="form-group">
                            <label>Name:</label>
                            <input type="text" placeholder="Task Name" class="form-control"
                                   v-model="update_task.name">
                        </div>
                        <div class="form-group">
                            <label for="description">Description:</label>
                            <textarea cols="30" rows="5" class="form-control"
                                      placeholder="Task Description" v-model="update_task.description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="description">Image:</label>
                            <img :src="update_task.image" height="50px" width="50px">
                            <input type="file" v-on:change="onFileChange" class="form-control">
                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" @click="updateTask" class="btn btn-primary">Submit</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

<!-- Image Enlarge modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="myEnlargeImageModal">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <img class="modal-content" id="img01" :src="enlargeImageSrc">
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->


    </div>
</template>

<script>
    export default {
        data(){
            return {
                task: {
                    name: '',
                    description: ''
                },
                errors: [],
                tasks: [],
                update_task: {},
                image: '',
                enlargeImageSrc: ''
            }
        },
        mounted()
        {
            this.readTasks();
        },
        methods: {
            initAddTask()
            {
                $("#add_task_model").modal("show");
            },
            enlargeImage(e){
                this.enlargeImageSrc = e;
                $("#myEnlargeImageModal").modal("show");
            },
           createTask()
            {
                axios.post('/task', {
                    name: this.task.name,
                    description: this.task.description,
                    image: this.image
                })
                    .then(response => {
 
                        this.reset();
                        this.tasks.unshift(response.data.task);
                        
 
                        $("#add_task_model").modal("hide");
 
                    })
                    .catch(error => {
                        this.errors = [];
                        if (error.response.data.name) {
                            this.errors.push(error.response.data.name[0]);
                        }
 
                        if (error.response.data.description) {
                            this.errors.push(error.response.data.description[0]);
                        }
                    });
            },
            reset()
            {
                this.task.name = '';
                this.task.description = '';
                this.image = '';
            },
            readTasks()
            {
                this.tasks = [];
                this.image = '';
                axios.get('/task')
                .then(response => {
                    this.tasks = response.data.tasks;
                });
             //   setTimeout(this.initializeDatatable,1000);
            },
            initializeDatatable(){
                if ( $.fn.DataTable.isDataTable('#example') ) {
                    $('#example').DataTable().destroy();
                }
                $('#example').DataTable({
                   aaSorting: []
               });
            },
            initUpdate(index)
            {
                this.errors = [];
                $("#update_task_model").modal("show");
                this.update_task = this.tasks[index];
            },
            updateTask()
            {
                axios.patch('/task/' + this.update_task.id, {
                    name: this.update_task.name,
                    description: this.update_task.description,
                    image: this.image
                })
                .then(response => {

                    $("#update_task_model").modal("hide");

                })
                .catch(error => {
                    this.errors = [];
                    if (error.response.data.errors.name) {
                        this.errors.push(error.response.data.errors.name[0]);
                    }

                    if (error.response.data.errors.description) {
                        this.errors.push(error.response.data.errors.description[0]);
                    }
                });

                setTimeout(this.readTasks, 1000);
                
            },
            deleteTask(index)
            {
                let conf = confirm("Do you ready want to delete this task?");
                if (conf === true) {

                    axios.delete('/task/' + this.tasks[index].id)
                        .then(response => {

                            this.tasks.splice(index, 1);

                        })
                        .catch(error => {

                        });
                }
            },
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                let reader = new FileReader();
                let vm = this;
                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
        }
    }
</script>