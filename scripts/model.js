'use strict';

export class Model {
    constructor() {
        this.dbName = null
        this.id = null
    }

    get data () {
        return JSON.parse(localStorage.getItem(this.dbName))
    }

    setData (contactData) {
        const data = structuredClone(contactData)
        let response = null
        data.id = this.id
        const gettingData = this.data

        if (!gettingData) {
            let arr = []
            arr.push(data)
            localStorage.setItem(this.dbName, JSON.stringify(arr))
        }   else {
            gettingData.push(data)
            localStorage.setItem(this.dbName, JSON.stringify(gettingData))
        }

        if (gettingData) gettingData.sort((a, b) => a.id - b.id)

        try {
            response = {
                success: true,
                data: data
            }
            this.id++
        }   catch (error) {
            response = {
                success: false,
                error: error,
            }
        }

        return response
    }

    removeContact (id) {
        const data = this.data
        let updatedData = data.filter(contact => contact.id !== id)

        localStorage.setItem(this.dbName, JSON.stringify(updatedData))

        if (data.length === 1) localStorage.removeItem(this.dbName)
    }

    changingContact (contact) {
        const data = this.data
        const filteringData = data.filter(index => index.id !== contact.id)

        filteringData.push(contact)

        filteringData.sort((a, b) => a.id > b.id ? 1 : -1)

        console.log(filteringData)

        localStorage.setItem(this.dbName, JSON.stringify(filteringData))

    }

    init (formName) {
        this.dbName = formName
        const data = this.data
        this.id = data ? data[data.length-1].id + 1 : 1
    }
}