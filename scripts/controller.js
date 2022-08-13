'use strict';

export class Controller {
    constructor(model, view, payload) {
        this.model = model
        this.view = view
        this.formName = payload.formName
        this.formNameSelector = document.querySelector( "#" + this.formName)
        this.createContact = payload.createContact
        this.createContactSelector = document.querySelector("." + this.createContact)
        this.model.init(this.formName)
        this.view.init(this.formNameSelector, this.createContactSelector)
    }

    handlers () {
        const searchOptions = document.querySelector(`#search_options`)
        let debounce = this.debounce(this.searchContactHandler, 400)

        this.formNameSelector.addEventListener(`submit`, this.submitHandler)
        document.addEventListener(`DOMContentLoaded`, this.loadHandler)
        searchOptions.addEventListener(`input`, debounce)
        searchOptions.addEventListener(`change`, this.searchSelectingHandler)
        searchOptions.addEventListener(`click`, this.searchClearingHandler)
    }

    submitHandler = (event) => {
        event.stopPropagation()
        event.preventDefault()

        let inputs = document.querySelector(`#contactForm`).querySelectorAll(`input`)
        let setData = null

        if (inputs instanceof NodeList) setData = Array.from(inputs)

        let savedData = setData.reduce((acc, item) => {
            if(!item.value.trim()) throw new Error(`Fill inputs`)
            acc[item.name] = item.value
            if (isNaN(acc.phone) && acc.phone) throw new Error(`Wrong phone number`)
            return acc
        }, {})

        this.model.setData(savedData)


        if (document.querySelector(`#no-contact`)){
            this.view.removeContact(`#no-contacts`)
        }

        const data = this.model.data

        if (data && document.querySelector(`#no-contacts`)) {
            this.view.removeElement(`#no-contacts`)
            this.view.renderContactContainer()
        }
        if (document.querySelector(`#contact-container`)){
            console.log(`123`)
            this.view.removeContacts()
            this.view.renderContactContainer()
        }

        data.sort((a, b) => a.name > b.name ? 1 : -1)

        console.log(data)

        data.forEach(contact => {
            this.view.renderContact(contact)
        })

        this.view.clearForm()

        if (this.model.data) {
            const contactContainer = document.querySelector(`#contact-container`)
            contactContainer.addEventListener(`click`, this.contactHandlers)
        }
    }

    loadHandler = () => {

        const data = this.model.data

        if (!data) return this.view.renderNoContacts()

        this.view.renderContactContainer()

        data.sort((a, b) => a.name > b.name ? 1 : -1)

        data.forEach(contact => {
            this.view.renderContact(contact)
        })

        if (this.model.data) {
            const contactContainer = document.querySelector(`#contact-container`)
            contactContainer.addEventListener(`click`, this.contactHandlers)
        }

    }

    contactHandlers = (event) => {
        event.stopPropagation()
        event.preventDefault()

        if (event.target.classList.contains(`contact_remove`)) {
            const id = +event.target.closest(`.contact`).getAttribute(`data-id`)
            this.model.removeContact(id)
            this.view.removeContact(event)
            if (!this.model.data) {
                document.querySelector(`#contact-container`).remove()
                this.view.renderNoContacts()
            }
        }

        if(event.target.classList.contains(`contact_change`)) {
            const id = +event.target.closest(`.contact`).getAttribute(`data-id`)
            this.idChange = id
            const data = this.model.data
            let contact = data.filter(contact => contact.id === id)[0]
            const formChange = `formChange`

            this.view.hideForm()

            this.view.changeContact(this.formName, contact)

            document.querySelector("#" + formChange).addEventListener(`submit`, this.changeHandler)
        }

        if(event.target.classList.contains(`contact_info`)) {
            const id = +event.target.closest(`.contact`).getAttribute(`data-id`)
            const data = this.model.data
            let contact = data.filter(contact => contact.id === id)[0]

            this.view.hideForm()

            const renderInfo = this.view.renderInfo(contact)

            renderInfo.addEventListener(`click`, this.closeHandler)
        }
    }

    closeHandler (e) {
        if (e.target.classList.contains(`contact_close`)) window.location.reload()
    }

    changeHandler = (event) => {
        event.stopPropagation()
        event.preventDefault()

        const id = this.idChange

        const inputs = document.querySelectorAll(`input`)
        let setData = null

        if (inputs instanceof NodeList) setData = Array.from(inputs)

        for (let index of setData) {
            if (index.value === '') {
                index.value = index.placeholder
            }
        }

        let savedData = setData.reduce((acc, item) => {
            if (isNaN(acc.phone) && acc.phone) throw new Error(`Wrong phone number`)
            acc[item.name] = item.value
            return acc
        }, {})

        savedData.id = id

        console.log(savedData.id)

        this.model.changingContact(savedData)

        console.log(savedData)

        window.location.reload()
    }

    searchContactHandler = (e) => {
        if (e.target.classList.contains(`search_input`)) {
            const data = this.model.data

            if (!data) return;

            const value = e.target.value
            let selectOption = document.querySelector(`#search_select`).value
            const relevantContacts = data.filter(contact => {
                return contact[`${selectOption}`].includes(value)
            })

            if (relevantContacts.length === 0) {
                this.view.removeContacts()
                this.view.renderNoContacts()
                return;
            }   else if (document.querySelector(`#no-contacts`)){
                this.view.removeElement(`#no-contacts`)
                this.view.renderContactContainer()
            }

            if (relevantContacts.length >= 1) {
                this.view.removeContacts()
                this.view.renderContactContainer()
                relevantContacts.forEach(contact => {
                    this.view.renderContact(contact)
                })
                const contactContainer = document.querySelector(`#contact-container`)
                contactContainer.addEventListener(`click`, this.contactHandlers)

            }
        }
    }

    searchSelectingHandler = (e) => {
        if (!e.target.classList.contains(`search_select`)) return
        const input = document.querySelector(`#search_input`).value
        this.selectOption = e.target.value
        const data = this.model.data

        const noContacts = document.querySelector(`#no-contacts`)
        const contactContainer = document.querySelector(`#contact-container`)

        if (input) {
            document.querySelector(`#search_input`).value = ``
            this.view.removeContacts()
            this.view.renderContactContainer()
            data.forEach(contact => this.view.renderContact(contact))
        }
        if (noContacts) {
            console.log(`123`)
            this.view.removeElement(`#no-contacts`)
            this.view.renderContactContainer()
            data.forEach(contact => this.view.renderContact(contact))
        }

    }

    searchClearingHandler = (e) => {
        if (e.target.classList.contains(`search_clean`)) {
            let input = document.querySelector(`#search_input`).value

            if (!input.trim()) return

            const data = this.model.data

            const noContacts = document.querySelector(`#no-contacts`)
            const contactContainer = document.querySelector(`#contact-container`)

            if (noContacts) {
                this.view.removeElement(`#no-contacts`)
            }   else if (contactContainer) {
                this.view.removeContacts()
            }

            document.querySelector(`#search_input`).value = ``
            this.view.renderContactContainer()
            data.forEach(contact => this.view.renderContact(contact))
        }
    }

    debounce = (func, ms) => {
        let timeOut;
        return function () {
            const fnCall = () => func.apply(this, arguments);
            clearTimeout(timeOut);
            timeOut = setTimeout(fnCall, ms)
        }
    }
}