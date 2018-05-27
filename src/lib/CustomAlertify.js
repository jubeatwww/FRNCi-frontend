import alertify from 'alertifyjs';
/* eslint-disable */
export default {
    InvitePrompt: function () {
        var textarea = document.createElement('TEXTAREA');
        var p = document.createElement('P');
        return {
            main: function (_title, _message, _value, _onok, _oncancel) {
                var title, message, value, onok, oncancel;
                switch (arguments.length) {
                case 1:
                    message = _title;
                    break;
                case 2:
                    message = _title;
                    value = _message;
                    break;
                case 3:
                    message = _title;
                    value = _message;
                    onok = _value;
                    break;
                case 4:
                    message = _title;
                    value = _message;
                    onok = _value;
                    oncancel = _onok;
                    break;
                case 5:
                    title = _title;
                    message = _message;
                    value = _value;
                    onok = _onok;
                    oncancel = _oncancel;
                    break;
                }
                this.set('title', title);
                this.set('message', message);
                this.set('value', value);
                this.set('onok', onok);
                this.set('oncancel', oncancel);
                return this;
            },
            setup: function () {
                return {
                    buttons: [
                        {
                            text: 'Send',
                            className: `${alertify.defaults.theme.ok} invite-ok`,
                        },
                        {
                            text: alertify.defaults.glossary.cancel,
                            invokeOnClose: true,
                            className: `${alertify.defaults.theme.cancel} invite-cancel`,
                        }
                    ],
                    focus: {
                        element: textarea,
                        select: true
                    },
                    options: {
                        maximizable: false,
                        resizable: false
                    }
                };
            },
            build: function () {
                textarea.className = 'ajs-textarea invite-textarea';
                textarea.value = this.get('value');
                textarea.placeholder = 'Introduce yourself a little bit and talk about why you are sending this request or what you are expecting when becoming language partners.';
                textarea.rows = 5;
                this.elements.content.appendChild(p);
                this.elements.content.appendChild(textarea);
                Object.keys(this.elements).map(k => {
                    this.elements[k].className += ' ajs-invite';
                })
            },
            prepare: function () {
                //nothing
            },
            setMessage: function (message) {
                if (typeof message === 'string') {
                    p.innerHTML = message;
                } else if (message instanceof window.HTMLElement && p.firstChild !== message) {
                    p.innerHTML = '';
                    p.appendChild(message);
                }
            },
            settings: {
                message: undefined,
                labels: undefined,
                onok: undefined,
                oncancel: undefined,
                value: '',
                type:'text',
                reverseButtons: undefined,
            },
            settingUpdated: function (key, oldValue, newValue) {
                switch (key) {
                case 'message':
                    this.setMessage(newValue);
                    break;
                case 'value':
                    textarea.value = newValue;
                    break;
                case 'type':
                    switch (newValue) {
                    case 'text':
                    case 'color':
                    case 'date':
                    case 'datetime-local':
                    case 'email':
                    case 'month':
                    case 'number':
                    case 'password':
                    case 'search':
                    case 'tel':
                    case 'time':
                    case 'week':
                        textarea.type = newValue;
                        break;
                    default:
                        textarea.type = 'text';
                        break;
                    }
                    break;
                case 'labels':
                    if (newValue.ok && this.__internal.buttons[0].element) {
                        this.__internal.buttons[0].element.innerHTML = newValue.ok;
                    }
                    if (newValue.cancel && this.__internal.buttons[1].element) {
                        this.__internal.buttons[1].element.innerHTML = newValue.cancel;
                    }
                    break;
                case 'reverseButtons':
                    if (newValue === true) {
                        this.elements.buttons.primary.appendChild(this.__internal.buttons[0].element);
                    } else {
                        this.elements.buttons.primary.appendChild(this.__internal.buttons[1].element);
                    }
                    break;
                }
            },
            callback: function (closeEvent) {
                var returnValue;
                switch (closeEvent.index) {
                case 0:
                    this.settings.value = textarea.value;
                    if (typeof this.get('onok') === 'function') {
                        returnValue = this.get('onok').call(this, closeEvent, this.settings.value);
                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    break;
                case 1:
                    if (typeof this.get('oncancel') === 'function') {
                        returnValue = this.get('oncancel').call(this, closeEvent);
                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    if(!closeEvent.cancel){
                        textarea.value = this.settings.value;
                    }
                    break;
                }
            }
        };
    },
    InviteReject: function() {
        return {
            setup: function() {
                return {
                    buttons: [
                        {
                            text: 'Yes, ignore',
                            className: alertify.defaults.theme.ok,
                            className: `${alertify.defaults.theme.ok} reject-ok`,
                        },
                        {
                            text: 'No, keep it',
                            invokeOnClose: true,
                            className: `${alertify.defaults.theme.cancel} reject-cancel`,
                        }
                    ],
                };
            },
            build: function () {
                Object.keys(this.elements).map(k => {
                    this.elements[k].className += ' ajs-reject';
                })
            },
        };
    },
    InviteCancel: function() {
        return {
            setup: function() {
                return {
                    buttons: [
                        {
                            text: 'Yes, cancel',
                            className: `${alertify.defaults.theme.ok} cancel-ok`,
                        },
                        {
                            text: "No, don't cancel",
                            invokeOnClose: true,
                            className: `${alertify.defaults.theme.cancel} cancel-cancel`,
                        }
                    ],
                };
            },
            build: function () {
                Object.keys(this.elements).map(k => {
                    this.elements[k].className += ' ajs-cancel';
                })
            },
        };
    },
};