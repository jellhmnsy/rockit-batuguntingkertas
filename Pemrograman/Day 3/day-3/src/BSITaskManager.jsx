import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { use } from 'react';

const BSITaskManager = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Task 1'},
        { id: 2, text: 'Task 2'},
        { id: 3, text: 'Task 3'},
    ]);

    const [newTaskText, setNewTaskText] = useState('');
    useEffect(() => {
        console.log("Tasks updated:", tasks);
    })

    useEffect(() => {
        console.log("New task text updated:", newTaskText);
    }, [])

    // const handleAddTask = (e) => {
    //     e.preventDefault();

    //     if (!newTaskText.trim()) {
    //         return;
    //     }

    //     setTasks(currentTasks => [
    //         ...currentTasks,
    //         { 
    //             id: Date.now(), 
    //             text: newTaskText.trim()
    //         }
    //     ]);

    //     setNewTaskText('');
    // }

    function handleAddTask(e) {
        e.preventDefault();
    
        if (!newTaskText.trim()) return;
    
        let checkTask = tasks.find((task) => task.text === newTaskText.trim());
    
        if (checkTask) return;
    
        setTasks((currentTask) => [
          ...currentTask,
          {
            id: Date.now(),
            text: newTaskText.trim(),
          },
        ]);
    
        setNewTaskText("");
      }
    

    const handleDeleteTask = (taskId) => {
        setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
    }

    return (
        <div className='max-w-md mx-auto p-4 space-y-4'>
            <h1 className='text-2xl font-bold text-center'>Task Belajar React</h1>
            <form onSubmit={handleAddTask} className='flex gap-2'>
                <input 
                type="text" 
                value={newTaskText} 
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder='Add a task'
                className='flex-1 p-2 border border-gray-300 rounded' />
                <button 
                type="submit"
                className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                    <Plus size={20}/></button>
            </form>
            <div className='space-y-2'>
                {tasks.map(task => (
                    <div 
                    key={task.id} 
                    className='flex items-center justify-between p-2 border rounded hover:bg-gray-100'>
                        <span>{task.text}</span>
                        <button onClick={() => handleDeleteTask(task.id)}
                            className='text-red-500 hover:text-red-700'><Trash2 size={20}/></button>
            </div>
                ))}
            </div>          
        </div>
    );
}

export default BSITaskManager;