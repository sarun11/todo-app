function dateFunc() {
    var d = new Date();
    d = d.toLocaleDateString('en-US');
    $("#date").html(d);
}; 
$(document).on("keydown", "form", function(event) { 
    return event.key != "Enter";
});

 $(document).ready(function(){
    //  calling the date function to insert date at the top
    dateFunc();

    var csrfToken = $("input[name=csrfmiddlewaretoken]").val();

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
               $('#task-list').append("<div class= 'card mb-1' id='task' data-id='" + response.task.id + "'><div class='card-body' id='taskCard' data-id='"+ response.task.id + "'>" +response.task.task_name +
                "<button type='button' class='close' data-id='"+ response.task.id + "' style=float:right;'><span aria-label='true'>&times;</span></button></div></div>") 
            }
        })

        // reset the for after creating a new task
        $('#createTaskForm')[0].reset();
    });

      // Working on task complete
      $("#task-list").on('click', '.card-body', function(){
        // var dataID = $(this).data("id");
        var dataID = $(this).attr("data-id");

        $.ajax({
            url : '/tasks/'+ dataID + '/completed/',
            data : {
                csrfmiddlewaretoken : csrfToken,
                id: dataID,
            },
            type: 'post',
            success: function(){
                var cardItem = $('#taskCard[data-id="' + dataID + '"]');
                cardItem.css('text-decoration', 'line-through').hide().slideDown();
                $('#task[data-id="' + dataID + '"]').hide();
                $("#task-list").append(cardItem);
            }
        });
      }).on('click', 'button.close', function(event){
        // alert('X clicked');
        event.stopPropagation();

        var dataID = $(this).attr("data-id");
        // alert(dataID);

        $.ajax({
            url: 'tasks/' + dataID + '/delete/', 
            data:  {
                csrfmiddlewaretoken : csrfToken,
                id: dataID,
            },
            type: 'post',
            dataType: 'json',
            success: function() {
                $('#taskCard[data-id="' + dataID + '"]').remove();
            }
        });
      });
});
 


