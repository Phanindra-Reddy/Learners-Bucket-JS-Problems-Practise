import { useEffect, useState } from "react";
import Circle from "./Circle";

const OverlappingCircleDetection = () => {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

   function getRandomFunctionColor() {
     const randomColor = Math.floor(Math.random() * 16777215).toString(16);
     return `#${randomColor.padStart(6, "0")}`;
   }

  function handleDocumentClick(event) {
    let x = event.clientX;
    let y = event.clientY;

    const newCircle = { x, y };

    setCircles((prevCircles) => {
      const oldCircles = [...prevCircles];
      const newColor = getRandomFunctionColor();

      oldCircles.forEach((c) => {
        const x2 = newCircle.x;
        const y2 = newCircle.y;

        const x1 = c.x;
        const y1 = c.y;

        const xDiff = x2 - x1;
        const yDiff = y2 - y1;

        const distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

        const sum_of_radius = 96;

        if (distance < sum_of_radius) {
          newCircle.color = newColor;
          c.color = newColor;
        }
      });

      oldCircles.push(newCircle);

      return oldCircles;
    });
  }

  console.log(circles);
  

  return (
    <div id="OverlappingCircleDetection" className="realtive">
      <h1 className=" text-3xl font-semibold mb-10">
        Overlapping Circle Detection
      </h1>
      {circles?.map((coord, index) => {
        return (
          <Circle key={index} x={coord.x} color={coord.color} y={coord.y} />
        );
      })}
    </div>
  );
};

export default OverlappingCircleDetection;
