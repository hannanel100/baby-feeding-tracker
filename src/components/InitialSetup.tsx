"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface InitialSetupProps {
  onComplete: (babyName: string) => void;
}

export function InitialSetup({ onComplete }: InitialSetupProps) {
  const [babyName, setBabyName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (babyName.trim()) {
      onComplete(babyName.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">
          Welcome to Baby Feeding Tracker
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Baby&apos;s Name
            </label>
            <Input
              value={babyName}
              onChange={(e) => setBabyName(e.target.value)}
              placeholder="Enter baby's name"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Start Tracking
          </Button>
        </form>
      </div>
    </div>
  );
}
