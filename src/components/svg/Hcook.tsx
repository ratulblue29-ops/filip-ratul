import React from "react";
import Svg, { Path } from "react-native-svg";

const CalendarOutlineIcon = ({
  width = 25,
  height = 22,
  color = "#374151",
  strokeWidth = 2,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 22"
      fill="none"
      {...props}
    >
      <Path
        d="M1 8.77778H23.2222M8.77778 2.11111V4.33333M14.3333 1V4.33333M19.8889 2.11111V4.33333M22.1111 17.6667V8.77778H6.55556V17.6667C6.55556 18.5507 6.90674 19.3986 7.53187 20.0237C8.15699 20.6488 9.00483 21 9.88889 21H18.7778C19.6618 21 20.5097 20.6488 21.1348 20.0237C21.7599 19.3986 22.1111 18.5507 22.1111 17.6667Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CalendarOutlineIcon;
