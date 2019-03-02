<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <full-calendar :events="events" :config="config"></full-calendar>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                event: [],
                 events: [
                  ],
                config: {
                        defaultView: 'month',
                        drop() {
                          //handle drop logic in parent
                        },
                      },
            }
        },
        mounted()
        {
            this.readeEvents();
        },
        methods: {
            readeEvents()
            {
                this.events = [];
                axios.get('/events')
                .then(response => {
                    this.events = response.data.events;
                });
            }
        }
    }
</script>