import { cache } from "react";
import OptionsBar from "@/components/layout/OptionsBar";
import MyComboBox from "@/components/ui/MyComboBox";
import { updateMoveData } from "@/helpers/DataProcessing";

const query = `
query MyQuery {
  pokemon_v2_move {
    name
    generation_id
    pokemon_v2_movedamageclass {
      name
    }
    power
    pp
    accuracy
    pokemon_v2_type {
      name
    }
  }
}
`;
const getMoveList = cache(async () => {
  try {
    const res = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const moveData = await res.json();
    return updateMoveData(moveData.data.pokemon_v2_move);
  } catch (err) {
    console.error(err);
  }
});
export default async function Move() {
  const moveList = await getMoveList();
  return (
    <div>
      <OptionsBar />
      {/* <MyComboBox data={moveList} /> */}
    </div>
  );
}
