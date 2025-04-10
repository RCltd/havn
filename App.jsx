import React, { useState } from "react"
import { listings } from "./listings"

export default function App() {
  const [budget, setBudget] = useState(2000)
  const [commute, setCommute] = useState(20)
  const [results, setResults] = useState([])

  const handleSearch = () => {
    const filtered = listings.filter(l => {
      const cleanPrice = parseInt(l.price.replace(/[^\d]/g, ""))
      const cleanCommute = parseInt(l.commute.replace(/[^\d]/g, ""))
      return cleanPrice <= budget && cleanCommute <= commute
    })
    setResults(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Find Your Ideal Rental</h1>
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm">Max Budget (£)</label>
          <input type="number" value={budget} onChange={e => setBudget(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Max Commute (mins)</label>
          <input type="number" value={commute} onChange={e => setCommute(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <button onClick={handleSearch} className="col-span-2 bg-black text-white py-2 rounded">Search</button>
      </div>
      <div className="grid gap-4 max-w-4xl mx-auto">
        {results.map((listing, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-lg">{listing.title}</h2>
            <p className="text-sm text-gray-500">{listing.address}</p>
            <p>{listing.price} — {listing.commute}</p>
            <a href={listing.link} className="text-blue-600 text-sm underline mt-1 inline-block">View Listing</a>
          </div>
        ))}
      </div>
    </div>
  )
}
