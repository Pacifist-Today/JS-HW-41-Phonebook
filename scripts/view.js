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
        let wrapper = document.createElement(`div`)
        wrapper.classList.add(`contact`, `mt-3`)
        wrapper.setAttribute(`data-id`, `${data.id}`)
        wrapper.innerHTML=`
        <p class="contact_name" >${data.name}</p>
        <p class="contact_number">${data.phone}</p>
        <p class="contact_position">${data.position}</p>
        <div class="contact_options">
        
            <button class="contact_remove">Remove</button>
            <button class="contact_change">Change</button>
            <button class="contact_info">Info</button>
        </div>
        `
        this.formSelector.append(wrapper)
        return wrapper
    }

    removeContact (event) {
        event.target.closest(`.contact`).remove()
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
        this.formSelector.innerHTML = ``
        let wrapper = document.createElement(`div`)
        wrapper.classList.add(`contact`, `mt-3`)
        wrapper.setAttribute(`data-id`, `${data.id}`)
        wrapper.innerHTML=`
        <p class="contact_name" >${data.name}</p>
        <p class="contact_number">${data.phone}</p>
        <p class="contact_position">${data.position}</p>
        <div class="contact_options">
            <button class="contact_close">Close</button>
        </div>
        `

        this.formSelector.append(wrapper)
    }

}