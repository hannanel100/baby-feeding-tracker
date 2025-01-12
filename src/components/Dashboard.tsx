'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BabyManager } from './BabyManager'
import { FeedingManager } from './FeedingManager'
import { FeedingGraphs } from './FeedingGraphs'
import { useBabyData } from '@/hooks/useBabyData'
import { useFeedingData } from '@/hooks/useFeedingData'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('babies')
  const { babies, addBaby, updateBaby } = useBabyData()
  const { feedings, addFeeding, updateFeeding, deleteFeeding } = useFeedingData()

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-800">Baby Feeding Tracker</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white rounded-lg shadow-lg p-4">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="babies" className="text-lg font-semibold">Manage Babies</TabsTrigger>
          <TabsTrigger value="feedings" className="text-lg font-semibold">Manage Feedings</TabsTrigger>
          <TabsTrigger value="graphs" className="text-lg font-semibold">Feeding Graphs</TabsTrigger>
        </TabsList>
        <TabsContent value="babies">
          <BabyManager babies={babies} addBaby={addBaby} updateBaby={updateBaby} />
        </TabsContent>
        <TabsContent value="feedings">
          <FeedingManager 
            babies={babies}
            feedings={feedings}
            addFeeding={addFeeding}
            updateFeeding={updateFeeding}
            deleteFeeding={deleteFeeding}
          />
        </TabsContent>
        <TabsContent value="graphs">
          <FeedingGraphs babies={babies} feedings={feedings} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

