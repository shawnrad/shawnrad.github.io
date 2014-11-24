/*
    On Ready
*/
NUMBERS = ["0","1","2","3","4","5"]
SPANISH = ["Cero","Uno","Dos","Tres","Cuatro","Cinco"]
current_term = 0;
easyMode = false;
$(document).ready(function(){
    $('#spinner').mobiscroll().select({
        theme: 'android-ics light',
        display: 'inline',
        mode: 'scroller'
    });

    /*Cleanup spinner weirdness*/
    $("#spinner-button").hide();
    $("#spinner_dummy").hide();
    $(".dw").css("width","100%");

    setTest();
});

function setTest(){
    
    /*Remove stylings*/
    $(".dw-li").removeClass("correct").removeClass("incorrect");

    /*Get new term*/
    old_term = current_term
    do{
        current_term = Math.floor(Math.random()*NUMBERS.length)
    }while(current_term == old_term);

    /*Set term*/
    $("#term_text").text(NUMBERS[current_term]);

}

function checkSubmission(){
    answer = SPANISH[current_term];

    submission = SPANISH[$("#spinner").val()-1]

    if(answer == submission){
        $(".dw-sel").addClass("correct");
    } else {
        $(".dw-sel").addClass("incorrect");
    }

    setTimeout(setTest, 500)
}

$(function(){

});