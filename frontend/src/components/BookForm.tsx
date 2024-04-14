import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './Book-form.css';
import { BookData } from '../utils/interfaces';

function getFormValues() {
  const storedValues = localStorage.getItem('form');
  if (!storedValues)
    return {
      title: '',
      author: '',
      description: '',
      information: '',
    };
  return JSON.parse(storedValues);
}

const BookForm = () => {
  const [Books, setBooks] = useState<BookData>(getFormValues);

	useEffect(() => {
		localStorage.setItem('form', JSON.stringify(Books));
	}, [Books]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBooks((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: '',
          author: '',
          description: '',
          information: '',
        }),
      });
      console.log(response)
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <label>
            Title: 
            <input 
            type="text"
            name="title" 
            value={Books.title} 
            onChange={handleChange}/> 
        </label>
        <br />
        <label>
            Author: 
            <input
            type="text"
            name="author" 
            value={Books.author}
            onChange={handleChange} /> 
        </label>
        <br />
        <label>
            Description: 
            <input 
            type="text"
            name="description" 
            value={Books.description} 
            onChange={handleChange}/> 
        </label>
        <br />
        <label className="Free-text">
            Free text: 
            <input 
            type="text"
            name="information" 
            value={Books.information} 
            onChange={handleChange}/> 
        </label>
        <br />
        <div className='Button'>
            <button type='submit'>Save New</button>
            <button>Save</button>
            <button>Delete</button>
        </div>
    </form>
  );
};

export default BookForm