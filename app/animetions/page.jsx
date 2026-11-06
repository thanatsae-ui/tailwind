'use client'
import { useEffect, useRef, useState } from "react";

const wallpaper = "./assets/img/field.jpg";
const basketball = "./assets/img/basketball.png";
const football = "./assets/img/football.png";
const volleyball = "./assets/img/volleyball.png";
const student = "./assets/img/human.png";


export default function Page() {
  const Animation = ({
  fieldWidth,
  fieldHeight,
  ballRadius,
  velocity,
}) => {


  // state
  const [ballType, setBallType] = useState("none");
  const [runing, setRuning] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [moveLeft, setMoveLeft] = useState(true);
  const [moveDown, setMoveDown] = useState(true);
  
  //default
  const _fieldWidth = fieldWidth || 640;
  const _fieldHeight = fieldHeight || 480;
  const _ballRadius = ballRadius || 50;
  const _velocity = velocity || 100;

  // internal calculation
  const xVelocity = Math.round(_velocity * Math.sqrt(2));
  const yVelocity = Math.round(_velocity * Math.sqrt(2));

  const frameRate = 25;
  const frameTime = 1 / frameRate;
  const _ballDiameter = 2 * _ballRadius;
  const maxX = _fieldWidth - _ballDiameter - 5;
  const maxY = _fieldHeight - _ballDiameter - 5;



  // refer
  const ballRef = useRef();
  const timer = useRef(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const moveLeftRef = useRef(true);
  const moveDownRef = useRef(true);
  const rotationRef = useRef(0);
  const rotationDirectionRef = useRef(1);

  // Sync refs with state
  useEffect(() => {
    xRef.current = x;
    yRef.current = y;
    moveLeftRef.current = moveLeft;
    moveDownRef.current = moveDown;
  }, [x, y, moveLeft, moveDown]);

  // keyboard event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        e.preventDefault();
        setRuning(prev => !prev);
      } else if (e.key === "0") {
        setBallType("none");
      } else if (e.key === "1") {
        setBallType("basketball");
      } else if (e.key === "2") {
        setBallType("football");
      } else if (e.key === "3") {
        setBallType("volleyball");
      } else if (e.key === "4") {
        setBallType("std");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (runing) {
      if (timer.current === null) {
        timer.current = setTimeout(() => {
          calculateNextFrame();
        }, frameTime * 1000);
      }
    } else {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, [runing]);


  //effect (monitor)
  useEffect(() => {
    // console.log(ballType)
    if (ballType === "none") ballRef.current.style.backgroundImage = ` none `;
    else if (ballType === "basketball")
      ballRef.current.style.backgroundImage = `url(${basketball})`;
    else if (ballType === "football")
      ballRef.current.style.backgroundImage = `url(${football})`;
    else if (ballType === "volleyball")
      ballRef.current.style.backgroundImage = `url(${volleyball})`;
    else if (ballType === "std")
      ballRef.current.style.backgroundImage = `url(${student})`;
  }, [ballType]);


  //movement calculation
  const calculateNextFrame = () => {
    // Use current values from refs to avoid closure issues
    let currentX = xRef.current;
    let currentY = yRef.current;
    let currentMoveLeft = moveLeftRef.current;
    let currentMoveDown = moveDownRef.current;

    // x axis
    if (currentMoveLeft) {
      currentX = currentX + xVelocity / frameRate;
      if (currentX >= maxX) {
        currentX = maxX - (currentX - maxX);
        currentMoveLeft = false;
        rotationDirectionRef.current = -1;
        setMoveLeft(false);
      }
    } else {
      currentX = currentX - xVelocity / frameRate;
      if (currentX <= 0) {
        currentX = -currentX;
        currentMoveLeft = true;
        rotationDirectionRef.current = 1;
        setMoveLeft(true);
      }
    }

    // y axis
    if (currentMoveDown) {
      currentY = currentY + yVelocity / frameRate;
      if (currentY >= maxY) {
        currentY = maxY - (currentY - maxY);
        currentMoveDown = false;
        setMoveDown(false);
      }
    } else {
      currentY = currentY - yVelocity / frameRate;
      if (currentY <= 0) {
        currentY = -currentY;
        currentMoveDown = true;
        setMoveDown(true);
      }
    }

    // Update state
    setX(currentX);
    setY(currentY);
    rotationRef.current += rotationDirectionRef.current *  5;
    setRotation(rotationRef.current);

    // Continue animation loop
    if (runing) {
      timer.current = setTimeout(() => {
        calculateNextFrame();
      }, frameTime * 1000);
    }
  };

return (
    <>
       {/* animation container */}
      <div className="mx-auto mt-3" style={{ width: "fit-content" }}>
        {/* field */}
        <div
          className="border-2 border-gray-800 rounded-3xl relative"
          style={{
            width: `${_fieldWidth}px`,
            height: `${_fieldHeight}px`,
            backgroundImage: `url(${wallpaper})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* ball */}
          <div
            className="border border-gray-800 rounded-full absolute"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${_ballDiameter}px`,
              height: `${_ballDiameter}px`,
              backgroundColor: "lightblue",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `rotate(${rotation}deg)`,
            }}
            ref={ballRef}
          ></div>
        </div>

        {/* button low */}
        <div className="flex justify-between mt-2 gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${runing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"} text-white`}
            onClick={() => setRuning(!runing)}
          >
            {runing ? (
              <span>⏸ Pause</span>
            ) : (
              <span>▶ Play</span>
            )}
          </button>

          {/* ball type  */}

          <div className="flex gap-2 justify-end">
            <button
              className="px-4 py-2 border-2 border-gray-400 rounded-lg hover:bg-gray-100 text-lg"
              onClick={() => setBallType("none")}
            >
              None
            </button>
            <button
              className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 text-lg"
              onClick={() => setBallType("basketball")}
            >
              Basketball{" "}
            </button>
            <button
              className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 text-lg"
              onClick={() => setBallType("football")}
            >
              Football
            </button>
            <button
              className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 text-lg"
              onClick={() => setBallType("volleyball")}
            >
              Volleyball
            </button>
            <button
              className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 text-lg"
              onClick={() => setBallType("std")}
            >
              Student
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

  return <Animation />;
}
