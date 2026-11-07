# Aurora Hotel - Endterm Project

Aurora Hotel is a multi-page hotel website. This endterm version continues the midterm project (same topic, design, navigation and pages) and adds JavaScript and jQuery interactivity: room search and filtering, a favorites list, guest reviews, an FAQ accordion, expandable service details and a validated contact form.


## Technologies

- HTML5, CSS3, Bootstrap
- JavaScript
- jQuery 3.7.1


## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero section, featured rooms, **guest reviews** (add / delete) |
| Rooms | `rooms.html` | Eight room types with **search, price filter, sorting and favorites** |
| Services | `services.html` | Hotel services, **FAQ accordion** and **expandable service details** |
| About Us | `about.html` | Hotel story, advantages and key facts |
| Contact | `contact.html` | Contact information and a **validated contact form** with character counter |

All pages share the same navigation bar and footer, and every navigation link points to an existing page. The Rooms, About Us and Contact pages use Bootstrap components (grid, table, form controls).


## Project Structure

```
midterm-frontend/
├── index.html
├── rooms.html
├── services.html
├── about.html
├── contact.html
├── style.css        # shared styles (navbar, hero, home page, footer, reviews)
├── rooms.css        # Rooms page styles
├── services.css     # Services page, FAQ and "More Details" styles
├── about.css        # About page styles
├── contact.css      # Contact page styles
├── home.js          # Guest reviews (index.html)
├── rooms.js         # Search, filter, sort, favorites (rooms.html)
├── endterm.js       # jQuery: FAQ, More Details, counter, form validation (services.html, contact.html)
└── images/
```


## Implemented Features


### 1. JavaScript Fundamentals

**Arrays**

| Array | File | Content |
|-------|------|---------|
| `roomNames` | `rooms.js` | Names of the 8 room types |
| `roomPrices` | `rooms.js` | Price per night for each room (KZT) |
| `favorites` | `rooms.js` | `true` / `false` favorite state for each room |
| `reviews` | `home.js` | Guest reviews stored as objects `{name, rating, text}` |

**Loops**

- `for` loop in `findRooms()` — checks every room against the search text, price limit and favorites filter.
- `for` loops in `sortRooms()` — build an array of room indexes and then reorder the cards on the page.
- `for` loop in `rooms.js` — creates a "Add to Favorites" button for every room card.
- `forEach` in `showReviews()` — builds a card for every review in the `reviews` array.

**Functions**

| Function | File | Purpose |
|----------|------|---------|
| `findRooms(query, maxPrice)` | `rooms.js` | Shows or hides room cards and **returns** the number of matching rooms |
| `searchRooms()` | `rooms.js` | Reads the search and filter inputs, calls `findRooms()` and updates the result message |
| `sortRooms()` | `rooms.js` | Sorts rooms by price (low to high, high to low or default order) |
| `showReviews()` | `home.js` | Re-renders the list of guest reviews from the `reviews` array |


### 2. DOM Manipulation

- **Selecting elements:** `getElementById`, `querySelectorAll(".room-item")`, `querySelector(".full-room-content")` and jQuery selectors.
- **Content created from an array:** every guest review card is created with `createElement` / `appendChild` from the `reviews` array; the favorite buttons are also created dynamically for each room.
- **Adding and removing elements:** a new review card is added when the form is submitted; the "Delete" button removes a review from the array and from the page.
- **Changing text, classes and visibility:** result message ("N room(s) found."), favorite button text (♡ / ♥), FAQ icons (+ / −), "More Details" / "Less Details" button text, `active` and `open` classes, showing and hiding room cards.

**Interface features**

1. Room search by name
2. Price filter
3. Sorting by price
4. Favorites (save rooms and "Show Favorites Only" filter)
5. Guest reviews (post and delete)
6. FAQ accordion
7. "More Details" / "Less Details" service blocks
8. Live character counter in the contact form


### 3. Events and Interaction

All JavaScript handlers in `home.js` and `rooms.js` use `addEventListener`; `endterm.js` uses jQuery event methods.

| Event | Element | Result |
|-------|---------|--------|
| `input` | `#roomSearchInput` | Rooms are filtered while the user types |
| `input` | `#message` (contact form) | Character counter updates |
| `change` | `#priceFilter`, `#sortPrice`, `#favoritesOnly` | Rooms are filtered or re-sorted |
| `click` | Favorite buttons | Room is added to or removed from favorites |
| `click` | "Delete" review button | Review is removed |
| `click` | FAQ questions | Answer slides open or closed |
| `click` | "More Details" buttons | Extra service information is shown or hidden |
| `submit` | `#reviewForm` | Review is added; `event.preventDefault()` stops the page reload |
| `submit` | Contact form | Data is validated; `event.preventDefault()` controls submission |

Visual feedback includes the updated "rooms found" message, changing button labels, FAQ and details animations, validation messages and the animated success message.


### 4. Form Validation

The **Contact form** (`contact.html`, validated in `endterm.js`) uses JavaScript validation:

| Field | Rule | Error message location |
|-------|------|------------------------|
| Full Name | At least 2 characters | `#nameError` under the field |
| Email | Must match an email pattern (regular expression) | `#emailError` under the field |
| Message | At least 10 characters (maximum 500, shown by the live counter) | `#messageError` under the field |

- Submission is always intercepted with `event.preventDefault()`, so the form is never sent while errors remain.
- When all fields are valid, a success message appears with a `fadeIn` effect and the form (and counter) is reset.
- All form controls have `<label>` elements connected with `for` / `id`.

The review form on the home page also checks that the name and review text are not empty before a review is added.


### 5. jQuery

- jQuery 3.7.1 is included from the CDN on `rooms.html`, `services.html` and `contact.html`, before the page scripts.
- **Selectors:** ID (`#message`, `#charCounter`, `#formSuccess`), class (`.faq-question`, `.details-btn`), descendant (`.contact-form form`, `.faq-question span`).
- **Traversal:** `parent()`, `find()` and `next()` (for example `btn.next(".details-content")`).
- **Events:** `click`, `input` and `submit`.
- **Effects:** `slideDown` / `slideUp` (FAQ), `slideToggle` (service details), `fadeIn` (success message), `show` / `hide` (room filtering).


### 6. Code Quality

- JavaScript is placed in external files, one for each part of the site (`home.js`, `rooms.js`, `endterm.js`).
- Variable and function names describe their purpose (`findRooms`, `searchRooms`, `showReviews`, `roomPrices`).
- The layout is responsive (media queries and Bootstrap grid), and the design is consistent across all pages.


## How to Run

1. Download or clone the project folder.
2. Open `index.html` in any modern browser.
3. An internet connection is needed to load Bootstrap and jQuery from the CDN.

No build tools or server are required.


## Notes

- Guest reviews and favorites are stored in memory only, so they reset when the page is refreshed.


## Team

- Balagazinova Yerkezhan
- Bekbolatkyzy Kuralay
