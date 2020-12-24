function dateFunc() {
    var d = new Date();
    d = d.toLocaleDateString('en-US');
    $("#date").html(d);
}; 


 $(document).ready(function(){
    //  calling the date function to insert date at the top
    dateFunc();

    $('#createTaskButton').click(function(){
        // Serialise the data from the form 
        serialisedData = $('#createTaskForm').serialize();
        // console.log(serialised_data);

        // now use the ajax function inside the handler of the onclick event

        $.ajax({
            // ajax function takes dictionary as argument
            url: $("createTaskForm").data('url'),
            data: serialisedData,
            method: 'post',
            success: function(response){
               $('#task-list').append("<div class= 'card mb-1'><div class='card-body'>" +response.task.task_name +
                "<button type='button' class='close' style='float:right;'><span aria-label='true'>&times;</span></button></div></div>") 
            }
        })
        $('#createTaskForm')[0].reset();
    });
});
 


