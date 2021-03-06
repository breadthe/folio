# Roadmap / wishlist

#### Priorities
2. ~~Dashboard summary~~ & pie chart
1. ~~Asset quantity~~
3. ~~List/Grid layout for watchlist~~

#### App
- (MAYBE, NOT WORKING WELL WITH BULMA) Add vue-bootstrap library to make use of tooltips
- Socket connection and sync should start when the app boots, not just the Watchlist page
- Export saved data as json
- Import previously saved json data (with warning that it will overwrite existing data)
- (v0.3) ~~New paradigm (14 Feb 2018): calculate and display portfolio depending on positive amount in wallets, but watch coins individually (or maybe even watch coins with positive balance automatically, without being able to remove them). For coins that are not watched (moot if positive balance coins are watched automatically), simply don't show total USD.~~

#### Dashboard
- (v0.1.3) ~~Show total $ value of portfolio, total BTC value, and pie chart for entire portfolio. Update this only when dashboard is entered.~~

#### Layout
- (v0.5) ~~Fully responsive design, allow maximizing and resizing~~
- (v0.1.2) ~~Switch to TailwindCSS, or at the very least strip everything Bulma out, except for the layout stuff~~
- (v0.0.16) ~~Pin left nav and let content area scroll independently~~
- (v0.0.13) ~~Move socket status to bottom of left-side menu~~
- (v0.0.12) ~~Improve layout for Watchlist coin cards~~

#### Watchlist
- Allow assignment of different background colors (or borders) for watched coins in config
- Separate coin details (price, etc) by exchange
- Compare current trade tick with history and color price green/red depending on +/- or black if no previous history
- (NICE TO HAVE) Drag-sorting watched coins
- (v0.3) ~~Remove amount from config~~
- (v0.1.4) ~~Format coin price up to 8 decimals, but trimming trailing zeros~~
- (v0.1.4) ~~Alphabetic sorting of coins/markets~~
- (v0.1.4) ~~List/Grid view with icons to switch between them. Save view state in Vuex/localStorage~~
- (v0.1.3) ~~Save amount on ENTER~~
- (v0.1.2) ~~Display "bubbles" for each market (eg. BTC-USD, BTC-ETH, ETH-XMR, etc) instead of just the coins~~
- (v0.0.14) ~~Animate coin bubble when a trade updates (green/red depending on +/- then fade back to gray)~~
- (v0.0.13) ~~Retrieve last coin details from localStorage when mounting the app~~
- (v0.0.10) ~~Attach socket data to Vuex store~~
- (v0.0.10) ~~Save (latest) socket data in localStorage~~
- (v0.0.10) ~~Socket connectivity status~~

#### Menu / Sidebar
- (v0.4) ~~Change menu tabs to Exodus style (large icon, text below, narrow but tall tab)~~

#### Settings
- Move coin selection/watching to Watchlist
- Option to switch between using the socket connection or the regular API for updating prices. API would update every X minutes.
- (v0.1.2) ~~Save settings in an object in localStorage and retrieve them when booting the app~~
- (v0.1.1) ~~When new coins are added to the default coins array, they should automatically be synced with the store/localStorage~~

#### History
- Save tracked coin price history to indexedDB for each market/exchange
- History page
- Show history entries (later replaced or augmented by charts), tracked since, last price, low, high, trend

#### BUGS
- (v0.1.4) ~~When there's no price history (first boot, no socket), the List view is blank~~
- (v0.1.4) ~~Background color is still buggy for watchList~~
- (v0.1.4) ~~Grid/List tabs on the Light theme have the wrong styling~~
- (v0.0.19) ~~.../folio/node_modules/gsap/TweenMax.js:6907 Uncaught Cannot tween a null target. Seemed to occur right after watching a new coin when it started ticking.~~
- (v0.0.19) ~~Un-watching coins should remove them from the Watchlist~~
- (v0.0.18) ~~Regression introduced when preserving watched coins while syncing the map~~
- (v0.0.15) ~~Sometimes when on a page the corresponding menu option is not highlighted, seems to occur when live-reloading. This can be fixed by saving/retriving the selected menu from Vuex. No need for localStorage - this will reset the position to Home every time the app is started.~~
- (v0.0.5) ~~Date format for mapLastSynced retrieved from storage has wrong format~~
- (v0.0.4) ~~Desktop app build - routes don't work~~
- (v0.0.6) ~~Desktop app build - Vuex storage doesn't persist thru closing/reopening app~~
- (v0.0.5) ~~Match Case isn't working~~
- N/A ~~Reflow Masonry when making changes to coin amount in Watchlist (when an amount is zeroed or new amt added, the size of the box grows/shrinks, overlapping box underneath)~~

~~#### Map syncing~~
- (v0.1.1) ~~Allow other markets than USD (BTC-x, ETH-x, etc)~~
- (v0.0.17) ~~Store only diff between existing map in storage and new map (i.e. new coins only), don't touch existing items. This should preserve watched coins.~~
- (v0.0.2) ~~Use Vuex store instead of localStorage~~
- (v0.0.7) ~~Use localStorage to persist data, Vuex is for state management only~~
- (v0.0.3) ~~2-way binding between watch view <-> storage using computed getter/setter~~
- N/A ~~Add "My Asset" amount to watched coins~~

~~#### Map view~~
- N/A ~~Messages for map sync should integrate better with the UI and disappear after a few seconds~~
- (v0.1.4) ~~Alphabetic sorting of coins~~
- (v0.0.3) ~~Use computed view of watched/unwatched coins to display watched ones at the top by default~~
- (v0.0.5) ~~Filtering~~
- (v0.0.8) ~~Show count of filtered coins~~