const App = (() => {
    const passwordEl = document.querySelector('.password');
    const clipboardEl = document.querySelector('.clipboard');
    const passwordLengthEl = document.querySelector('.password-length');
    const rangeEl = document.querySelector('.range');
    const rangeFillEl = document.querySelector('.fill');
    const settingsEl = document.getElementsByClassName('settings');
    const generatePasswordBtn = document.querySelector('.btn');
    
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    const numbers = '0123456789';
    
    const ranIndex = (str) => str[Math.floor(Math.random() * str.length)];
    
    const getLowercaseLetter = () => ranIndex(letters).toLowerCase();
    const getUppercaseLetter = () => ranIndex(letters).toUpperCase();
    const getNumber = () => ranIndex(numbers);
    const getSymbol = () => ranIndex(symbols);
    
    const getCharacter = (setting) => {
        switch(setting) {
            case 'numbers':
                return getNumber();
            case 'lowercase':
                return getLowercaseLetter();
            case 'uppercase':
                return getUppercaseLetter();
            case 'symbols':
                return getSymbol();
            default:
                console.log('invalid setting');
        }
    }

    const rangeValueRender = () => {
        //range value 4 to 20
        const validRangeValue = Math.floor((rangeEl.value / 6) + 4);
        passwordLengthEl.innerText = validRangeValue;
        //range bar fill effect
        rangeFillEl.style.width = `${rangeEl.value}%`;    
    }
    
    const generatePassword = () => {
        let password = '';
        //we take the rendered value by the range input
        const length = +(passwordLengthEl.innerText);
        const enabledSettings = [];
        for(let setting of settingsEl) {
            if(setting.checked === true) enabledSettings.push(setting.id);
        }
    
        if(enabledSettings.length >= 1) {
            for(let i = 0; i < length; i++) {
                password += getCharacter(ranIndex(enabledSettings));
            }
            passwordEl.innerText = password;
        }
        else alert('You must enable at least 1 setting')
    }
    
    const copyToClipboard = htmlElement => {
        if(!htmlElement) return;
        const elementText = htmlElement.innerText;
        const inputElement = document.createElement('input');
        inputElement.setAttribute('value', elementText);
        document.body.appendChild(inputElement);
        inputElement.select();
        document.execCommand('copy');
        inputElement.remove();
    }

    const listeners = () => {
        generatePasswordBtn.addEventListener('click', generatePassword);
        clipboardEl.addEventListener('click', () => copyToClipboard(passwordEl));
        rangeEl.addEventListener('input', rangeValueRender);
    }


    return {
        rangeValueRender,
        listeners
    }

})();

App.rangeValueRender();
App.listeners();