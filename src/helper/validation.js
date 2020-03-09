import StringHelper from './string_helper';

export default {
    isError: false,
    errors: {},
    message: {
        'required': "$field field is required",
        'email': "This is not a valid email"
    },
    validateForm(model, rules) {
        let that = this;
        this.errors = {};

        Object.keys(rules).forEach((field) => {
            let conditions = rules[field];
            conditions = conditions.split('|');

            for (let k in conditions) {
                let condition = conditions[k];
                switch (condition) {
                    case 'required':
                        if (that.isEmpty(model[field])) {
                            that.errors[field] = that.renderMessage(field, condition)
                        }
                        break;
                    default:
                        break;
                }
            }
        });

        this.isError = Object.keys(this.errors).length > 0;
    },
    isEmpty(value) {
        if (value == '' || !value) {
            return true;
        }

        return false;
    },
    isEmail() {

    },
    renderMessage(field, type) {
        let message = this.message[type];
        message = message.replace('$field', StringHelper.upperFirst(field));

        return message;
    },
    renderValidate(formId, errors) {
        Object.keys(errors).forEach(field => {
            let errorField = document.createElement('div');
            errorField.classList.add('invalid-feedback');
            errorField.innerText = errors[field];

            let currentForm = document.getElementById(formId);
            let targetField = currentForm.querySelector(`#${field}`);
            targetField.parentNode.appendChild(errorField);
            currentForm.classList.add('was-validated');
        });
    },
};