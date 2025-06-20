import React, { useState, useRef, useEffect } from 'react';

interface ColumnFormProps {
    onAdd: (title: string) => void;
    showForm: boolean;
    setShowForm: (showForm: boolean) => void;
}

const ColumnForm: React.FC<ColumnFormProps> = ({ onAdd, showForm, setShowForm }) => {
    const [title, setTitle] = useState('');
    const formRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title.trim());
        setTitle('');
        setShowForm(false);
    };

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showForm && formRef.current && !formRef.current.contains(event.target as Node)) {
                setShowForm(false);
                setTitle('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showForm]);

    return (
        <div
            ref={formRef}
            className="min-w-[18rem] w-72 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
            <form onSubmit={handleSubmit} className="w-full">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Column title"
                    className="input text-sm w-full mb-2"
                />
                <div className="flex gap-2">
                    <button type="submit" className="btn btn-primary px-3 py-1 text-xs">
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="btn btn-secondary px-3 py-1 text-xs"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ColumnForm;
