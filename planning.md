# Fruits CRUD App

User stories: (`As a user...`)
- Create/Post a fruit (2 routes in one!)
    - new schema
    - create a model to use
    - return newly created fruit
- View all fruits
    - query all fruits in collection - find()
    - return all fruits
- View single fruit
    - query for single fruit - findOne() .id / name?
    - return single correct fruit
- Update/Post single fruit (2 routes in one!)
    - query for single fruit in collection - .id / name?
    - update that single fruit
    - return updated fruit
- Delete a single fruit
    - query for single fruit in collection - .id / name?
    - delete or remove a single fruit
    - return a success of some kind
- Delete ALL fruits
    - query for all fruits in collection - .id
    - delete/remove ALL fruits
    - return a success of some kind
- Automatically delete fruits a week after they were created
    - query all fruits in collection - timestamp created
    - delete all fruits that meet criteria
    - return a success of some kind