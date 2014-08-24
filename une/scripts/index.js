/*
	On Ready
*/
$(document).ready(function(){
    
    initialize_db();
    
    //Choose Flashcard set
    diseases = db["central_degeneration"]
    
    //Fill table
    $.each(diseases, function (index, value) {
        add_row(value);
    });
    
    //Add onclick to headings
    $.each($("#headings button"), function (index, value) {
        $(value).click(function () {
            set_visible_column($(value).text().toLowerCase().replace(" ", "_"));
        });
    });

    //Add properties to table data (td)
    $.each($("td"), function (index, value) {
        //Add hover functionality to table
        $(value).hover(function () {
            //ON MOUSE ENTER
            text_div = $(this).children("div")
            $(text_div).removeClass("hidden");            
        },
        function () {
            //ON MOUSE LEAVE
            text_div = $(this).children("div") 
            if (!($(text_div).hasClass("lock_column") || $(text_div).hasClass("lock_td"))) {
                $(text_div).addClass("hidden");
            }
        })

        //Add double-click functionality on hover
        $(value).add($(value).children("div")).dblclick(function () {
            text_div = $(this).children("div")
            $(text_div).removeClass("hidden");
            if (!$(text_div).hasClass("lock_column")) {
                //If previously locked, unlock
                if ($(text_div).hasClass("lock_td")) {
                    $(text_div).removeClass("lock_td");
                }
                else {
                    $(text_div).addClass("lock_td");
                }
            }
        })
    });

    

    set_visible_column("disease");
});

function set_visible_column(class_name) {
    //Add "hidden" class to each table div
    $(".disease div").removeClass("lock_column").removeClass("lock_td").addClass("hidden")
    $(".onset div").removeClass("lock_column").removeClass("lock_td").addClass("hidden")
    $(".pathology div").removeClass("lock_column").removeClass("lock_td").addClass("hidden")
    $(".presentation div").removeClass("lock_column").removeClass("lock_td").addClass("hidden")
    $(".medical_diagnostics div").removeClass("lock_column").removeClass("lock_td").addClass("hidden")
    $(".treatment div").removeClass("lock_column").removeClass("lock_td").addClass("hidden")

    //Clear headers & selected class_name
    $("th div").removeClass("hidden");
    $("." + class_name + " div").removeClass("hidden").addClass("lock_column")
}

function add_row(disease) {
    //Create new row
    new_row = $("<tr>")
        .attr("id", disease["disease"])
    // Add disease
    new_row.append($("<td>")
            .addClass("disease")
                .append($("<div>")
                .text(disease["disease"])
                )
            )

    // Add onset
    onset = $("<td>").addClass("onset")
    onset_list = $("<dl>")
    $.each(disease["onset"], function (index, value) {
        onset_list.append($("<li>").text(value));
    });
    new_row.append(onset.append($("<div>").append(onset_list)))
        
    // Add pathology
    pathology = $("<td>").addClass("pathology")
    pathology_list = $("<dl>")
    $.each(disease["pathology"], function (index, value) {
        pathology_list.append($("<li>").text(value));
    });
    new_row.append(pathology.append($("<div>").append(pathology_list)))
    
    // Add presentation
    presentation = $("<td>").addClass("presentation")
    presentation_list = $("<dl>")
    $.each(disease["presentation"], function (index, value) {
        presentation_list.append($("<li>").text(value));
    });
    new_row.append(presentation.append($("<div>").append(presentation_list)))
    
    // Add medical_diagnostics
    medical_diagnostics = $("<td>").addClass("medical_diagnostics")
    medical_diagnostics_list = $("<dl>")
    $.each(disease["medical_diagnostics"], function (index, value) {
        medical_diagnostics_list.append($("<li>").text(value));
    });
    new_row.append(medical_diagnostics.append($("<div>").append(medical_diagnostics_list)))

    //Add treatment
    treatment = $("<td>").addClass("treatment")
    treatment_list = $("<dl>")
    $.each(disease["treatment"], function (index, value) {
        treatment_list.append($("<li>").text(value));
    });
    new_row.append(treatment.append($("<div>").append(treatment_list)))

    $("#flashcards").append(new_row)
}