# Roadmap / wishlist

#### Layout
- Pin the title/hero/menu/toolbar to the top of each page
- (NICE TO HAVE) Collapse left nav down to icons only. Put an arrow "<<" button pinned to the bottom of the nav that collapses/expands the menu.
- (IF ABOVE) Tooltips for icons in collapsed nav
- (v0.0.16) Pin left nav and let content area scroll independently
- ~~(v0.0.12) Improve layout for Watchlist coin cards~~
- ~~(v0.0.13) Move socket status to bottom of left-side menu~~

#### Watchlist

- Display "bubbles" for each market (eg. BTC-USD, BTC-ETH, ETH-XMR, etc) instead of just the coins
- Separate coin details (price, etc) by exchange
- Compare current trade tick with history and color price green/red depending on +/- or black if no previous history
- Alphabetic sorting of coins/markets
- (NICE TO HAVE) Drag-sorting watched coins
- ~~(v0.0.14) Animate coin bubble when a trade updates (green/red depending on +/- then fade back to gray)~~
- ~~(v0.0.13) Retrieve last coin details from localStorage when mounting the app~~
- ~~(v0.0.10) Attach socket data to Vuex store~~
- ~~(v0.0.10) Save (latest) socket data in localStorage~~
- ~~(v0.0.10) Socket connectivity status~~

#### Menu / Sidebar
- (NICE TO HAVE) Button to connect to socket (disconnected by default -- not sure about this)

#### Map syncing

- Allow other markets than USD (BTC-x, ETH-x, etc)
- Add "My Asset" amount to watched coins
- Store only diff between existing map in storage and new map (i.e. new coins only), don't touch existing items. This should preserve watched coins.
- (v0.0.2) ~~Use Vuex store instead of localStorage~~
- (v0.0.7) ~~Use localStorage to persist data, Vuex is for state management only~~
- (v0.0.3) ~~2-way binding between watch view <-> storage using computed getter/setter~~

#### Map view
- (v0.0.3) ~~Use computed view of watched/unwatched coins to display watched ones at the top by default~~
- (v0.0.5) ~~Filtering~~
- (v0.0.8) ~~Show count of filtered coins~~
- (LOW PRIORITY if filtering is implemented) Alphabetic sorting of coins

#### History
- Save tracked coin price history in localStorage for each market/exchange
- History page

#### BUGS
- Refactor `watchedCoins`/`unwatchedCoins` to work off of `filteredCoins` ??
- ~~(v0.0.15) Sometimes when on a page the corresponding menu option is not highlighted, seems to occur when live-reloading. This can be fixed by saving/retriving the selected menu from Vuex. No need for localStorage - this will reset the position to Home every time the app is started.~~
- (v0.0.5) ~~Date format for mapLastSynced retrieved from storage has wrong format~~
- (v0.0.4) ~~Desktop app build - routes don't work~~
- (v0.0.6) ~~Desktop app build - Vuex storage doesn't persist thru closing/reopening app~~
- (v0.0.5) ~~Match Case isn't working~~
