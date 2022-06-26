class Form {

    constructor(key, errorInstance = null) {
        this._error = errorInstance
        this._keyLS = key
    }
    
    // Getter/Setter
    get error() {
        return this._error
    }

    // Check if empty
    validate(input) {
        return !input.value ? false : true
    }

    // Check if email is valid
    checkEmail(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }

    // Save
    saveToLS(contact) {
        const contacts = this.getFormLS()
        // Add new contact
        contacts.push(contact)
        // Save in localstorage
        localStorage.setItem(this._keyLS, JSON.stringify(contacts))
    }

    // Get
    getFormLS() {
        return JSON.parse(localStorage.getItem(this._keyLS)) || []
    }
}

export default Form