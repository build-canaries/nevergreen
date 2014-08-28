//every 5 seconds
    //call /projects
    //foreach proj
        //add li

setInterval(function(){
    $.getJSON("/projects").then(function(data){
        $('#projects').empty();
        data.body.forEach(function(project){
            var buildStatus = project.lastBuildStatus;
            if(buildStatus !== "Success"){
                $('#projects').append('<li>' + project.name +'</li>');
            }
        });
    });
}, 5000);