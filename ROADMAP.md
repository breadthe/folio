# Roadmap / wishlist

#### Map syncing

- (v0.0.2) ~~Use Vuex store instead of localStorage~~
- Store only diff between existing map in storage and new map (i.e. new coins only), don't touch existing items
- (v0.0.3) ~~2-way binding between watch view <-> storage using computed getter/setter~~
- Add "My Asset" amount to watched coins

#### Map view
- Use computed view of watched/unwatched coins to display watched ones at the top by default
- Filtering
- (LOW PRIORITY if filtering is implemented) Alphabetic sorting of coins
- (NICE TO HAVE) Drag-sorting watched coins

#### BUGS
- Sometimes when on a page the corresponding menu option is not highlighted, seems to occur when live-reloading. This should be set when mounted.
- Date format for mapLastSynced retrieved from storage has wrong format