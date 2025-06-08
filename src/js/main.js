document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal__content');
  const openButtons = document.querySelectorAll('[data-modal]');
  const closeButton = modal.querySelector('.modal__close');
  const form = modal.querySelector('.modal__form');
  const input = modal.querySelector('.modal__input');
  const error = modal.querySelector('.modal__error');

  // Открытие модалки
  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      modal.classList.add('active');
    });
  });

  // Закрытие по кнопке
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (!modalContent.contains(e.target)) closeModal();
  });

  function closeModal() {
    modal.classList.remove('active');
    form.reset();
    input.classList.remove('input--error');
    error.textContent = '';
    error.style.display = 'none';
  }

  // Валидация email
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      input.classList.add('input--error');
      error.textContent = 'ошибка';
      error.style.display = 'block';
    } else {
      input.classList.remove('input--error');
      error.textContent = '';
      error.style.display = 'none';
      modal.classList.remove('active');
      form.reset();
    }
  });
  // Мобильное меню
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  }
});

