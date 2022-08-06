'use strict';

import {Controller} from './controller.js';
import {Model} from './model.js';
import {View} from './view.js';

const payload = {
    formName: "contactForm",
    createContact: "createContact",
}

const app = new Controller(new Model(), new View(), payload)
app.handlers()