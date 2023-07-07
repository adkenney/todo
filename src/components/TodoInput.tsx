import React, { FormEventHandler, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function TodoInput() {
  const [content, setContent] = useState('');

  const addTodo = (todo: any) => {
    addDoc(collection(db, 'todos'), todo).catch(err => console.error(err));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content !== '') {
      addTodo({ content: content.trim() });
    } else {
      alert('Please enter text for todo!');
    }
    setContent('');
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Create a new todo"
          aria-label="Create a new todo"
          value={content}
          onChange={e => setContent(e.target.value)}
        ></input>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
