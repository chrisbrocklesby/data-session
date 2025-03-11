// Core Functions to store, restore and reset form data elements in sessionStorage
function storeData(element) {
    const id = element.getAttribute('data-id');
    sessionStorage.setItem('data-id:' + id, element.value);
}

function restoreData(element) {
    const id = element.getAttribute('data-id');
    const savedValue = sessionStorage.getItem('data-id:' + id);
    if (savedValue && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT')) {
        element.value = savedValue;
    }
}

function resetData() {
    document.querySelectorAll('[data-id]').forEach(element => {
        const id = element.getAttribute('data-id');
        sessionStorage.removeItem('data-id:' + id);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
            element.value = '';
        }
    });
}

function initData() {
    document.querySelectorAll('[data-id]').forEach(element => {
        restoreData(element);
        element.addEventListener('change', () => storeData(element));
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.addEventListener('keyup', () => storeData(element));
        }
    });
}

// Initial Data Restore
document.addEventListener('DOMContentLoaded', initData);
window.addEventListener('popstate', () => setTimeout(initData, 0));

// HTMX support
if (typeof htmx !== 'undefined') {
    htmx.on('htmx:afterSettle', initData);
    htmx.on('htmx:afterSwap', initData);
    htmx.on('load', initData);
}