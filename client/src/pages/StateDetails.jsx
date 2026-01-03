import { useParams } from "react-router-dom";
import { statesData } from "../data/statesData";

export default function StateDetails() {
  const { stateId } = useParams();
  const state = statesData[stateId];

  if (!state) {
    return <div className="p-10">State not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{state.name}</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-100 rounded-lg">
          <h3 className="font-semibold">Rank</h3>
          <p className="text-xl">{state.rank}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg">
          <h3 className="font-semibold">Score</h3>
          <p className="text-xl">{state.score}</p>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg">
          <h3 className="font-semibold">Status</h3>
          <p className="text-xl">{state.status}</p>
        </div>
      </div>
    </div>
  );
}
