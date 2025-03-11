# HTML Data Store (Local & Session)

This project script is designed to work with HTML or HTMX, using `data-` attributes direct in your HTML code to store data in either `localStorage` (`data-local="name"`) or `sessionStorage` (`data-session="name"`). It automatically saves and restores data from input, textarea, or select fields by simply setting the appropriate keys. Data is restored on back button navigation or HTMX/AJAX-type requests. You can choose how to store the data: use `localStorage` for long-term persistence or `sessionStorage` for temporary storage.

## Features

- **Session Storage**: Persists form data in `sessionStorage` for the duration of the browser session.
- **Local Storage**: Persists form data in `localStorage` indefinitely (until manually cleared).
- **Automatic Data Restoration**: Restores saved data when the page is reloaded or revisited.
- **HTMX Integration**: Works seamlessly with HTMX for dynamic content updates.
- **Reset Functionality**: Allows resetting stored data for both session and local storage.

## How It Works

### HTML Structure
Form elements (inputs, textareas, selects) are tagged with `data-session` or `data-local` attributes to specify the storage type and key.

### Example:
```html
<input data-session="name" type="text" name="name" placeholder="Name">

<textarea data-local="message" name="message" placeholder="Message">  
</textarea>
```

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
<input data-session="name" type="text" name="name" placeholder="Name">
<textarea data-local="message" name="message" placeholder="Message"></textarea>
```
Use the resetData function to clear stored data:

```html
<button type="reset" onclick="resetData()">Reset Session Data</button>
```

## Example
See the provided /example/ directory for a complete example with session and local storage forms.

Live URL: https://chrisbrocklesby.github.io/data-session/example/index.html

## Notes

You can use this script as a type of global state management. Access data directly in JavaScript using `localStorage` and `sessionStorage`. Remember to use the prefixes `data-local:` or `data-session:` when retrieving values. You can also use event listeners on the storage event to react to changes.

## License

This project is open-source and available under the MIT License.