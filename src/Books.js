import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Books.css";
import FakePromo from "./FakePromo";
import FakeAd from "./FakeAd";


class Books extends Component {

	render() {
		const allBooks = this.props.books.map((book, index) => {

			return (
				<div className="books" key={book.id}>
					<Link to={`/books/${book.id}`}>
						<img key={index} src={`../booksImages/${book.Img}`} alt="" className="book-id" />
					</Link>

					<div className="book-info">
<<<<<<< HEAD
						<div className="divBook-item">
							<h3 className="book-item">
								<label>Title:</label> {book.Title}
							</h3>
						</div>
						<div className="divBook-item">
							<h3 className="book-item">Cost: ${book.Cost}</h3>
=======
						<div className="book-title"> 
							<Link to={`/books/${book.id}`}>
								Title: {book.Title}
							</Link>
						</div>
						<div className="book-price">
							<h4>Price: ${book.Cost}</h4>
>>>>>>> 76e15356cd43f5df870003cd2757447e0c9ec71a
						</div>
						<div className='book-description'>{book.Description}</div>
						<div className="book-rating">
							<h5>Raiting</h5>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star"></span>
							<span className="fa fa-star"></span> 
						</div>
						<form>
							<input type="submit" value="Add book" className="button" />
						</form>
					</div>
				</div>
			);
		});

		return (<div className="book-container">
					<div className="book-collection">{allBooks}
					<div className="book-pagination">
						<div><Link>{'<<<'} Prev</Link></div>
						<div><Link>Next{'>>>'}</Link></div>
					</div>
					</div>
					<div className="fakeAdvertising">
						<FakeAd/>
                        <FakePromo/>
                        <FakeAd/>
                        <FakePromo/>
                        <FakeAd/>
					</div>
				</div>) ;
	}
}

export default Books;
