import React, { useState, useEffect } from "react";
import { Eye } from 'lucide-react';
import { Send } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Loader, AlertCircle, CheckCircle, Circle } from "lucide-react";


const AccountStats = () => {
    const [balance, setBalance] =useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBcalance = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/balance');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBalance(data);
                setLoading(false);
            } catch (error) {
                setError(error);
        } finally {
            setLoading(false);
        }
    }
        fetchBcalance();
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
        <div className="section2 flex px-24 py-12">
        <div className="bg-teal-600 p-12 rounded-2xl mr-12 content-center">
        <div className="flex">
            <p className="font-normal text-2xl text-white mr-2">Account</p>
            <p className="font-normal text-2xl text-white">No.</p>
        </div>
        <div>
            <p className="font-bold text-4xl text-white">{balance.accountNo}</p>
        </div>
        </div>
        <div className="bg-white p-12 rounded-2xl w-full">
        <div className="text-left">
            <div>
            <p className="font-normal text-2xl">Balance</p>
            </div>
        </div>
        <div className="flex w-full justify-between items-center">
            <div className="flex">
            <p className="font-semibold text-4xl">Rp. {balance.amount},00</p>
            <button className="font-normal ml-14 text-slate-400">
                <Eye size={38} strokeWidth={1} />
            </button>
            </div>
            <div className="flex items-center">
            <button className="bg-teal-600 text-white p-4 rounded-xl hover:ring-offset-teal-200 hover:ring-0 hover:ring-offset-4">
                <Plus size={34} strokeWidth={3} />
            </button>
            <button className="bg-teal-600 text-white p-4 rounded-xl ml-6 hover:ring-offset-teal-200 hover:ring-0 hover:ring-offset-4">
                <Send size={34} strokeWidth={3} />
            </button>
            </div>
        </div>
        </div>
        </div>
    )
}

export default AccountStats;
