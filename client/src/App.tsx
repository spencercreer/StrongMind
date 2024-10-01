import React from "react";
import useGet from "./hooks/useGet";
import "./App.css";

function App() {
  const { data, error, isLoading } = useGet<{
    message: string;
    status: string;
  }>(`health`);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error</div>;

  return (
    <div>
      <h1 className="text-blue-500">StrongMind Pizzeria</h1>
      <h2>{data.message} Pizza</h2>
      <a
        href="https://github.com/spencercreer/StrongMind"
        target="_blank"
        className="w-12"
      >
        <img
          src="https://www.google.com/url?sa=i&url=http%3A%2F%2Ft1.gstatic.com%2Flicensed-image%3Fq%3Dtbn%3AANd9GcSVhJ46pOBVylg5_ZnYilSr14xSgJwSZ386f8C6hRKrA0MRiCpn2ozG-Bfcxa3bSdJ-&psig=AOvVaw0QC39jlPrge7Ldhu9F9fJj&ust=1727898967994000&source=images&cd=vfe&opi=89978449&ved=0CAwQjRxqFwoTCNCAsrP77YgDFQAAAAAdAAAAABAE"
          alt="StrongMind Pizzeria logo"
        />
      </a>
    </div>
  );
}

export default App;
