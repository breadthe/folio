# Roadmap / wishlist

#### Map syncing

- (v0.0.2) ~~Use Vuex store instead of localStorage~~
- (v0.0.6) ~~Use localStorage to persist data, Vuex is for state management only~~
- Store only diff between existing map in storage and new map (i.e. new coins only), don't touch existing items
- (v0.0.3) ~~2-way binding between watch view <-> storage using computed getter/setter~~
- Add "My Asset" amount to watched coins

#### Map view
- (v0.0.3) ~~Use computed view of watched/unwatched coins to display watched ones at the top by default~~
- (v0.0.5) ~~Filtering~~
- (LOW PRIORITY if filtering is implemented) Alphabetic sorting of coins
- (NICE TO HAVE) Drag-sorting watched coins
- Show count of filtered coins

#### BUGS
- Sometimes when on a page the corresponding menu option is not highlighted, seems to occur when live-reloading. This should be set when mounted.
- (v0.0.5) ~~Date format for mapLastSynced retrieved from storage has wrong format~~
- (v0.0.4) ~~Desktop app build - routes don't work~~
- (v0.0.6) ~~Desktop app build - Vuex storage doesn't persist thru closing/reopening app~~
- (v0.0.5) ~~Match Case isn't working~~
- Refactor `watchedCoins`/`unwatchedCoins` to work off of `filteredCoins` ??