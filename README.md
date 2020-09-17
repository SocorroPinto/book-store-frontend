# **Owl Book Store** <img src="https://github.com/SocorroPinto/book-store-frontend/blob/master/public/img/OwlBookS.png"  width="70" height="70" />

#### **Developers:** Socorro Pinto and Gladys Cruz

## Application Description

Owl Book store is an app to shop books online, you will be able to filter books using book name or author on the main Page, you can filter by all books, most selled or most rated books. Authentification is required in order to buy a book, you will be able to include multiple books to a cart and there is an option to show cart history.

### User Stories
- As a User I want to have authentification functionality available.
- As a User I want to have multiples filters on home page so I can find out easily books by most rated, most selles, all books or filtering by specific book based on an author or title.
- As a User I want to be able to see a book detail to check more information for a book such as Summary, Description, author.
- As a User I want to update rating from home page and book detal page.
- As a User I need to be able to add multiple books to a cart.
- As a User I want to be able to update delivery address for an open cart so  can confirm the cart.
- As a User I need to display cart history so I can see carts confirmed.
- As a User I need to be able to confirm open carts.
- As a User I need pagination functionality working to display books.

### Wireframes
- [Wireframes](https://github.com/SocorroPinto/book-store-frontend/tree/master/planning)

### Login
It is required to login to the App in order to be able to buy a book, show a current cart open and Cart history.

<img src="https://github.com/SocorroPinto/book-store-frontend/blob/master/public/img/LogIn.png"  width="900" height="400" />


### Profile

<img src="https://github.com/SocorroPinto/book-store-frontend/blob/master/public/img/Profile.png"  width="900" height="400" />

### Home Page
From the home page you can search book filtering by author or title, display all books, most rated or most selled books. App will show 6 books for each page, you have the option to switch to a different page using pagination functionality displayed at the bottom. Rating is displayed on the home page, it can be updated any time you want, once a book has assigned a rating this will be part of the most rated books.

<img src="https://github.com/SocorroPinto/book-store-frontend/blob/master/public/img/HomePage.png"  width="900" height="400" />

### Home Page (most rated)
From the home page you have the option to display most rated books  based on rating previously assigned to a book.

<img src="https://github.com/SocorroPinto/book-store-frontend/blob/master/public/img/HomePageMostRated.png"  width="900" height="400" />

### Home Page (search book)
From Home Page you can be able to search a book filtering by author or title. You just need to enter search field and hit enter or click on search icon.

<img src="https://github.com/SocorroPinto/book-store-frontend/blob/master/public/img/HomePageSearchBook.png"  width="900" height="400" />

### Book Detail 
In this page application will display all information related with a specific book,in home page if a user click on a specific book (either image or title book) the application redirect to a book detail page. From this page we have raiting update functionality and add book to a cart.

<img src="https://github.com/SocorroPinto/book-store-frontend/blob/master/public/img/BookDetail.png"  width="900" height="400" />


### Cart 
A cart is created when you click add a book from the book detail page or home page. If a user has already an open cart then the application will update the detail of the cart to include more details.
Application validates if we already have a book created on the cart detail, if so then application will increase quantity of the specific book otherwise application will create a new detail for the cart.

<img src="https://github.com/SocorroPinto/book-store-frontend/blob/master/public/img/Cart.png"  width="900" height="400" />

### Cart (Delivery Address validation) 
Delivery address is required to confirm a cart.

<img src="https://github.com/SocorroPinto/book-store-frontend/blob/master/public/img/Cart_AddDeliveryAddress.png"  width="900" height="400" />

### Cart (Add Delivery Address) 
Once we add the delivery address we should click on Save button.
<img src="https://github.com/SocorroPinto/book-store-frontend/blob/master/public/img/CartAdress.png"  width="900" height="400" />


## Technologies used

- HTML
- CSS
- Javascript
- React
- Express
- DB: Postgres

## Dependencies

  - testing-library/jest-dom: 4.2.4
  - testing-library/react: 9.5.0
  - testing-library/user-event: 7.2.1
  - axios: 0.20.0
  - bootstrap: 4.5.2
  - react: 16.13.1
  - react-dom:16.13.1
  - react-js-pagination: 3.0.3
  - react-rating-stars-component: 2.2.0
  - react-router: 5.2.0
  - react-router-dom: 5.2.0
  - react-scripts: 3.4.3
  - react-validation: 3.0.7
  - reactjs-popup: 2.0.3
  - validator: 13.1.1

## Project Links

- [github repo Backend](https://github.com/SocorroPinto/book-store-backend)
- [github repo FrontEnd](https://github.com/SocorroPinto/book-store-frontend)
- [App in development mode](http://localhost:3001/)
- [Socorro's Deployed app on Heroku](https://owl-books-online.herokuapp.com/)
- [Gladys' Deployed app on Heroku](https://owlbook-store.herokuapp.com/)
