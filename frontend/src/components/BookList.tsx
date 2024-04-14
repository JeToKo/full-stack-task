import { useState, useEffect } from 'react';
import { BookData } from '../utils/interfaces';
import axios from 'axios';
import BookForm from './BookForm';

const defaultValues = {
  title: '',
  author: '',
  description: '',
  information: '',
  id: ''
}


const BookList = () => {
    // Collection of books
    const [Books, setBooks] = useState<BookData[]>();
    // Information in form
    const [Params, setParams] = useState<BookData>(defaultValues);

    // Fetch book collection from backend
    const getData = async () => {
      const { data } = await axios.get(`http://localhost:8080/`);
      setBooks(data);
    };

    useEffect(() => {
      getData();
    }, []);

    // Fill form with clicked book's infromation
    const handleClick = (book: BookData) => {
      setParams({
        title: book.title,
        author: book.author,
        description: book.description,
        information: book.information,
        id: book.id
      })
    }

      return (
        <div className="App">
            {Books?.map((book) => {
              return (
                <ul key={book.id}  onClick={() => handleClick(book)}>
                  <b>{book.title}:</b>
                  {' ' + book.author}, 
                  {' ' + book.description}, 
                  {' ' + book.information},
                  <hr/>
                </ul>
              );
            })}
            <BookForm 
              title={Params.title} 
              author={Params.author} 
              description={Params.description} 
              information={Params.information} 
              id={Params.id}
            />
        </div>
      );
};

export default BookList