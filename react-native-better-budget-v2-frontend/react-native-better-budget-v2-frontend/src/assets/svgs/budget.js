import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';

export default Budget = ({ color = '#222', height, width }) => {
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
                d="M241 661c-12-11-30-17-41-14s-31-2-45-11c-19-13-25-25-25-54 0-21 6-47 14-57 10-14 11-25 4-38-5-10-8-28-6-41 2-14-11-38-35-66-41-49-67-120-67-187C40 89 99 48 260 42c59-2 123 1 145 7 26 7 43 7 49 1s51-10 101-10c125 0 123-2 123 170s2 170-123 170c-81 0-94 3-111 21-10 12-17 32-16 44 2 13-1 32-6 42-7 13-6 26 4 43 22 41 18 87-11 106-14 9-34 14-45 11s-29 3-41 14c-12 10-32 19-44 19s-32-9-44-19zm122-61c39 0 44-8 26-43-18-33-28-37-104-37s-86 4-104 38c-16 30-7 42 33 42 20 0 40 8 51 20l18 20 22-20c13-13 35-20 58-20zm17-145c0-12-17-15-95-15s-95 3-95 15 17 15 95 15 95-3 95-15zm16-76c37-23 35-13 36-183 0-63-4-91-13-97-22-13-135-22-196-14C114 98 73 138 85 217c9 69 42 130 83 158 50 34 176 36 228 4zm242-56c3-10-18-13-82-13-79 0-97 5-79 24 13 12 156 2 161-11zm0-75c-3-9-29-13-83-13s-80 4-82 13c-4 9 17 12 82 12s86-3 83-12zm0-75c3-10-18-13-82-13-79 0-97 5-79 24 13 12 156 2 161-11zm0-75c-3-9-29-13-83-13s-80 4-82 13c-4 9 17 12 82 12s86-3 83-12z"
                transform="matrix(.1 0 0 -.1 0 72)"
            />
            <Path
                d="M250 318c-36-49-23-98 26-98 13 0 24-5 24-11 0-7-11-9-29-6-46 9-56-13-21-46 15-15 32-27 37-27 12 0 63 60 63 74 0 24-32 56-56 56-13 0-24 5-24 11 0 7 12 9 34 5 45-9 53 13 16 47-16 15-32 27-37 27s-20-15-33-32z"
                transform="matrix(.1 0 0 -.1 0 72)"
            />
        </Svg>
    );
};
