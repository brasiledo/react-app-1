import * as React from "react"
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"

export default Delete = ({ color = '#222', height, width }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ?? 25}
            height={height ?? 25}
            viewBox="0 0 25 25"
        >
            <Defs>
                <ClipPath id="a">
                    <Path
                        data-name="Rectangle 682"
                        transform="translate(175 407)"
                        fill="#f60700"
                        opacity={0.1}
                        d="M0 0H25V25H0z"
                    />
                </ClipPath>
            </Defs>
            <G
                data-name="Mask Group 113"
                transform="translate(-175 -407)"
                clipPath="url(#a)"
            >
                <G
                    transform="translate(173.864 405.864)"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                >
                    <Path data-name="Path 837" d="M3.409 6.818h20.455" />
                    <Path
                        data-name="Path 838"
                        d="M21.591 6.818v15.909A2.273 2.273 0 0119.318 25H7.955a2.273 2.273 0 01-2.273-2.273V6.818m3.409 0V4.545a2.273 2.273 0 012.273-2.273h4.545a2.273 2.273 0 012.273 2.273v2.273"
                    />
                    <Path
                        data-name="Line 66"
                        transform="translate(11.364 12.5)"
                        d="M0 0L0 6.818"
                    />
                    <Path
                        data-name="Line 67"
                        transform="translate(15.909 12.5)"
                        d="M0 0L0 6.818"
                    />
                </G>
            </G>
        </Svg>
    )
}
