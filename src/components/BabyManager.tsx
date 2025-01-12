'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function BabyManager({ babies, addBaby, updateBaby }) {
  const [newBabyName, setNewBabyName] = useState('')

  const handleAddBaby = () => {
    if (newBabyName.trim()) {
      addBaby({ id: Date.now(), name: newBabyName.trim() })
      setNewBabyName('')
    }
  }

  return (
    <Card className="bg-gradient-to-r from-purple-100 to-pink-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-700">Manage Babies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Enter baby name"
            value={newBabyName}
            onChange={(e) => setNewBabyName(e.target.value)}
            className="bg-white"
          />
          <Button onClick={handleAddBaby} className="bg-blue-500 hover:bg-blue-600 text-white">Add Baby</Button>
        </div>
        <div className="space-y-2">
          {babies.map((baby) => (
            <div key={baby.id} className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow">
              <Input
                value={baby.name}
                onChange={(e) => updateBaby({ ...baby, name: e.target.value })}
                className="flex-grow"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

