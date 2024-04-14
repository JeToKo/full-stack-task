import React,  { useState, useEffect } from 'react';
import { BookData } from '../utils/interfaces';

const BookList = () => {
    const [Books, setBooks] = useState<BookData[]>();

    useEffect(() => {
        fetch("http://localhost:8080/", {
        method: "GET",
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setBooks(data)
        });
    }, []);

    const handleListClick = () => {
        console.log("Click")
      };

      return (
        <div className="App">
            {Books?.map((book) => {
              return (
                <ul key={book.title} onClick={handleListClick}>
                  <b>{book.title}:</b>
                  {' ' + book.author}, 
                  {' ' + book.description}, 
                  {' ' + book.information}
                </ul>
              );
            })}
        </div>
      );
};

export default BookList