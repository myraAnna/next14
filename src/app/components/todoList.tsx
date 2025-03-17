import React from 'react';
import { TodoItem } from '../types';

interface TodoListProps {
    todoList: TodoItem[];
    onRemoveTodo: (id: number) => void;
}

export default function TodoList({ todoList, onRemoveTodo }: TodoListProps) {
    return (
        <div className="card">
        <h2 className="card-title">Your Activities</h2>

        {todoList.length === 0 ? (
            <p className="empty-state">No activities yet. Add one above!</p>
        ) : (
            <ul className="todo-list">
            {todoList.map((item) => (
                <li
                key={item.id}
                className="todo-item"
                >
                <div className="todo-content">
                    <div>
                    <h3 className="todo-title">{item.activity}</h3>
                    <div className="todo-details">
                        <p>Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                        <p>Accessibility: {item.accessibility.toFixed(1)}</p>
                        <p>{item.bookingRequired ? "Booking required" : "No booking required"}</p>
                    </div>
                    </div>
                    <button
                    onClick={() => onRemoveTodo(item.id)}
                    className="btn-danger"
                    aria-label="Delete item"
                    >
                    Remove
                    </button>
                </div>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}