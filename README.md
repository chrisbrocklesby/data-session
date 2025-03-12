# DataStore.JS - (Local & Session direct in HTML)

This project script is designed to work with HTML or HTMX, using `data-` attributes direct in your HTML code to store data in either `localStorage` (`data-local="name"`) or `sessionStorage` (`data-session="name"`). It automatically saves and restores data from input, textarea, or select fields by simply setting the appropriate keys. Data is restored on back button navigation or HTMX/AJAX-type requests. You can choose how to store the data: use `localStorage` for long-term persistence or `sessionStorage` for temporary storage.

## Features

- **Session Storage**: Persists form data in `sessionStorage` for the duration of the browser session.
- **Local Storage**: Persists form data in `localStorage` indefinitely (until manually cleared).
- **Automatic Data Restoration**: Restores saved data when the page is reloaded or revisited.
- **HTMX Integration**: Works seamlessly with HTMX for dynamic content updates. (Optional)
- **Reset Functionality**: Allows resetting stored data for both session and local storage.

## How It Works

### HTML Structure
Form elements (inputs, textareas, selects) are tagged with `data-session` or `data-local` attributes to specify the storage type and key.

### Quick Example:
```html
<!-- Storing data in sessionStorage under the key 'data-session:name' -->
<input data-session="name" type="text" name="name">

<!-- Storing data in localStorage under the key 'data-local:message' -->
<input data-local="message" type="text" name="message">
```

### Quick use (direct link)
```html
  <script src="https://chrisbrocklesby.github.io/data-store-js/datastore.min.js"></script>
```

### Page Load / Reload (or HTMX/AJAX Load)
The data stored in those input values will re-populate in the last state from session or local storage. 

### HTMX Integration

The script listens for HTMX events (htmx:afterSettle, htmx:afterSwap, htmx:load) to reinitialize the form data after dynamic content updates.

### Usage

Include the script in your HTML:

```html
<script src="../datastore.js"></script>
<!-- or -->
<script src="../datastore.min.js"></script>
```

Add data-session or data-local attributes to your form elements:

```html
<!-- Storing data in sessionStorage under the key 'data-session:name' -->
<input data-session="name" type="text" name="name" placeholder="Name">

<!-- Storing data in localStorage under the key 'data-local:message' -->
<textarea data-local="message" name="message" placeholder="Message"></textarea>
```

Remove data and unset local or session data with an array of prefixed keys or change the value to '' in the input value to remove the data... Wild card to delete all data is available `data-session:*`... `removeData([array])` is a function the needs an array of values even if single value is needed.

```html
<!-- Target key with prefix -->
<button onclick="removeData(['data-session:name','data-local:message'])">Remove Select Data</button>

<!-- Wild Card with prefix -->
<script>
  removeData(['data-session:*','data-local:*'])
</script>
```

## Example
See the provided /example/ directory for a complete example with session and local storage forms.

Live URL: [https://chrisbrocklesby.github.io/data-store-js/example/index.html](https://chrisbrocklesby.github.io/data-store-js/example/index.html)

## Notes

You can use this script as a type of global state management. Access data directly in JavaScript using `localStorage` and `sessionStorage`. Remember to use the prefixes `data-local:` or `data-session:` when retrieving values. You can also use event listeners on the storage event to react to changes.

## License

This project is open-source and available under the MIT License.