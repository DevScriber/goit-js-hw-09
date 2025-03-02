// Обьявление обьекта formData и ключа для локального хранилища
const formData = { email: '', message: '' };
const localKey = 'userFeedbackData';

// Получение ссылок на элементы формы
const form = document.querySelector('.feedback-form');
const inputEmail = form.querySelector('input[name="email"]');
const textAreaMessage = form.querySelector('textarea[name="message"]');

// Загрузка сохраненных данных из локального хранилища

let cachedData;
try {
  cachedData = JSON.parse(localStorage.getItem(localKey)) ?? {};
} catch (error) {
  cachedData = {};
}

inputEmail.value = cachedData.email || '';
formData.email = cachedData.email || '';
textAreaMessage.value = cachedData.message || '';
formData.message = cachedData.message || '';

// Отслеживание изменений в форме с помощью события input

form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(localKey, JSON.stringify(formData));
});

// Обработка события отправки формы

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!formData.email || !formData.message) {
    alert('Please complete all fields');
    return;
  }
  console.log(formData);

  localStorage.removeItem(localKey);
  form.reset();
  formData.email = '';
  formData.message = '';
});

// Добавляем атрибуты классов для стилизации
// Получаем ссылки на недостающие элементы формы

const labels = form.querySelectorAll('label');
const button = form.querySelector('button[type="submit"]');

// Добавление классов к элементам
labels.forEach(label => label.classList.add('feedback-form-label'));
inputEmail.classList.add('feedback-form-input');
textAreaMessage.classList.add('feedback-form-input');
button.classList.add('feedback-form-button');

// Добавим placeholder при фокусе на полях

function setPlaceholder(element, placeholderText) {
  element.addEventListener('focus', function () {
    this.setAttribute('placeholder', placeholderText);
  });

  element.addEventListener('blur', function () {
    this.removeAttribute('placeholder');
  });
}

setPlaceholder(inputEmail, 'Type area');
setPlaceholder(textAreaMessage, 'Type area');
