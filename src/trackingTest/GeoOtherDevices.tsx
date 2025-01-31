import { getState } from "playroomkit";

interface Props {
  index: number;
}

const GeoOtherDevices = ({ index: index }: Props) => {
  return (
    <table>
      {getState("devices") ? (
        <tbody>
          <tr>
            <td>device index:</td>
            <td>
              {getState("devices").devices[index]
                ? getState("devices").devices[index].index
                : "error"}
            </td>
          </tr>
          <tr>
            <td>device location x:</td>
            <td>
              {getState("devices").devices[index]
                ? getState("devices").devices[index].location.x
                : "error"}
            </td>
          </tr>
          <tr>
            <td>device location y:</td>
            <td>
              {getState("devices").devices[index]
                ? getState("devices").devices[index].location.y
                : "error"}
            </td>
          </tr>
        </tbody>
      ) : (
        <tr>
          <td>no device found:</td>
        </tr>
      )}
    </table>
  );
};

export default GeoOtherDevices;
