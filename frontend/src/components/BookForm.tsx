import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
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

function getFormValues(props: BookData) {
  Object.values(props).forEach(val => {
    if (val !== ''){
      return props
    }
  })
  const storedValues = localStorage.getItem('form');
  if (!storedValues)
    return defaultValues;
  return JSON.parse(storedValues);
}

const BookForm = (props: BookData) => {
  const [Book, setBooks] = useState<BookData>(getFormValues(props));

	useEffect(() => {
    if (props.id !== Book.id){
      localStorage.setItem('form', JSON.stringify(props))
      setBooks(props)
    }
    else{
		localStorage.setItem('form', JSON.stringify(Book));}
	}, [Book, props]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBooks((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  }


  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
      await axios.post('http://localhost:8080/save', Book)
      setBooks(defaultValues);
      window.location.reload();
    };

    const handleModify = async (e: React.ChangeEvent<any>) => {
      e.preventDefault();
        await axios.post('http://localhost:8080/modify', Book)
        setBooks(defaultValues);
        window.location.reload();
      };

      const handleDelete = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
          await axios.post('http://localhost:8080/delete', Book)
          setBooks(defaultValues);
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