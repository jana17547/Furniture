# Used Furniture Marketplace 🛋️

This application enables users to buy and sell used furniture through a .NET Core backend integrated with MongoDB. The system supports functionalities such as user registration, login, product search, ad creation, notifications, and more.

## Features

### Users
- **User Registration**: Create a new user account.
- **User Login**: Log in with an existing username and password.
- **Update Information**: Users can update their city or contact information.
- **Add Funds**: Users can add money to their profile.

### Products
- **Create Product**: Add new products for sale with specified condition and tags.
- **View Product**: Retrieve details of a specific product based on its ID.
- **Delete Product**: Remove a product listing.
- **Search Products**: Filter products by tag, condition, minimum, and maximum price.

### Notifications
- **Create Notification**: Send notifications to users when someone shows interest in their product.
- **View Notifications**: Display all notifications for a specific user.
- **Respond to Offer**: Sellers can accept or decline a buyer's offer.

## API Endpoints

### Authentication
- `GET /Furniture/LogIn/{username}&{password}`: Log in a user.
- `POST /Furniture/Register`: Register a new user.

### Users
- `GET /Furniture/GetUser/{username}`: Retrieve user details.
- `PATCH /Furniture/ChangeCity/{username}&{City}`: Update the user's city.
- `PATCH /Furniture/ChangeContact/{username}&{Contact}`: Update the user's contact information.
- `PUT /Furniture/GiveMeMoney/{username}&{Cash}`: Add funds to the user's account.

### Products
- `POST /Furniture/CreateProduct/{username}/{states}/{tags}`: Create a new product listing.
- `GET /Furniture/GetProductDetails/{id}`: Retrieve product details by ID.
- `DELETE /Furniture/DeleteProduct/{id}`: Delete a product.
- `GET /Furniture/GetMyProducts/{username}`: Retrieve all products listed by a user.
- `GET /Furniture/GetSearchResults/{tag}/{state}/{minPrice}/{maxPrice}`: Search products by tag, condition, and price.

### Conditions and Tags
- `GET /Furniture/GetStates`: Retrieve available product conditions.
- `POST /Furniture/CreateState`: Create a new product condition.
- `GET /Furniture/GetTags`: Retrieve available tags.
- `POST /Furniture/CreateTags`: Create new tags.

### Notifications
- `POST /Furniture/CreateNotification/{username}`: Create a new notification for a user.
- `GET /Furniture/GetNotifications/{username}`: Retrieve all notifications for a user.
- `GET /Furniture/CheckNotification/{usernameSeller}&{usernameBuyer}&{idProduct}`: Check if a notification exists for a given product.
- `PUT /Furniture/OfferAnswer/{id}&{answer}&{ownerUsername}`: Respond to an offer.

## Technologies Used

- **ASP.NET Core**: Backend API for handling requests.
- **MongoDB**: Database for storing information about users, products, and notifications.
- **MongoDB.Driver**: Client for accessing MongoDB from a .NET application.

## Notes

This project serves as an example CRUD application for a used furniture marketplace. It can be expanded and customized to meet specific business needs.

