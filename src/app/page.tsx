"use client";

import { useState, useCallback } from "react";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";

// Define the type for a to-do item
interface TodoItem {
  id: number;
  activity: string;
  price: number;
  type: string;
  bookingRequired: boolean;
  accessibility: number;
}

export default function Home() {

  const [todoList, setTodoList] = useState<TodoItem[]>([]);


  const handleAddTodo = useCallback((todoData: Omit<TodoItem, 'id'>) => {

    setTodoList((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...todoData,
      },
    ]);
  }, []);


  const handleRemoveTodo = useCallback((id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  return (
    <div className="app-container">
      <header className="page-header">
        <h1 className="page-title">To-Do List App</h1>
        <p className="page-subtitle">
          Add your activities and track them!
        </p>
      </header>

      <main className="main-content">
        {/* To-Do Form */}
        <TodoForm onAddTodo={handleAddTodo} />

        {/* To-Do List */}
        <TodoList todoList={todoList} onRemoveTodo={handleRemoveTodo} />
      </main>

      <footer className="page-footer">
        <p>Myra Annatasha © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
