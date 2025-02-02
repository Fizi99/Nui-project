import { usePlayersList } from "playroomkit";

interface Props {
  left: number;
  top: number;
  index: number;
}

export function PlayerIcon({ left, top, index }: Props) {
  return (
    <div>
      <img
        src={usePlayersList(true)[index].getProfile().photo}
        style={{
          width: "3em",
          height: "3em",
          left: left + "px",
          top: top + "px",
          position: "absolute",
        }}
      ></img>
    </div>
  );
}
