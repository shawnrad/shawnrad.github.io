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
    
});

function setTest(){
    
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

    setTimeout(setTest, 750)
}