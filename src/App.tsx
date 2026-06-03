import { useEffect, useState } from 'react';

import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    const storedTodos = sessionStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const addTodo = (text: string) => {
    const newTodos = [...todos, text];
    setTodos(newTodos);
    sessionStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>ToDo OCP</h1>
      <TodoInput onAddTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;

// Made with Bob
