import React, { useEffect } from 'react';
import './Book-form.css';


const BookForm = () => {

    const fetchBooks = () =>{
        fetch('')
        .then((response) => response.json)
        .then(data => console.log(data))
    }
    
    useEffect(() => {
        fetchBooks()
    }, []);

    return (
        <form>
            <label>
                Title
                <input type="text" name="Title" /> 
            </label>
            <label>
                <p>Author</p>
                <input type="text" name="Author" /> 
            </label>
            <label>
                <p>Description</p>
                <input type="text" name="Description" /> 
            </label>
            <label className="Free-text">
                <input type="text" name="FreeText" /> 
            </label>
            <div className='Button'>
                <button type='submit'>Save New</button>
                <button>Save</button>
                <button>Delete</button>
            </div>
        </form>
        
        
    );
};

export default BookForm