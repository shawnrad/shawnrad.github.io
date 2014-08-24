/*
	On Ready
*/
$(document).ready(function(){
    initialize_table();
});


function initialize_table() {
    //Fetch JSON
    //TODO: Open dialog box to allow user to paste CSV
    db = generate_JSON();

    //Generate table from JSON
    initialize_from_JSON(db);

    //Set first column visible
    set_visible_column(get_class_name(Object.keys(db["subjects"][0])[0]))

    //Add table functionality 
    add_table_functions()
}

function generate_JSON() {
    db = {}

    cd = []
    cd.push({
        "Disease": "Alzheimers Disease",
        "Onset": ["60+ years old", "Female > Male"],
        "Pathology": ["Atrophy of cerebral cortex and hipocampus", "Ventriculomegaly", "Neuritic plaque (a-beta-myloid),", "neurofibrillary tangles (Tau) and APP", "Most common neuro degenerative disease"],
        "Presentation": ["Memory impairment, and", "progresses to language", "Visual/spatial deficits", "and progresses to delusions", "ADL effected"],
        "Medical Diagnostics": ["Imaging to exclude other etiologies", "CT and MRI can show nothing in early disease", "EEG shows non-specific changes", "PET - used but not practical"],
        "Treatment": ["Cholinesterase inhibitors - mild efficacy", "anti-oxidants - mild influence", "depression = SSRIs", "seizures = anti-convulsants"]
    });

    db["subjects"] = cd

    return db;
}

function initialize_from_JSON(db) {
    subjects = db["subjects"]

    if ( !(subjects.length == 0) ) {

        //Iterate over the first subject to get headers
        header_classes = []
        $.each(Object.keys(subjects[0]), function (key, value) {
            //Add header classes
            header_classes.push(get_class_name(value));
            //Add header button
            $("#headings").append(
                $("<th>").append(
                    $("<button>").addClass("ui-btn")
                    .addClass("ui-corner-all")
                    .text(value)
                    .click(function () {
                        set_visible_column(get_class_name(value));
                    })
                )
            );
        });

        //Iterate over all subjects and add them to the table
        $.each(subjects, function (index, value) {
            add_row(value);
        });
    }    
}

function get_class_name(str) {
    str = str.toLowerCase().replace(" ", "_")
    return str
}

function add_row(subject) {

    //Create new row
    new_row = $("<tr>")
        .attr("id", get_class_name(Object.keys(subject)[0]))
    
    $.each(Object.keys(subject), function (index, key) {
        // Assert "value" is a list
        value = [].concat(subject[key])

        new_td = $("<td>").addClass(get_class_name(key))
        new_div = $("<div>").addClass(get_class_name(key))
        if (value.length == 1) {
            new_div.text(value)
        }
        else {
            new_dl = $("<dl>")
            $.each(value, function (index, info) {
                new_dl.append($("<li>").text(info))
            });
            new_div.append(new_dl)
        }
        new_td.append(new_div)
        new_row.append(new_td)
    });

    $("#flashcards").append(new_row)
}

function add_table_functions(){
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

}

function set_visible_column(class_name) {
    $.each(header_classes, function (index, header_class) {
        $("." + header_class + " div").removeClass("lock_column").removeClass("lock_td").addClass("hidden")
    });

    //Clear headers & selected class_name
    $("th div").removeClass("hidden");
    $("." + class_name + " div").removeClass("hidden").addClass("lock_column")
}