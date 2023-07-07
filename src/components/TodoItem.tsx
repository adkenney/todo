import { db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export default function TodoItem(props: any) {
  const { content, id } = props;

  const handleDelete = (id: string) => {
    const docRef = doc(db, 'todos', id);
    if (confirm('Are you sure you want to delete this?')) {
      deleteDoc(docRef).catch(err => console.error(err));
    }
  };
  return (
    <li>
      <input type="checkbox" />
      {content}
      <button onClick={() => handleDelete(id)}>delete</button>
    </li>
  );
}
