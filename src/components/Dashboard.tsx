"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeedingManager } from "./FeedingManager";
import { FeedingGraphs } from "./FeedingGraphs";
import { useBabyData } from "@/hooks/useBabyData";
import { useFeedingData } from "@/hooks/useFeedingData";
import { InitialSetup } from "./InitialSetup";
import { Baby } from "@/types";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("feedings");
  const { babies, addBaby } = useBabyData();
  const { feedings, addFeeding, updateFeeding, deleteFeeding } =
    useFeedingData();

  const handleInitialSetup = (babyName: string) => {
    addBaby({ name: babyName, id: 1 } as Baby);
  };

  if (babies.length === 0) {
    return <InitialSetup onComplete={handleInitialSetup} />;
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-800">
        {babies[0].name}s Feeding Tracker
      </h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="bg-white rounded-lg shadow-lg p-4"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="feedings" className="text-lg font-semibold">
            Manage Feedings
          </TabsTrigger>
          <TabsTrigger value="graphs" className="text-lg font-semibold">
            Feeding Graphs
          </TabsTrigger>
        </TabsList>
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
  );
}
