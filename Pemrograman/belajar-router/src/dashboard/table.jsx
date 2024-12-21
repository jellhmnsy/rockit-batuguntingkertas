import React, { useState, useEffect } from "react";
import { Loader, AlertCircle, CheckCircle, Circle } from "lucide-react";
const Table = () => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/transactions');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTransactions(data);
                setLoading(false);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
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
        <div className="px-24">
            <div className='Filter flex'>
                <div className='Search'>

                </div>
                <div className='Show'>

                </div>
                <div className='Sort'>

                </div>
                <div className='descending'>

                </div>
            </div>
            <div>
                <table className="table-auto border-collapse w-full">
                    <thead>
                        <tr className="">
                        <th className="border border-slate-700 py-4 px-2 w-56">Date & Time</th>
                        <th className="border border-slate-700">Type</th>
                        <th className="border border-slate-700">From/To</th>
                        <th className="border border-slate-700">Description</th>
                        <th className="border border-slate-700">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction)=> (
                            <tr key={transaction.id} className="text-start">
                                <td className="border border-slate-700 py-1 px-4">{transaction.date}</td>
                                <td className="border border-slate-700 px-3">{transaction.type}</td>
                                <td className="border border-slate-700 px-3">{transaction.from}</td>
                                <td className="border border-slate-700 px-3">{transaction.description}</td>
                                <td className="border border-slate-700 px-3">{transaction.amount}</td>                           
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table