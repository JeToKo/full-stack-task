import React, { useState, useEffect, ChangeEvent } from 'react';
import './Book-form.css';
import { BookData } from '../utils/interfaces';
import axios from 'axios';

const defaultValues = {
  title: '',
  author: '',
  description: '',
  information: '',
  id: ''
}

  /** 
   * @param object Book information from list
   * @return object Possible information from props or localStorage  
  **/
function getFormValues(props: BookData) {
  // Check if a book has been clicked
  Object.values(props).forEach(val => {
    if (val !== ''){
      return props
    }
  })

  // Fetch values stored in localStorage
  const storedValues = localStorage.getItem('form');
  if (storedValues)
    return JSON.parse(storedValues);
  return defaultValues;
}


const BookForm = (props: BookData) => {
  const [Book, setBook] = useState<BookData>(getFormValues(props));

  //Check if list is clicked and update localStorage
	useEffect(() => {
    if (props.id !== Book.id){
      localStorage.setItem('form', JSON.stringify(props))
      setBook(props)
    }
    else {
		  localStorage.setItem('form', JSON.stringify(Book));}
	}, [Book, props]);

  /* Triggers when input filds change
    Updates the currently edited book.
  */
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBook((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  }


  /* Posts a new book for backend to be saved
    Clears inputs.
    Refreshes screen.
  */
  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/save', Book)
    setBook(defaultValues);
    window.location.reload();
  };

  /* Posts a book for backend to be edited
    Clears inputs.
    Refreshes screen.
  */
  const handleModify = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/modify', Book)
    setBook(defaultValues);
    window.location.reload();
  };

  /* Posts a book for backend to be deleted
    Clears inputs.
    Refreshes screen.
  */
  const handleDelete = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/delete', Book)
    setBook(defaultValues);
    window.location.reload();
  };

  return (
    <form>
        <label>
            Title: <input 
            type="text"
            name="title" 
            value={Book.title} 
            onChange={handleChange}/> 
        </label>
            
        <br />
        <label>
            Author: <input
            type="text"
            name="author" 
            value={Book.author}
            onChange={handleChange} /> 
        </label>
        <br />
        <label>
            Description: <input 
            type="text"
            name="description" 
            value={Book.description} 
            onChange={handleChange}/> 
        </label>
        <br />
        <label className="Free-text">
            Free text: <input 
            type="text"
            name="information" 
            value={Book.information} 
            onChange={handleChange}/> 
        </label>
        <br />
        <div className='Button'>
            <button onClick={handleSubmit}>Save New</button>
            <button onClick={handleModify} disabled={props.id === ''}>Save</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    </form>
  );
};

export default BookForm