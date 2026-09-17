document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('[data-sidebar]');
    document.querySelector('[data-sidebar-toggle]')?.addEventListener('click', () => sidebar?.classList.toggle('is-open'));
    document.querySelectorAll('[data-dismiss]').forEach((button) => button.addEventListener('click', () => button.parentElement?.remove()));
});
