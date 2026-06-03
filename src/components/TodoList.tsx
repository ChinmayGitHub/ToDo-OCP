interface TodoListProps {
  todos: string[];
}

export default function TodoList({ todos }: TodoListProps) {
  return (
    <div>
      <h2>ToDo List:</h2>
      {todos.length === 0 ? (
        <p>No todos yet</p>
      ) : (
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          {todos.map((todo, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              {todo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Made with Bob
