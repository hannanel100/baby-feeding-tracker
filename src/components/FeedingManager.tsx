'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function FeedingManager({ babies, feedings, addFeeding, updateFeeding, deleteFeeding }) {
  const [newFeeding, setNewFeeding] = useState({ babyId: '', type: 'bottle', amount: '', duration: '', time: '' })

  const handleAddFeeding = () => {
    if (newFeeding.babyId && newFeeding.type && newFeeding.time) {
      addFeeding({
        id: Date.now(),
        babyId: newFeeding.babyId,
        type: newFeeding.type,
        amount: newFeeding.type === 'bottle' ? parseFloat(newFeeding.amount) : undefined,
        duration: newFeeding.type === 'breast' ? parseInt(newFeeding.duration) : undefined,
        time: new Date(newFeeding.time).toISOString(),
      })
      setNewFeeding({ babyId: '', type: 'bottle', amount: '', duration: '', time: '' })
    }
  }

  return (
    <Card className="bg-gradient-to-r from-pink-100 to-blue-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-purple-700">Manage Feedings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4">
          <Select
            value={newFeeding.babyId}
            onValueChange={(value) => setNewFeeding({ ...newFeeding, babyId: value })}
          >
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Select Baby" />
            </SelectTrigger>
            <SelectContent>
              {babies.map((baby) => (
                <SelectItem key={baby.id} value={baby.id.toString()}>
                  {baby.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <RadioGroup
            value={newFeeding.type}
            onValueChange={(value) => setNewFeeding({ ...newFeeding, type: value })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bottle" id="bottle" />
              <Label htmlFor="bottle">Bottle</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="breast" id="breast" />
              <Label htmlFor="breast">Breast</Label>
            </div>
          </RadioGroup>
          {newFeeding.type === 'bottle' && (
            <Input
              type="number"
              placeholder="Amount (oz)"
              value={newFeeding.amount}
              onChange={(e) => setNewFeeding({ ...newFeeding, amount: e.target.value })}
              className="w-[150px] bg-white"
            />
          )}
          {newFeeding.type === 'breast' && (
            <Input
              type="number"
              placeholder="Duration (min)"
              value={newFeeding.duration}
              onChange={(e) => setNewFeeding({ ...newFeeding, duration: e.target.value })}
              className="w-[150px] bg-white"
            />
          )}
          <Input
            type="datetime-local"
            value={newFeeding.time}
            onChange={(e) => setNewFeeding({ ...newFeeding, time: e.target.value })}
            className="w-[250px] bg-white"
          />
          <Button onClick={handleAddFeeding} className="bg-green-500 hover:bg-green-600 text-white">Add Feeding</Button>
        </div>
        <div className="space-y-4">
          {feedings.map((feeding) => (
            <div key={feeding.id} className="flex flex-wrap items-center gap-2 p-2 bg-white rounded-lg shadow">
              <Select
                value={feeding.babyId.toString()}
                onValueChange={(value) => updateFeeding({ ...feeding, babyId: value })}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {babies.map((baby) => (
                    <SelectItem key={baby.id} value={baby.id.toString()}>
                      {baby.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={feeding.type}
                onValueChange={(value) => updateFeeding({ ...feeding, type: value })}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bottle">Bottle</SelectItem>
                  <SelectItem value="breast">Breast</SelectItem>
                </SelectContent>
              </Select>
              {feeding.type === 'bottle' && (
                <Input
                  type="number"
                  value={feeding.amount}
                  onChange={(e) => updateFeeding({ ...feeding, amount: parseFloat(e.target.value) })}
                  className="w-[100px]"
                />
              )}
              {feeding.type === 'breast' && (
                <Input
                  type="number"
                  value={feeding.duration}
                  onChange={(e) => updateFeeding({ ...feeding, duration: parseInt(e.target.value) })}
                  className="w-[100px]"
                />
              )}
              <Input
                type="datetime-local"
                value={new Date(feeding.time).toISOString().slice(0, 16)}
                onChange={(e) => updateFeeding({ ...feeding, time: new Date(e.target.value).toISOString() })}
                className="w-[250px]"
              />
              <Button variant="destructive" onClick={() => deleteFeeding(feeding.id)}>Delete</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

