interface Props {
  width: number | string;
  height: number | string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

export function InteractionBorder({
  width,
  height,
  top,
  left,
  bottom,
  right,
}: Props) {
  return (
    <div
      style={{
        background: "lightgray",
        width: width,
        height: height,
        position: "absolute",
        left: left ? left : "",
        top: top ? top : "",
        right: right ? right : "",
        bottom: bottom ? bottom : "",
      }}
    ></div>
  );
}
