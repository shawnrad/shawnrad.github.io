/*
	On Ready
*/
$(document).ready(function(){
    
});


function initialize_table() {
    //Clear previous table
    $("#flashcards").empty().append($("<tr>").attr("id", "headings"))

    //Convert from CSV to JSON
    db = CSV_to_JSON($("#dialog_textarea").val());

    //Dummy db
    //db = generate_JSON();

    if (!(db["subjects"].length==0)) {
        //Generate table from JSON
        initialize_from_JSON(db);

        //Set first column visible
        set_visible_column(get_class_name(Object.keys(db["subjects"][0])[0]))

        //Add table functionality 
        add_table_functions()
    }
    //Change to flashcards page
    $(":mobile-pagecontainer").pagecontainer("change", "#flashcards_page");
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

function csv_mend(fields) {
    index = 0
    while (index < fields.length) {
        field = fields[index]
        if (field.substr(0, 1) == '"') {
            if (field.substr(field.length - 1, field.length) == '"') {
                index += 1
            }
            else {
                fields.splice(index,2,fields[index]+=(", "+fields[index + 1]))
            }
        }
        else {
            index+=1
        }
    }

    return fields
}

function CSV_to_JSON(csv) {
    /*
    CSV is expected to be in the form:
    HEADER1,HEADER2,HEADER3,...,HEADER_N
    SUBJECT1,DATA_11,DATA21,...,DATA_N1
    ,DATA_12,,...,DATA_N2
    ...
    ,DATA_N2,,...,DATA_NN
    SUBJECT2,DATA_11,DATA21,...,DATA_N1
    ...
    */

    lines = csv.split("\n")
    headers = lines[0].split(",")

    lst = []
    data = {}
    for (line_num = 1; line_num < lines.length; line_num++) {
        fields = csv_mend(lines[line_num].split(","))

        // If the first entry is a comma, then we continue adding this the current entry
        if (fields[0] == "") {
            $.each(fields, function (index, field) {
                //Add if not empty
                if (field != "") {
                    data[headers[index]].push(field)
                }
            });
        }
        //Otherwise, we are adding a new entry
        else {
            if ( !( $.isEmptyObject(data) ) ) {
                lst.push(data)
            }
            data = {}
            $.each(fields, function (index, field) {
                data[headers[index]] = [field]
            });
        }
    }
    //Don't forget to add final object
    if (!$.isEmptyObject(data)) {
        lst.push(data)
    }

    db = {}
    db["subjects"] = lst
    
    return db
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
            new_dl = $("<ul>")
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