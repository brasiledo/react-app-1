import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';

export default Notification = ({ color = '#222', height, width }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 21.14}
      height={height ?? 23.318}
      viewBox="0 0 21.14 23.318">
      <G
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path
          data-name="Path 841"
          d="M16.367 6.547a6.547 6.547 0 10-13.093 0c0 7.638-3.273 9.82-3.273 9.82h19.64s-3.273-2.182-3.273-9.82"
          transform="translate(.75 .75)"
        />
        <Path
          data-name="Path 842"
          d="M11.708 20.731a2.182 2.182 0 01-3.775 0"
          transform="translate(.75 .75)"
        />
      </G>
    </Svg>
  );
};
