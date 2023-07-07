import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
export default function Todos() {
  interface Todo {
    id: string;
    content: string;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  //Get Firebase data
  const fetchTodos = () => {
    onSnapshot(collection(db, 'todos'), snapshot => {
      const todoData = snapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content,
      }));
      setTodos(todoData);
    });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <section>
      <TodoInput />
      {todos.map(todo => {
        return (
          <ul>
            <TodoItem key={todo.id} id={todo.id} content={todo.content} />
          </ul>
        );
      })}
    </section>
  );
}
