import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';

export default Home = ({ color = '#222', height, width }) => {
  return (
    <Svg
      data-name="Icon"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24">
      <G
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        data-name="Mask Group 107"
        clipPath="url(#a)">
        <Path
          data-name="Path 827"
          d="M0 7.636L9.818 0l9.818 7.636v12a2.182 2.182 0 01-2.182 2.182H2.182A2.182 2.182 0 010 19.636z"
          transform="translate(2.182 1.091)"
        />
        <Path
          data-name="Path 828"
          d="M6.545 21.818V10.909h6.545v10.909"
          transform="translate(2.182 1.091)"
        />
      </G>
    </Svg>
  );
};
