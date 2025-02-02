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
          width: "5em",
          height: "5em",
          left: left + "px",
          top: top + "px",
          position: "absolute",
        }}
        draggable="false"
      ></img>
    </div>
  );
}
