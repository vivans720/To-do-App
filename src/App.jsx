import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodoList = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: todos.length + 1,
      text: input.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput(""); // Clear input after adding
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="bg-black text-white p-6 text-center rounded-t-lg">
          <h1 className="text-2xl font-bold mb-1">To-Do List</h1>
          <p className="text-gray-300 text-sm">Stay organized</p>
        </div>

        {/* Input Section */}
        <div className="p-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodoList()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:border-black focus:outline-none text-gray-800"
            />
            <button
              type="submit"
              onClick={addTodoList}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="max-h-80 overflow-y-auto">
          {todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg mb-1">No tasks yet</p>
              <p className="text-sm">Add your first task above</p>
            </div>
          ) : (
            <ul className="border-t border-gray-200">
              {todos.map((t) => (
                <li
                  key={t.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggleCompleted(t.id)}
                      className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                    />
                    <span
                      className={`flex-1 ${
                        t.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {t.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(t.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
                      title="Delete task"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Stats */}
        {todos.length > 0 && (
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 rounded-b-lg">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total: {todos.length}</span>
              <span>Completed: {todos.filter((t) => t.completed).length}</span>
              <span>Remaining: {todos.filter((t) => !t.completed).length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
