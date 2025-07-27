###  **Auth Routes**

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| POST   | `/signup`        | User signup               |
| POST   | `/signin`        | User signin               |
| POST   | `/signout`       | User signout              |
| GET    | `/refresh-token` | Refresh access token      |

---

###  **User Routes**

| Method | Endpoint                   | Description                      |
| ------ | -------------------------- | -------------------------------- |
| GET    | `/`                        | Get all users                    |
| GET    | `/me`                      | Get currently authenticated user |
| GET    | `/:username`               | Get user by username             |
| PATCH  | `/:username`               | Update user by username          |
| DELETE | `/:username`               | Delete user by username          |
| GET    | `/:username/posts`         | Get posts by user                |
| GET    | `/:username/wishlists`     | Get wishlists by user            |
| GET    | `/:username/travelplans`   | Get travel plans by user         |
| GET    | `/:username/notifications` | Get notifications for user       |

---

###  **Post Routes**

| Method | Endpoint        | Description               |
| ------ | --------------- | ------------------------- |
| POST   | `/`             | Create a new post         |
| GET    | `/`             | Get all posts             |
| GET    | `/search/`      | Search posts              |
| GET    | `/:post_id`     | Get post by ID            |
| POST   | `/:postId/like` | Like or unlike a post     |
| PATCH  | `/:post_id`     | Update post               |
| DELETE | `/:post_id`     | Delete post               |

---

###  **Accommodation Routes**

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| POST   | `/`                 | Create accommodation            |
| GET    | `/`                 | Get all accommodations          |
| PATCH  | `/:accommodationId` | Update accommodation            |
| GET    | `/search`           | Get accommodations by proximity |

---

###  **Place Routes**

| Method | Endpoint    | Description             |
| ------ | ----------- | ----------------------- |
| POST   | `/`         | Create place            |
| GET    | `/`         | Get all places          |
| PATCH  | `/:placeId` | Update place            |
| GET    | `/search`   | Get places by proximity |

---

###  **Restaurant Routes**

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| POST   | `/`              | Create restaurant            |
| GET    | `/`              | Get all restaurants          |
| PATCH  | `/:restaurantId` | Update restaurant            |
| GET    | `/search`        | Get restaurants by proximity |

---

###  **Transport Routes**

| Method | Endpoint        | Description                 |
| ------ | --------------- | --------------------------- |
| POST   | `/`             | Create transport            |
| GET    | `/`             | Get all transports          |
| PATCH  | `/:transportId` | Update transport            |
| GET    | `/search`       | Get transports by proximity |

---

###  **Travel Plan Routes**

| Method | Endpoint                                 | Description                 |
| ------ | ---------------------------------------- | --------------------------- |
| POST   | `/`                                      | Create travel plan          |
| GET    | `/`                                      | Get all travel plans        |
| GET    | `/:travel_plan_id`                       | Get travel plan by ID       |
| PATCH  | `/:travel_plan_id`                       | Update travel plan          |
| DELETE | `/:travel_plan_id`                       | Delete travel plan          |
| POST   | `/:travel_plan_id/members`               | Add member to travel plan   |
| GET    | `/:travel_plan_id/members`               | Get members of travel plan  |
| PATCH  | `/:travel_plan_id/members/:user_id/role` | Update role of a member     |
| POST   | `/:travel_plan_id/comments`              | Add comment to travel plan  |
| GET    | `/:travel_plan_id/comments`              | Get comments of travel plan |

---

###  **Wishlist Routes**

| Method | Endpoint                   | Description                      |
| ------ | -------------------------- | -------------------------------- |
| GET    | `/grouped/users`           | Group users by wishlist theme    |
| POST   | `/`                        | Create a wishlist                |
| GET    | `/`                        | Get all wishlists                |
| GET    | `/shared/:wishlist_id`     | Publicly shared wishlist by ID   |
| GET    | `/:wishlist_id`            | Get wishlist by ID               |
| PATCH  | `/:wishlist_id`            | Update wishlist                  |
| DELETE | `/:wishlist_id`            | Delete wishlist                  |
| GET    | `/:wishlist_id/share`      | Generate shareable wishlist link |
| PATCH  | `/:wishlist_id/visibility` | Toggle visibility of wishlist    |

---

###  **Notification Routes**

| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| POST   | `/`                 | Create notification       |
| GET    | `/:notification_id` | Get notification by ID    |
| PATCH  | `/:notification_id` | Mark notification as read |
| DELETE | `/:notification_id` | Delete notification       |

---

###  **Proximity Routes**

| Method | Endpoint     | Description                        |
| ------ | ------------ | ---------------------------------- |
| POST   | `/`          | Create a proximity alert           |
| POST   | `/alert`     | Check triggered proximities        |
| GET    | `/:username` | Get proximity settings by username |
| PUT    | `/`          | Update proximity settings          |
| DELETE | `/`          | Delete proximity settings          |
