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
        this.formNameSelector.addEventListener(`submit`, this.submitHandler)
        document.addEventListener(`DOMContentLoaded`, this.loadHandler)
        // this.formNameSelector.addEventListener(`click`, this.contactHandlers)
        // document.querySelector(`.contact`).addEventListener(`click`, this.contactHandlers)
    }

    submitHandler = (event) => {
        event.stopPropagation()
        event.preventDefault()

        let inputs = document.querySelectorAll(`input`)

        let setData = null

        if (inputs instanceof NodeList) setData = Array.from(inputs)

        setData.sort((a, b) => a.name - b.name ? 1 : -1)

        for (let index of setData) {
            if (index.value === '') return new Error(`Fill the data`)
        }

        let savedData = setData.reduce((acc, item) => {
            acc[item.name] = item.value
            return acc
        }, {})



        console.log(savedData)

        this.model.setData(savedData)

        this.view.renderContact(savedData)

        this.view.clearForm()
    }

    loadHandler = () => {
        const data = this.model.data

        if (!data) return

        data.sort((a, b) => a.name > b.name ? 1 : -1)

        data.forEach(contact => {
            this.view.renderContact(contact)
        })


    }

    // removeHandler = (event) => {
    //     event.stopPropagation()
    //     if (!event.target.classList.contains(`contact_remove`)) return
    //
    //     const id = +event.target.closest(`.contact`).getAttribute(`data-id`)
    //
    //     this.model.removeContact(id)
    //     this.view.removeContact(event)
    // }
    //
    // changeHandler = (event) => {
    //     event.preventDefault()
    //     event.stopPropagation()
    //     if(!event.target.classList.contains(`contact_change`)) return
    //
    //     const id = +event.target.closest(`.contact`).getAttribute(`data-id`)
    //
    //     const data = this.model.data
    //
    //     let contact = data.filter(contact => contact.id === id)
    //
    //     this.view.changeContact(this.formName, contact)
    //
    //     const formChange = `formChange`
    //
    //     document.querySelector("." + formChange).addEventListener(`submit`, saveHandler)
    //
    //     saveHandler (event) {
    //         const inputs = Array.from(document.querySelectorAll(`input`))
    //     }
    //
    //     const inputs = Array.from(document.querySelectorAll(`input`))
    //
    //     console.log(inputs)
    // }

    //<----------------------------------------------------------------------->

    contactHandlers = (event) => {
        event.stopPropagation()
        event.preventDefault()

        if (event.target.classList.contains(`contact_remove`)) {
            const id = +event.target.closest(`.contact`).getAttribute(`data-id`)
            this.model.removeContact(id)
            this.view.removeContact(event)
        }

        if(event.target.classList.contains(`contact_change`)) {
            const id = +event.target.closest(`.contact`).getAttribute(`data-id`)

            this.idChange = id

            const data = this.model.data

            let contact = data.filter(contact => contact.id === id)[0]

            this.view.hideForm()

            this.view.changeContact(this.formName, contact)

            const formChange = `formChange`

            document.querySelector("#" + formChange).addEventListener(`submit`, this.changeHandler)
        }

        if(event.target.classList.contains(`contact_info`)) {
            const id = +event.target.closest(`.contact`).getAttribute(`data-id`)

            const data = this.model.data

            let contact = data.filter(contact => contact.id === id)[0]

            // this.view.hideForm()

            this.view.renderInfo(contact)
        }
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
            acc[item.name] = item.value
            return acc
        }, {})

        savedData.id = id

        console.log(savedData.id)

        this.model.changingContact(savedData)

        console.log(savedData)

        window.location.reload()
    }

    //<----------------------------------------------------------------------->

    // changeHandler = (event) => {
    //     event.preventDefault()
    //     event.stopPropagation()
    //     if(!event.target.classList.contains(`contact_change`)) return
    //
    //     const id = +event.target.closest(`.contact`).getAttribute(`data-id`)
    //
    //     const data = this.model.data
    //
    //     let contact = data.filter(contact => contact.id === id)
    //
    //     this.view.changeContact(this.formName, contact)
    //
    //     const formChange = `formChange`
    //
    //     document.querySelector("." + formChange).addEventListener(`submit`, saveHandler)
    //
    //     saveHandler (event) {
    //         const inputs = Array.from(document.querySelectorAll(`input`))
    //     }
    //
    //     const inputs = Array.from(document.querySelectorAll(`input`))
    //
    //     console.log(inputs)
    // }
}