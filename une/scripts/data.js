db = {}

function central_degeneration_list() {
    
    cd = []
    cd.push({
        "disease": "Alzheimers Disease",
        "onset": ["60+ years old", "Female > Male"],
        "pathology": ["Atrophy of cerebral cortex and hipocampus", "Ventriculomegaly", "Neuritic plaque (a-beta-myloid),", "neurofibrillary tangles (Tau) and APP", "Most common neuro degenerative disease"],
        "presentation": ["Memory impairment, and", "progresses to language", "Visual/spatial deficits", "and progresses to delusions", "ADL effected"],
        "medical_diagnostics": ["Imaging to exclude other etiologies", "CT and MRI can show nothing in early disease", "EEG shows non-specific changes", "PET - used but not practical"],
        "treatment": ["Cholinesterase inhibitors - mild efficacy", "anti-oxidants - mild influence", "depression = SSRIs", "seizures = anti-convulsants"]
    });

    return cd;
}

function initialize_db() {
    db["central_degeneration"] = central_degeneration_list()
}