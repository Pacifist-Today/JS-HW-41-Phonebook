'use strict';

export class View {
    constructor() {
        this.formSelector = null
        this.createContactSelector = null
    }

    init (form, create) {
        this.formSelector = form
        this.createContactSelector = create
    }

    clearForm () {
        this.formSelector.reset()
    }

    renderContact (data) {
        let contactContainer = document.querySelector(`#contact-container`)
        let wrapper = document.createElement(`div`)
        wrapper.classList.add(`contact`, `mt-3`)
        wrapper.setAttribute(`data-id`, `${data.id}`)
        wrapper.innerHTML=`
        <p class="contact_name">Name: ${data.name}</p>
        <p class="contact_number">Phone: ${data.phone}</p>
        <p class="contact_position">Position: ${data.position}</p>
        <div class="contact_options">
            <button class="contact_remove">Remove</button>
            <button class="contact_change">Change</button>
            <button class="contact_info">Info</button>
        </div>
        `
        contactContainer.append(wrapper)
        return wrapper
    }

    renderContactContainer () {
        const formWrapper = document.querySelector(`#form-wrapper`)
        let wrapper = document.createElement(`div`)
        wrapper.classList.add(`contact-container`, `mt-3`)
        wrapper.setAttribute(`id`, `contact-container`)
        wrapper.innerHTML=`
        <p>Your contacts:</p>
        `
        formWrapper.append(wrapper)
    }

    renderNoContacts () {
        const formWrapper = document.querySelector(`#form-wrapper`)
        let wrapper = document.createElement(`div`)
        wrapper.classList.add(`no-contacts`, `mt-3`)
        wrapper.setAttribute(`id`, `no-contacts`)
        wrapper.innerHTML=`
        <p>No contacts</p>
        `
        formWrapper.append(wrapper)
    }

    removeContact (event) {
        event.target.closest(`.contact`).remove()
    }

    removeContacts() {
        document.querySelector(`#contact-container`).remove()
    }

    removeElement(element) {
        document.querySelector(element).remove()
    }

    hideForm () {
        document.querySelector(`#form-wrapper`).innerHTML = ``
    }

    changeContact (form, data) {
        // document.querySelector("#" + `${form}`).innerHTML = ``
        // document.querySelector(`#form-wrapper`).innerHTML = ``
        const wrapper = document.createElement(`form`)
        wrapper.classList.add(`formChange`)
        wrapper.setAttribute(`id`, `formChange`)
        wrapper.setAttribute(`data-id`, `${data.id}`)
        wrapper.innerHTML=`
        <label for="contact-name" class="col-form-label">Name: </label>
        <input type="text" name="name" class="contact_name" id="contact-name" placeholder=${data.name}></input>
        <label for="contact-phone" class="col-form-label">Phone: </label>
        <input type="tel" name="phone" class="contact_number" id="contact-phone" placeholder=${data.phone}></input>
        <label for="contact-position" class="col-form-label">Name: </label>
        <input type="text" name="position" class="contact_position" id="contact-position" placeholder=${data.position}></input>
        <div class="contact_options">
            <button class="contact_close">Close</button>
            <button type="submit" class="contact_save">Save changes</button>
        </div>
        `

        document.querySelector(`#form-wrapper`).append(wrapper)
        return wrapper
    }

    renderInfo (data) {
        let wrapper = document.createElement(`div`)
        wrapper.classList.add(`contact`, `mt-3`)
        wrapper.setAttribute(`data-id`, `${data.id}`)
        wrapper.innerHTML=`
        <p class="contact_name" >Name: ${data.name}</p>
        <p class="contact_number">Phone: ${data.phone}</p>
        <p class="contact_position">Position: ${data.position}</p>
        <div class="contact_options">
            <button class="contact_close" id="contact_close">Close</button>
        </div>
        `

        document.querySelector(`#form-wrapper`).append(wrapper)
        return wrapper
    }
}