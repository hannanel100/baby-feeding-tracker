'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function FeedingGraphs({ babies, feedings }) {
  const [selectedBaby, setSelectedBaby] = useState(babies[0]?.id.toString() || '')

  const filteredFeedings = feedings.filter(feeding => feeding.babyId.toString() === selectedBaby)

  const dailyTotals = filteredFeedings.reduce((acc, feeding) => {
    const date = new Date(feeding.time).toLocaleDateString()
    if (!acc[date]) {
      acc[date] = { bottleAmount: 0, breastDuration: 0 }
    }
    if (feeding.type === 'bottle') {
      acc[date].bottleAmount += feeding.amount
    } else {
      acc[date].breastDuration += feeding.duration
    }
    return acc
  }, {})

  const barChartData = Object.entries(dailyTotals).map(([date, data]) => ({
    date,
    bottleAmount: data.bottleAmount,
    breastDuration: data.breastDuration,
  }))

  const lineChartData = filteredFeedings.map(feeding => ({
    time: new Date(feeding.time).toLocaleString(),
    amount: feeding.type === 'bottle' ? feeding.amount : 0,
    duration: feeding.type === 'breast' ? feeding.duration : 0,
  }))

  return (
    <Card className="bg-gradient-to-r from-yellow-100 to-green-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-700">Feeding Graphs</CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          value={selectedBaby}
          onValueChange={setSelectedBaby}
        >
          <SelectTrigger className="w-[200px] bg-white mb-4">
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
        <div className="space-y-8">
          <div className="h-[400px] bg-white p-4 rounded-lg shadow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="bottleAmount" fill="#8884d8" name="Bottle (oz)" />
                <Bar yAxisId="right" dataKey="breastDuration" fill="#82ca9d" name="Breast (min)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[400px] bg-white p-4 rounded-lg shadow">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="amount" stroke="#8884d8" name="Bottle (oz)" />
                <Line yAxisId="right" type="monotone" dataKey="duration" stroke="#82ca9d" name="Breast (min)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

