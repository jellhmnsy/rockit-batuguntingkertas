import React, { useState, useEffect } from "react";
import { Loader, AlertCircle, CheckCircle, Circle } from "lucide-react";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:3000/balance");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setTodos(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader className="animate-spin text-blue-500 size={24}"/>
                <span className="ml-2">Loading todos...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-500 rounded-lg flex items-center">
                <AlertCircle size={20} className="mr-2" />
                <span>Error: {error}</span>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <div className="space-y-2">
                {todos.map(todo => (
                    <div key={todo.id} className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        {todo.completed ? (
                            <CheckCircle size={20} className="text-green-500 mr-3" />
                        ) : (
                            <Circle className="text-gray-400 mr-3" size={20}/>                        
                        )}
                        <div className="flex-1">
                            <p className="{`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}">
                                {todo.title}
                            </p>
                            <span className="text-xs text-gray-500">
                                User ID: {todo.userId}, Todo ID: {todo.id}
                            </span>
                        </div> 
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodoList