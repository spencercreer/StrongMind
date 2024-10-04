import ToppingsList from "./components/ToppingsList";

export default function ToppingsPage() {
  return (
    <div className="flex-grow bg-tan py-8 px-12">
      <div className="max-w-4xl mx-auto">
        <ToppingsList />
      </div>
    </div>
  );
}
