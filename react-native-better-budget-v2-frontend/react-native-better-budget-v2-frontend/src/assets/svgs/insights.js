import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

export default Insights = ({ color, height, width }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ?? 21.14}
            height={height ?? 23.318}
            viewBox="0 0 72.000000 72.000000"
            fill={color}
            stroke="none"
        >
            <Path
                stroke="none"
                d="M460 630c0-15 7-20 27-20 27 0 27-1-19-47l-48-47-38 37c-21 20-44 37-51 37-21 0-201-154-201-172 0-33 32-18 115 51l82 70 39-40c21-21 45-39 53-39 9 0 41 26 73 57 56 55 58 56 58 30 0-20 5-27 20-27 18 0 20 7 20 65v65h-65c-58 0-65-2-65-20zM610 255c0-208 1-215 20-215s20 7 20 215-1 215-20 215-20-7-20-215zM430 225c0-178 1-185 20-185s20 7 20 185-1 185-20 185-20-7-20-185zM250 195c0-148 1-155 20-155s20 7 20 155-1 155-20 155-20-7-20-155zM70 165C70 47 71 40 90 40s20 7 20 125-1 125-20 125-20-7-20-125z"
                transform="matrix(.1 0 0 -.1 0 72)"
            />
        </Svg>
    )
}
