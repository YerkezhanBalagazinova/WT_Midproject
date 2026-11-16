# Aurora Hotel

A multi-page, client-side website for **Aurora Hotel** in Astana, Kazakhstan. Guests can browse rooms and services, check the live weather in Astana, save favorite rooms, switch to dark mode and request a booking with an automatic price calculation.

This is the **final stage** of the course project. It continues the midterm and endterm versions of the same website: all earlier HTML, CSS, Bootstrap, JavaScript, DOM, validation and jQuery functionality is still in place, and the final stage adds an external API, object-oriented JavaScript, persistent browser storage and more advanced application features.


## Technologies

- HTML5 and CSS3 (Flexbox, Grid, media queries)
- Bootstrap 5.3.3 (CDN), used on the Rooms, About and Contact pages
- JavaScript (ES6+): classes, `fetch`, `async`/`await`, array methods, DOM manipulation
- jQuery 3.7.1 (CDN)
- `localStorage` (Web Storage API)
- [Open-Meteo](https://open-meteo.com/) public weather API


## Pages

| Page | File | What it contains |
|---|---|---|
| Home | `index.html` | Hero section, featured rooms, live weather for Astana, guest reviews |
| Rooms | `rooms.html` | Eight room cards, price table, search, price filter, sorting, favorites |
| Services | `services.html` | Service cards, FAQ accordion, "More Details" panels |
| About Us | `about.html` | Hotel story, "Why choose us" cards, key numbers |
| Contact | `contact.html` | Contact details and the "Room Reservation" form with live price calculation |


## Project Structure

```
/
├── index.html
├── rooms.html
├── services.html
├── about.html
├── contact.html
│
├── style.css          # Global styles: navbar, hero, cards, reviews, weather, footer
├── rooms.css          # Rooms page styles
├── services.css       # Services page styles
├── about.css          # About page styles
├── contact.css        # Contact page, booking total and form validation styles
├── theme.css          # Dark mode styles for all pages
│
├── hotel-data.js      # Room class and the rooms array (data layer)
├── rooms.js           # Rooms page logic: search, filter, sort, favorites
├── home.js            # Guest reviews on the Home page
├── weatherAPI.js      # Weather API request and rendering
├── theme.js           # Dark/light theme toggle with saved preference
├── endterm.js         # jQuery features: FAQ accordion and "More Details" panels
├── contact.js         # Booking form: validation, price calculation, draft autosave
│
└── images/            # Hotel, room, service and weather images
```


## Installation and Testing

No build step or server-side code is needed.

1. Clone or download the repository:
   ```bash
   git clone https://github.com/<username>/<repository>.git
   cd <repository>
   ```
2. Open `index.html` in a browser. For the most reliable result, serve the folder locally, for example with the VS Code **Live Server** extension or:
   ```bash
   python -m http.server 8000
   # then open http://localhost:8000
   ```
3. An **internet connection is required**. Bootstrap and jQuery load from a CDN and the weather data comes from the Open-Meteo API.


### Quick test checklist

| Area | How to test | Expected result |
|---|---|---|
| Weather API | Open the Home page | "Loading weather..." appears, then temperature, humidity and wind speed |
| Weather error state | In DevTools → Network, set "Offline" and click **Refresh Weather** | "Unable to connect. Please try again." |
| Favorites | On Rooms, click **♡ Add to Favorites**, then reload | The room still shows **♥ Saved** |
| Clear favorites | Click **Clear Favorites** | All rooms reset and the stored data is removed |
| Search / filter / sort | Type a room name, change the price filter, change the sort order | Cards update and the counter shows "N room(s) found." |
| Favorites filter | Tick **Show Favorites Only** | Only saved rooms remain visible |
| Dark mode | Click **🌙 Dark Mode**, then reload or open another page | The chosen theme is kept |
| Booking total | On Contact, choose a room, a check-in date and a later check-out date | "Total: … KZT for N night(s)." is shown (price per night × number of nights) |
| Booking validation | Choose a check-in date in the past, or a check-out date that is not after check-in | A clear error message appears and no total is shown |
| Name and email validation | Enter a one-letter name or an invalid email and leave the field | An error message appears and disappears as soon as the value is valid |
| Booking draft | Fill in part of the form and reload the page | The entered values come back; after a successful submit the draft is removed |
| Reviews | On Home, post a review and delete it | The review card appears and disappears |

To reset saved data, open DevTools → Application → Local Storage and delete the keys `favorites`, `hotelTheme` and `contactDraft`.


## API Information

| | |
|---|---|
| Service | [Open-Meteo Forecast API](https://open-meteo.com/en/docs) |
| Endpoint | `https://api.open-meteo.com/v1/forecast` |
| Parameters | `latitude=51.1694`, `longitude=71.4491` (Astana), `current=temperature_2m,relative_humidity_2m,wind_speed_10m` |
| Method | `GET` via `fetch` with `async`/`await` |
| API key | **Not required.** The API is free and public, so no secret is stored in the source code. |
| Used in | `weatherAPI.js`, displayed in the "Weather in Astana" section of `index.html` |

Example response (shortened):

```json
{
  "current": {
    "temperature_2m": 4.1,
    "relative_humidity_2m": 78,
    "wind_speed_10m": 11.2
  }
}
```

The returned JSON is processed and shown through dynamically created DOM elements (temperature, humidity, wind speed). The interface handles four states:

| State | Message |
|---|---|
| Loading | "Loading weather..." |
| Success | Temperature in °C, humidity in %, wind in km/h |
| Empty / incomplete data | "Weather data is unavailable." |
| Error (HTTP error or no connection) | "Could not load weather." / "Unable to connect. Please try again." |


## Final-Stage Features

### Mandatory features

**1. API integration** (`weatherAPI.js`)
- Fetches live weather for Astana with `fetch` and `async`/`await` inside `try`/`catch`.
- Checks `response.ok` and validates that every required field exists in the JSON before rendering.
- Builds the result with `document.createElement` and shows loading, success, empty-data and error states.
- A **Refresh Weather** button requests the data again.

**2. Object-oriented programming** (`hotel-data.js`, `rooms.js`, `contact.js`)
- The `Room` class has a constructor (`name`, `price`) and two methods: `matchesName(query)` and `matchesPrice(maxPrice)`.
- Eight `Room` objects are created in the `rooms` array and shared by two pages:
  - on the Rooms page they power the search, price filter and sorting;
  - on the Contact page the booking form finds the selected `Room` object and uses its `price` to calculate the total cost of the stay.
- The room data is kept in one place instead of being repeated in each script.

**3. localStorage** (`rooms.js`, `theme.js`, `contact.js`)
- `favorites` stores which rooms the user saved, as a JSON array of booleans.
- `hotelTheme` stores the selected theme (`"dark"` or `"light"`).
- `contactDraft` stores a draft of the booking form (name, email, phone, room, dates, guests, message) as a JSON object.
- Saved data is restored on page load. Stored favorites must parse as JSON, be an array of the correct length and contain only booleans; the draft must be an object with string values and a room that still exists in the list. Anything invalid is ignored and defaults are used.
- Reading and writing favorites and the draft is wrapped in `try`/`catch`, so a blocked or unavailable `localStorage` does not break the page.
- Users can update favorites with the buttons on each card and remove them all with **Clear Favorites**. The booking draft is removed automatically after a successful submit.


### Additional features

**4. Advanced search, filtering and sorting** (`rooms.js`)
- Live search by room name, filter by maximum price, sort by price (low to high or high to low), and a **Show Favorites Only** filter.
- All filters work together. A result counter ("N room(s) found.") is announced to screen readers through `aria-live="polite"`.

**5. Dark mode with saved preference** (`theme.js`, `theme.css`)
- A toggle in the navigation bar switches the `dark-mode` class on `<body>` and updates the button text.
- The preference is saved in `localStorage` and applied on every page.

**6. Advanced booking form** (`contact.js`, `contact.html`)
- **Calculated value:** once a room and both dates are chosen, the page shows the total price (price per night × number of nights) in KZT.
- **Dependent fields:** the total depends on the room, check-in, check-out and guests fields and is recalculated whenever one of them changes.
- **Custom validation:**
  - name must contain at least 2 characters and the email must have a valid format (checked when the user leaves the field and while correcting an error);
  - the room type must be selected;
  - check-in cannot be in the past and check-out must be after check-in;
  - the number of guests must be a whole number from 1 to 10.
- **Draft autosave:** the form is saved while the user types and restored after a reload.
- A valid request shows a success message with a fade-in effect (jQuery) and resets the form.


## Other Features

- **Guest reviews** (`home.js`): visitors can post a review with name, rating (1–5) and text. Reviews are displayed as cards created with the DOM API and can be deleted.


## Features from Earlier Stages (still working)

- Responsive layout with Flexbox, CSS Grid, Bootstrap grid and media queries
- Consistent navigation and footer on all five pages
- **jQuery** (`endterm.js`): FAQ accordion and "More Details" slide panels on the Services page
- Live character counter (0 / 500) for the message field on the Contact page
- Room price table and detailed room cards
- Form validation with inline error messages and Bootstrap `is-valid` / `is-invalid` styling


## Known Limitations

- Guest reviews are kept in memory only, so they are cleared when the page is reloaded.
- The booking form does not send data to a server. A valid submission only shows a confirmation message (demo request).
- Saved data (favorites, theme, booking draft) lives in the visitor's own browser only. It is not shared between devices or browsers.
- Weather data needs an internet connection.


## Team Members

Balagazinova Yerkezhan
Bekbolatkyzy Kuralay

© 2026 Aurora Hotel — educational project.
