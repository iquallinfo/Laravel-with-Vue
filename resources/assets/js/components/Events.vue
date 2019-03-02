<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <button @click="initAddEvent()" class="btn btn-primary btn-xs pull-right">
                            + Add New Event
                        </button>
                        My Events
                    </div>

                    <div class="panel-body">
                        <table class="table table-bordered table-striped table-responsive" v-if="all_events.length > 0">
                            <thead>
                            <tr>
                                <th>
                                    No.
                                </th>
                                <th>
                                    Title
                                </th>
                                <th>
                                    Start
                                </th>
                                <th>
                                    end
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(event, index) in all_events">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    {{ event.title }}
                                </td>
                                <td>
                                    {{ event.start_date }}
                                </td>
                                <td>
                                    {{ event.end_date }}
                                </td>
                                <td>
                                    <button @click="initUpdate(index)" class="btn btn-success btn-xs">Edit</button>
                                    <button @click="deleteEvent(index)" class="btn btn-danger btn-xs">Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

      

    </div>
</template>

<script>
    export default {
        data(){
            return {
                event: {
                    title: '',
                    start_date: '',
                    end_date: ''
                },
                event_errors: [],
                all_events: [],
                update_event: {},
            }
        },
        mounted()
        {
            this.readeEvents();
        },
        methods: {
            initAddEvent()
            {
                $("#add_event_model").modal("show");
            },
            readeEvents()
            {
                this.all_events = [];
                axios.get('/events')
                .then(response => {
                    this.all_events = response.data.events;
                });
            },
            deleteEvent()
            {
                let conf = confirm("Do you ready want to delete this event?");
                if (conf === true) {

                    axios.delete('/events/' + this.all_events[index].id)
                        .then(response => {
                            this.all_events.splice(index, 1);
                        })
                        .catch(error => {

                        });
                }
            },
           
        }
    }
</script>