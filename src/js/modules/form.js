export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.messages = {
            loading: 'Загрузка...',
            success: 'Дякуємо! Скоро з вами звяжуться',
            failure: 'Щось пішло не так...'
        };
        this.path = 'assets/question.php';
    }   

    clearInputs() {
        this.inputs.forEach(item => {
            item.value = '';
        });
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="emailmail]');
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', function (e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
                
            });
        });
    }

    async postData (url, data)  {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    }

    init() {
        this.checkMailInputs();

        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
            });

            let statusMessage = document.createElement('div');
            statusMessage.style.cssText = `
                margin-top: 15px;
                font-size: 18px;
                color: grey;
            `;
            item.parentNode.appendChild(statusMessage);

            statusMessage.textContent = this.messages.loading;

            const formData = new FormData(item);

            this.postData(this.path, formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = this.messages.success;
                })
                .catch(() => {
                    statusMessage.textContent = this.messages.console.failure;
                })
                .finally(() =>{
                    this.clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    }
}
