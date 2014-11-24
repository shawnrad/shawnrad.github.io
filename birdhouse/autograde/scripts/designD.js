/*
	On Ready
*/
NUMBERS = ["1","2","3","4","5"]
SPANISH = ["Uno","Dos","Tres","Cuatro","Cinco"]
current_term = 0;
easyMode = false;
selected = null;
selectedID = null;

$(document).ready(function(){
    setTest();
});

function setSelected(id){
    //Remove old selected
    $(".selected").removeClass("selected");

    //Set selectedID, selected value
    selectedID = id;
    selected = $("#"+id).text()
    
    //Add selected class
    $("#"+id).addClass("selected");
}

function setCompleted(id){
    $("#"+id).addClass("correct")

    setTimeout(function(){
        $("#"+id).prop("disabled",true)
        .removeClass("selected")
        .removeClass("correct")
        .addClass("completed")

        if( $(".completed").size() == (NUMBERS.length)*2){
        setTest()
    }
    },
    500);
}

function setIncomplete(id){
    $("#"+id).addClass("incorrect")

    setTimeout(function(){
        $("#"+id).removeClass("selected")
        .removeClass("incorrect")
    },
    500);
}

function setTest(){
    
    /*Clear formatting*/
    $(".option").removeClass("completed")
        .prop("disabled",false);

    
    //Shuffle order
    lefts = shuffle(NUMBERS.slice());
    rights = shuffle(SPANISH.slice());

    //Set left & right vals
    $(".left").each(function(index, btn){
        $(btn).text(lefts[index])
            .on('vclick', function(event){
                if(selected != null){
                    
                    //If we already selected another left...
                    if ( $.inArray(selected, lefts) > -1 ){
                        setSelected($(this).attr("id"));
                    }else{
                        //Otherwise, check for a match
                        
                        //Match = disable
                        if ( $.inArray($(this).text(),NUMBERS) == $.inArray(selected,SPANISH) ){
                            console.log("Matched")
                            setCompleted($(this).attr("id"));
                            setCompleted(selectedID)
                        }
                        //Non-match = reset buttons
                        else{
                            console.log("No match")
                            setIncomplete($(this).attr("id"));
                            setIncomplete(selectedID)
                        }
                        //Unselect
                        selected = null;
                        selectedID = null;
                    }
                }else{
                    //Set selected to this
                    setSelected($(this).attr("id"))
                }
            });
    });

    $(".right").each(function(index, btn){
        $(btn).text(rights[index])
            .on('vclick', function(event){
                if(selected != null){
                    //If we already selected another left...
                    if ($.inArray(selected, rights) >-1 ){
                        setSelected($(this).attr("id"));
                    }
                    //Otherwise, check for a match
                    else{
                        //Match = disable
                        if ( $.inArray($(this).text(),SPANISH) == $.inArray(selected,NUMBERS) ){
                            setCompleted($(this).attr("id"));
                            setCompleted(selectedID)
                        }
                        //Non-match = reset buttons
                        else{
                            setIncomplete($(this).attr("id"));
                            setIncomplete(selectedID)
                        }
                        //Unselect
                        selected = null;
                        selectedID = null;
                    }
                }else{
                    //Set selected to this
                    setSelected($(this).attr("id"))
                }
            });
    })

}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}