interface Props {
  width: number | string;
  height: number | string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  arrow?: boolean;
}

export function InteractionBorder({
  width,
  height,
  top,
  left,
  bottom,
  right,
}: Props) {
  let direction: string = "bottom";
  if (top != null) {
    direction = "top";
  } else if (left != null) {
    direction = "left";
  } else if (right != null) {
    direction = "right";
  }

  return (
    <div
      style={{
        background: `linear-gradient(to ${direction}, #fff0 0%, #000f 100%)`,
        width: width,
        height: height,
        position: "absolute",
        left: left ? left : "",
        top: top ? top : "",
        right: right ? right : "",
        bottom: bottom ? bottom : "",
        display: "flex",
      }}
    ></div>
  );
}
