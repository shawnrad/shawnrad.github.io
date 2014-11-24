
/*
	On Ready
*/
NUMBERS = ["0","1","2","3","4","5"]
SPANISH = ["cero","uno","dos","tres","uatro","cinco"]
current_term = 0;
easyMode = false;
$(document).ready(function(){
    setTest();

    $('#easyMode').prop("checked",false)
        .change(function(){
            if ($(this).prop("checked") ){
                giveVals();
                easyMode = true;
            }
            else{
                takeVals();
                easyMode = false;
            }
        });
});

function setTest(){
    
    /*Get new term*/
    old_term = current_term
    do{
        current_term = Math.floor(Math.random()*NUMBERS.length)
    }while(current_term == old_term);

    /*Set term*/
    $("#term_text").text(NUMBERS[current_term]);

    /*Create text inputs*/
    //Clear
    $("#definition").html('');

    wordLength = SPANISH[current_term].length

    for (var i = 1; i<=wordLength;i++){
        letterBox = $("<input>").addClass("letter")
            .attr("name","letter"+i)
            .prop("type","text")
            .prop("maxlength",1)
            .prop("tabindex",i)
            .on("keyup",function(event){
                
                chr = event.keyCode;
                shft = event.shiftKey; 
                
                if (chr >= 65 && chr <= 90){
                    chr = chr + (shft ? 0 : 32);
                    $(this).val(String.fromCharCode(chr));

                    el = $(this).next()
                    console.log($(this).prop("tabIndex"))
                    console.log(wordLength);
                    if($(this).prop("tabIndex") != wordLength){
                        while(el.prop("tabIndex")<0){
                            el = $(el).next()
                        }
                        el.focus();
                    } 
                    else {
                        $(this).blur();
                    }
                }
            })

        $("#definition").append(letterBox)
    }

    if(easyMode){
        giveVals();
    }
}

function giveVals(){
    answer = SPANISH[current_term]
    
    $.each($(".letter"), function(index, inp){
        if (index != 0 && index != answer.length-1){
            $(inp).addClass("given")
                .prop("tabIndex",-1);
        }
    });
}

function takeVals(){
    $.each($(".letter"), function(index, inp){
        if ($(inp).hasClass("given")) {
            $(inp).removeClass("given")
                .prop("tabIndex",index);
        }
    });
}

function checkSubmission(){
    answer = SPANISH[current_term];

    $.each($(".letter"), function(index, inp){

        if($(inp).hasClass("given")){
            $(inp).val(answer[index].toLowerCase())
                .removeClass("given")
                .addClass("given_reveal")

        }
        else{
            if($(inp).val().toLowerCase() == answer[index].toLowerCase()){
                $(inp).addClass("correct");
            }
            else{
                $(inp).addClass("incorrect");
            }

            $(inp).val(answer[index].toLowerCase());
        }
    });

    setTimeout(setTest, 750)
}