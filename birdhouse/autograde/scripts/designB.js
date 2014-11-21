/*
	On Ready
*/
NUMBERS = ["0","1","2","3","4","5"]
SPANISH = ["Cero","Uno","Dos","Tres","Cuatro","Cinco"]
current_term = 0;
easyMode = false;
$(document).ready(function(){
    setTest();

    $('#easyMode').prop("checked",false)
        .change(function(){
            if ($(this).prop("checked") ){
                easyMode = true;
            }
            else{
                easyMode = false;
            }
            setTF();
        });

    //Hookup buttons to check for solution
    $("#multichoice").find(".option").on("vclick",function(event){
        //Highlight correct
        $.each($("#multichoice").find(".option"), function(index, opt){
            if ($(opt).text() == SPANISH[current_term]){
                $(opt).css("background","#80e6b2");
                return false;
            }
        });

        //Highlight user answer if incorrect
        if ($(this).text()!= SPANISH[current_term]){
            $(this).css("background","#ffb9b9");
        }

        setTimeout(setTest, 750);
    });

    $("#optionTrue").on("vclick",function(event){
        checkTF(true);
    });
    $("#optionFalse").on("vclick",function(event){
        checkTF(false);
    });

    
});

function setTF(){

    if(easyMode){
        $("#multichoice").hide()
        $("#truefalse").show()
    }
    else{
        $("#multichoice").show()
        $("#truefalse").hide()
    }
}

function setTest(){
    
    /*Clear formatting*/
    $(".option").css({
        background:""
    });

    /*Get new term*/
    old_term = current_term
    do{
        current_term = Math.floor(Math.random()*NUMBERS.length)
    }while(current_term == old_term);

    /*Set term*/
    $("#term_text").text(NUMBERS[current_term]);

    /*Set definitions*/
    answers = getAnswers();
    //Set multichoice
    $.each($("#multichoice").find(".option"), function(index, opt){
        answers;
        $(opt).text(answers[index]);
    });
    //Set TF
    truefalse_text = Math.random() <= 0.5 ? SPANISH[current_term] : answers[Math.floor(Math.random()*3)]
    $("#truefalse_text").text(truefalse_text);
    
    setTF();
}

//Return 4 possible solutions, one of which is the answer
function getAnswers(){
    //Shuffle all answers
    shuffled = shuffle(SPANISH.slice())
    //Take first 4
    shuffled.splice(4);
    if ( ($.inArray(SPANISH[current_term], shuffled) <0) ) {
        shuffled[Math.floor(Math.random()*3)] = SPANISH[current_term]
    }
    
    return shuffled
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


function checkTF(button){
    if (SPANISH[current_term] == $("#truefalse_text").text()){
        $("#optionTrue").css("background","#80e6b2");
        if (!(button)){
            $("#optionFalse").css("background","#ffb9b9");
        }
    }
    else{
        $("#optionFalse").css("background","#80e6b2");
        if (button){
            $("#optionTrue").css("background","#ffb9b9");
        }
    }

    setTimeout(setTest, 750);
}