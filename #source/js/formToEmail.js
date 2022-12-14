// форма для заполнения с отправкой на почту
"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        // formData.append('image', formImage.files[0]);

        if ( error === 0) {  
            form.classList.add('_sending');// класс для загрузки аннимированной картинки, пока отправляется форма      
            let response = await fetch('sendmail.php', {
                type: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.massage);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Ошибка1');
                form.classList.remove('_sending');
            }
        } else {
            // alert('заполните обязательные поля');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');// класс для HTML для подсветки красным полей импутов если они не заполнены

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.classList.contains('_phone')) {
                if (phoneTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');// класс для scc для подсветки красным полей импутов если они не заполнены
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);// проверка на правельность ввода Email
    }
    function phoneTest(input) {
        return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value);// проверка на правельность ввода phone
    }
    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');
    
    formImage.addEventListener('change', () => {
        upLoadFile(formImage.files[0]);
    });

    function upLoadFile(file) {
        if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Разрешены только изображения.');
            formImage.value = '';
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть меньше 2 Мб.');
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = function (e) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);
    }
});
