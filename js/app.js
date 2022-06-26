// Imports des dépendances
import Form from './class/Form.js'
import MyError from './class/MyError.js'

// Listen DOM
document.addEventListener('DOMContentLoaded', function() {

    // Listen Form Submit
    document.querySelector('form').addEventListener('submit', function(event) {
        /**
         * 0 - Block Auto refresh
         * 1 - Get inputs 
         * 2 - Validate
         * 3 - Return (Success => Save to LS / Error => Display Msg)
         */
        // 0 - Block Refresh
        event.preventDefault()
        // 1 - Get inputs
        const $inputs = this.querySelectorAll('input')
        // Ajout du nécessaire pour gérer les erreurs
        const error = new MyError
        // Get Form Class to validate fields
        const form = new Form
        // Contact form
        const contact = { name: null, email: null, age: null }

        // Loop inputs
        $inputs.forEach(input => {
            if (form.validate(input)) {
                // Add prop to contact
                // Check which prop
                if (input.id === 'name') {
                    contact.name = input.value
                }
                else if (input.id === 'email') {
                    form.checkEmail(input.value) ? contact.email = input.value : error.msg = input.id
                }
                else {
                    // Test
                    if (isNaN(input.value)) {
                        error.msg = input.id
                    }
                    else {
                        contact.age = input.value
                    }
                }
            }
            else {
                // Reference Error
                // OUT and display
                error.msg = 'all'
            }
        })

        // Check if form is Valid
        if (error.msg === null) {
            // Enregistrement du contact avec le LS
            form.saveToLS(contact)
            // Display all contacts
            const contacts = form.getFormLS()

            // Template
            contacts.map(contact => {
                document.querySelector('.contacts')
                    .insertAdjacentHTML('beforeend', `<li>${contact.name}</li>`)
            })
        }
        else {
            document.querySelector('.error').textContent = error.msg === 'all' ? 'Tous les champs ne sont pas remplis' : `Le champ en erreur est : ${error.msg}`
            setTimeout(() => document.querySelector('.error').textContent = '', 3000)
        }
        // Vider le form après traitement
        this.reset()
    })
})
