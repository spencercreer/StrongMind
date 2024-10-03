import React from "react";
import ToppingsList from "./components/ToppingsList";

export default function ToppingsPage() {
  return (
    <div className="flex-grow bg-tan p-8">
      <div className="max-w-4xl mx-auto">
        <ToppingsList />
      </div>
    </div>
  );
}
