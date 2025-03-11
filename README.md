# Data Session JS Script

This script provides core functions to store, restore, and reset form data elements in `sessionStorage` directly in the HTML via `data-id` in form elements. It ensures that form data persists across page reloads and navigation.

## Functions

### Core Functions

#### `storeData(element)`

Stores the value of a form element in `sessionStorage`.

#### `restoreData(element)`

Restores the value of a form element from `sessionStorage`.

#### `resetData()`

Resets all form elements with a `data-id` attribute and removes their values from `sessionStorage`.

#### `initData()`

Initializes the form elements by restoring their values from `sessionStorage` and setting up event listeners to store data on change and keyup events.

### Note at this scripts heart its standard js sessionStorage with a prefix of data-id:
```js
sessionStorage.setItem('data-id:example', 'new value');
ssessionStorage.getItem('data-id:example');
sessionStorage.removeItem('data-id:example');
sessionStorage.clear();
```

## Usage

Include the `datasession.js` script in your HTML file:
or direct via https://chrisbrocklesby.github.io/data-session/datasession.min.js

```html
<script src="datasession.js"></script>

<input type="text" data-id="username" />
<textarea data-id="comments"></textarea>
<select data-id="options">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>
```

The script will automatically handle storing, restoring, and resetting the form data.

## Example
Example: (https://chrisbrocklesby.github.io/data-session/)[https://chrisbrocklesby.github.io/data-session/]

## HTMX Support
If you are using HTMX, the script will automatically reinitialize the form elements after HTMX events:

htmx:afterSettle
htmx:afterSwap
htmx:load

## License
This project is licensed under the MIT License.