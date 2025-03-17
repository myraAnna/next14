"use client";

import { useState, useCallback, useEffect } from "react";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";
import { TodoItem } from "./types";

export default function Home() {
  const [todoList, setTodoList] = useState<TodoItem[]>(() => {

    if (typeof window !== 'undefined') {
      try {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
      } catch (error) {
        console.error('Failed to load todos from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todoList));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  }, [todoList]);

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
