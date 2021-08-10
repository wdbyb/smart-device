'use strict';

function formSubmit(formSelector, nameSelector, telSelector, textSelector, agreementSelector) {
  var form = document.querySelector(formSelector);
  var name = document.querySelector(nameSelector);
  var tel = document.querySelector(telSelector);
  var text = document.querySelector(textSelector);
  var agreement = document.querySelector(agreementSelector);

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    localStorage.setItem('name', name.value);
    localStorage.setItem('tel', tel.value);
    localStorage.setItem('text', text.value);
    localStorage.setItem('agreement', agreement.value);

    name.value = "";
    tel.value = "";
    text.value = "";
    agreement.checked = false;
  });
}

document.addEventListener("DOMContentLoaded", function() {
  [].forEach.call(document.querySelectorAll('.ru-number-mask'), function (input) {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            newValue = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
        i = newValue.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function (a) {
                return "\\d{1," + a.length + "}";
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });

  var popupOpen = document.querySelector('.header__button');
  var popup = document.querySelector('.popup');
  var popupClose = popup.querySelector('.popup__close');

  popupOpen.addEventListener('click', function() {
    popup.style.display = 'block';

    popupClose.addEventListener('click', function() {
      popup.style.display = 'none';
    });

    document.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('popup')) {
        popup.style.display = 'none';
      }
    });

    document.addEventListener('keydown', function(evt) {
      if (evt.key === 'Escape') {
        popup.style.display = 'none';
      }
    });
  });

  formSubmit('#questions-form', '#name', '#tel', '#text', '#agreement');
  formSubmit('#popup-form', '#popup-name', '#popup-tel', '#popup-text', '#popup-agreement');

  if (screen.width < 768) {
    var contactsElement = document.querySelector('.footer__contacts-text');
    var togglerContactsElement = document.querySelector('.footer__contacts');
    var pagesElement = document.querySelector('.footer__nav');
    var togglerPagesElement = document.querySelector('.footer__pages');

    contactsElement.style.display = 'none';
    togglerContactsElement.classList.add('closed');
    pagesElement.style.display = 'none';
    togglerPagesElement.classList.add('closed');

    togglerContactsElement.addEventListener('click', function(evt) {
      if (togglerContactsElement.classList.contains('closed')) {
        contactsElement.style.display = 'block';
        togglerContactsElement.classList.remove('closed');
      } else {
        contactsElement.style.display = 'none';
        togglerContactsElement.classList.add('closed');
      }

      if (!togglerPagesElement.classList.contains('closed')) {
        pagesElement.style.display = 'none';
        togglerPagesElement.classList.add('closed');
      }
    });

    togglerPagesElement.addEventListener('click', function() {
      if (togglerPagesElement.classList.contains('closed')) {
        pagesElement.style.display = 'block';
        togglerPagesElement.classList.remove('closed');
      } else {
        pagesElement.style.display = 'none';
        togglerPagesElement.classList.add('closed');
      }

      if (!togglerContactsElement.classList.contains('closed')) {
        contactsElement.style.display = 'none';
        togglerContactsElement.classList.add('closed');
      }
    });
  }
});
