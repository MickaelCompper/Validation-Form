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
        const form = new Form('contact', error)
        
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
                    form.checkEmail(input.value) ? contact.email = input.value : form.error.msg = input.id
                }
                else {
                    // Test
                    if (isNaN(input.value)) {
                        form.error.msg = input.id
                    }
                    else {
                        contact.age = input.value
                    }
                }
            }
            else {
                // Reference Error
                // Hydratation de la prop `msg` de l'instance de `MyError`
                form.error.msg = 'empty'
            }
        })

        // Check if form is Valid
        if (form.error.msg === null) {
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
            // Display error message
            document.querySelector('.error').textContent = form.error.msg === 'empty' ? 'Tous les champs ne sont pas remplis' : `Le champ en erreur est : ${form.error.msg}`
            // Timer de 3sec, pour faire disparaitre le msg d'erreur
            setTimeout(() => {
                // On cache l'affichage
                document.querySelector('.error').textContent = ''
                // On remet à null pour ne pas afficher d'erreur lors de la prochaine soumission, s'il n'y en a pas
                this.error = null
            }, 3000)
        }
        // Vider le form après traitement (Simulation d'un click sur un btn type=reset)
        this.reset()
    })
})
