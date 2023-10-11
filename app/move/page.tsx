import OptionsBar from "../../components/layout/OptionsBar";
import MyComboBox from "../../components/ui/MyComboBox";

export const metadata = {
  title: "Move",
};

export default async function Move() {
  return (
    <div>
      <OptionsBar />
      {/* <MyComboBox data={moveList} /> */}
    </div>
  );
}
