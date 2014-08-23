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
    
    set_visible_column("disease");
});

function set_visible_column(class_name) {
    //Set whole table to hidden class
    $(".disease").addClass("hidden")
    $(".onset").addClass("hidden")
    $(".pathology").addClass("hidden")
    $(".presentation").addClass("hidden")
    $(".medical_diagnostics").addClass("hidden")
    $(".treatment").addClass("hidden")
    //Clear headers & selected class_name
    $("th").removeClass("hidden");
    $("."+class_name).removeClass("hidden")
}

function add_row(disease) {
    //Create new row
    new_row = $("<tr>")
        .attr("id", disease["disease"])
    // Add disease
    new_row.append($("<td>")
            .addClass("disease")
            .text(disease["disease"])
        )
    // Add onset
    onset = $("<td>").addClass("onset")
    onset_list = $("<dl>")
    $.each(disease["onset"], function (index, value) {
        onset_list.append($("<li>").text(value));
    });
    new_row.append(onset.append(onset_list))
        
    // Add pathology
    pathology = $("<td>").addClass("pathology")
    pathology_list = $("<dl>")
    $.each(disease["pathology"], function (index, value) {
        pathology_list.append($("<li>").text(value));
    });
    new_row.append(pathology.append(pathology_list))
    
    // Add presentation
    presentation = $("<td>").addClass("presentation")
    presentation_list = $("<dl>")
    $.each(disease["presentation"], function (index, value) {
        presentation_list.append($("<li>").text(value));
    });
    new_row.append(presentation.append(presentation_list))
    
    // Add medical_diagnostics
    medical_diagnostics = $("<td>").addClass("medical_diagnostics")
    medical_diagnostics_list = $("<dl>")
    $.each(disease["medical_diagnostics"], function (index, value) {
        medical_diagnostics_list.append($("<li>").text(value));
    });
    new_row.append(medical_diagnostics.append(medical_diagnostics_list))

    //Add treatment
    treatment = $("<td>").addClass("treatment")
    treatment_list = $("<dl>")
    $.each(disease["treatment"], function (index, value) {
        treatment_list.append($("<li>").text(value));
    });
    new_row.append(treatment.append(treatment_list))

    $("#flashcards").append(new_row)
}