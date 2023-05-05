'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function page() {
  const [query, setQuery] = useState('');
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await axios.get(`https://server-social-benefits.vercel.app/searchAccounts?for=${query}`);
        setAccounts(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAccounts();
  }, [query]);

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Accounts</h1>
      <div className="mb-4">
        <label htmlFor="search" className="block font-medium mb-1">
          Search:
        </label>
        <input
          type="text"
          id="search"
          name="search"
          className="border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 rounded-md w-full"
          placeholder="Search accounts by email or name"
          value={query}
          onChange={handleInputChange}
        />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td className="border px-4 py-2">{account.id}</td>
              <td className="border px-4 py-2">{account.name}</td>
              <td className="border px-4 py-2">{account.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
