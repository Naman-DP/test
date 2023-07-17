// class ABC {
//     id: string
//     access_token?: {[k: string]: any}
//     access_token_count?: number
//     active_event?: {[k: string]: any}
//     activity?: number
//     birthdate?: string
//     count_event?: {[k: string]: any}
//     first_event?: {[k: string]: any}
//     last_event?: {[k: string]: any}
//     schedule_event?: {[k: string]: any}
//     provider_schedule_event?: {[k: string]: any}
//     email?: string
//     verified?: boolean
//     verification_token?: string
//     email_add_time?: number
//     phone?: string
//     phone_verified?: boolean
//     phone_verification_token?: string
//     phone_add_time?: number
//     family_name?: string
//     given_name?: string
//     type: string
//     provider: string[]
//     profile: string[]
//     profile_map?: string[]
//     scope?: {[k: string]: any}
//     created: number
//     timezone: number
//     survey?: string
//     light?: boolean
//     gender?: string
//     company_id?: string
//     assistant?: string[]
//     code?: string
//     doctor?: string[]
//     specialization?: string
// }

// console.log(Object.keys(new ABC()))



enum UPLOAD_ITEMS {
    FACESHEET = "facesheet",
    IMAGES = "images",
    CONSENTFORM = "consentform"
}
enum DOCUMENT_UPLOAD_SOURCE {
    CRON = "cron",
    QUESTIONNAIRE_COMPLETED = "questionnaires_completed"
}

function isDocumentUploadedThroughSource(source: DOCUMENT_UPLOAD_SOURCE) {
    
    if (source == DOCUMENT_UPLOAD_SOURCE.CRON)
        return true

    return false
}

console.log(isDocumentUploadedThroughSource(DOCUMENT_UPLOAD_SOURCE.CRON))