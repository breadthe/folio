# Roadmap / wishlist

#### Map syncing

- Use Vuex store instead of localStorage
- Store only diff between existing map in storage and new map, don't touch existing items
- 2-way binding between watch view <-> storage using computed getter/setter
- Add "My Asset" amount to watched coins

#### Map view
- Use computed view of watched/unwatched coins to display watched ones at the top by default
- Filtering
- (LOW PRIORITY if filtering is implemented) Alphabetic sorting of coins
- (NICE TO HAVE) Drag-sorting watched coins