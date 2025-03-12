function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function storeData(element) {
    const store = (key, value, storage) => value ? storage.setItem(key, value) : storage.removeItem(key);

    const sessionId = element.getAttribute('data-session');
    if (sessionId) {
        store(`data-session:${sessionId}`, element.value, sessionStorage);
    }

    const localId = element.getAttribute('data-local');
    if (localId) {
        store(`data-local:${localId}`, element.value, localStorage);
    }
}

function restoreData(element) {
    const restore = (key, storage) => storage.getItem(key);

    const sessionId = element.getAttribute('data-session');
    if (sessionId) {
        const savedValue = restore(`data-session:${sessionId}`, sessionStorage);
        if (savedValue) {
            element.value = savedValue;
        }
    }

    const localId = element.getAttribute('data-local');
    if (localId) {
        const savedValue = restore(`data-local:${localId}`, localStorage);
        if (savedValue) {
            element.value = savedValue;
        }
    }
}

function removeData(keys) {
    keys.forEach(key => {
        if (key === 'data-session:*') {
            Object.keys(sessionStorage).forEach(k => k.startsWith('data-session:') && sessionStorage.removeItem(k));
        } else if (key.startsWith('data-session:')) {
            sessionStorage.removeItem(key);
        }

        if (key === 'data-local:*') {
            Object.keys(localStorage).forEach(k => k.startsWith('data-local:') && localStorage.removeItem(k));
        } else if (key.startsWith('data-local:')) {
            localStorage.removeItem(key);
        }
    });
}

function initData() {
    document.querySelectorAll('[data-session], [data-local]').forEach(element => {
        restoreData(element);
        element.addEventListener('change', () => storeData(element));

        if (['INPUT', 'TEXTAREA'].includes(element.tagName) && element.type !== 'hidden') {
            element.addEventListener('keyup', debounce(() => storeData(element), 300));
        }

        // Use MutationObserver to detect changes to hidden inputs
        if (element.type === 'hidden') {
            const observer = new MutationObserver(() => storeData(element));
            observer.observe(element, { attributes: true, attributeFilter: ['value'] });
        }
    });
}

// Initial Data Restore
document.addEventListener('DOMContentLoaded', initData);
window.addEventListener('popstate', () => setTimeout(initData, 0));
window.addEventListener('storage', event => {
    if (event.key && event.key.startsWith('data-')) {
        initData();
    }
});

// HTMX support
if (typeof htmx !== 'undefined') {
    htmx.on('htmx:afterSettle', initData);
    htmx.on('htmx:afterSwap', initData);
    htmx.on('load', initData);
}