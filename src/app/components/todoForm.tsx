"use client";

import { useState, useCallback } from "react";
import { TodoItem } from "../types";

type TodoFormData = Omit<TodoItem, 'id'>;

// Props for TodoForm component
interface TodoFormProps {
  onAddTodo: (todoData: TodoFormData) => void;
}

// Initial form state
const initialFormState = {
  activity: "",
  price: 0,
  type: "education",
  bookingRequired: false,
  accessibility: 0.5,
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  // State for the form
  const [formData, setFormData] = useState<TodoFormData>({ ...initialFormState });

  // Handle form input changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    },
    []
  );

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Pass form data to parent component
      onAddTodo({
        ...formData,
        price: Number(formData.price),
        accessibility: Number(formData.accessibility),
      });

      // Reset form
      setFormData({ ...initialFormState });
    },
    [formData, onAddTodo]
  );

  return (
    <div className="card mb-8">
      <h2 className="card-title">Add New Activity</h2>

      <form onSubmit={handleSubmit} className="form-container">
        {/* Activity Input */}
        <div>
          <label className="form-group" htmlFor="activity">
            Activity
          </label>
          <input
            type="text"
            id="activity"
            name="activity"
            value={formData.activity}
            onChange={handleInputChange}
            required
            className="form-input"
            placeholder="Enter an activity"
          />
        </div>

        {/* Price Input */}
        <div>
          <label className="form-group" htmlFor="price">
            Price
          </label>
          <div className="flex items-center">
            <span className="mr-2 text-gray-700 font-medium">RM</span>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="form-input"
            />
          </div>
        </div>

        {/* Type Select */}
        <div>
          <label className="form-group" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="education">Education</option>
            <option value="recreational">Recreational</option>
            <option value="social">Social</option>
            <option value="diy">DIY</option>
            <option value="charity">Charity</option>
            <option value="cooking">Cooking</option>
            <option value="relaxation">Relaxation</option>
            <option value="music">Music</option>
            <option value="busywork">Busywork</option>
          </select>
        </div>

        {/* Booking Required Checkbox */}
        <div className="form-checkbox-group">
          <input
            type="checkbox"
            id="bookingRequired"
            name="bookingRequired"
            checked={formData.bookingRequired}
            onChange={handleInputChange}
            className="form-checkbox"
          />
          <label className="text-sm font-medium" htmlFor="bookingRequired">
            Booking Required
          </label>
        </div>

        {/* Accessibility Slider */}
        <div>
          <label className="form-group">
            Accessibility: {formData.accessibility}
          </label>
          <input
            type="range"
            id="accessibility"
            name="accessibility"
            min="0"
            max="1"
            step="0.1"
            value={formData.accessibility}
            onChange={handleInputChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0.0</span>
            <span>1.0</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary"
        >
          Add Activity
        </button>
      </form>
    </div>
  );
}