function dateFunc() {
    var d = new Date();
    d = d.toLocaleDateString('en-US');
    $("#date").html(d);
}; 


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
               $('#task-list').append("<div class= 'card mb-1'><div class='card-body' id='taskCard' data-id='" + response.task.id + "'>" +response.task.task_name +
                "<button type='button' class='close' style='float:right;'><span aria-label='true'>&times;</span></button></div></div>") 
            }
        })

        // reset the for after creating a new task
        $('#createTaskForm')[0].reset();
    });

      // Working on task complete
      $("#task-list").on('click', '.card-body', function(){
        // var dataID = $(this).data("id");
        var dataID = $(this).attr("data-id");

        // alert(dataID);
        // console.log(dataID);
        // console.log("clicked");

        $.ajax({
            url : '/task/'+ dataID + '/completed/',
            data : {
                csrfmiddlewaretoken : csrfToken,
                id: dataID,
            },
            type: 'post',
            success: function(){
                var cardItem = $('#taskCard[data-id="' + dataID + '"]');
                cardItem.css('text-decoration', 'line-through').hide().slideDown();

                $("#task-list").append(cardItem);
            }
        });
      });
});
 


