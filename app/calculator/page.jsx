"use client";
import { useState, useEffect } from "react";
import { cn } from "@/utils/cn";

// ปุ่มทรงสี่เหลี่ยมมุมคม ขอบหนา เงาแข็งแบบ offset กดแล้วปุ่มยุบลงไปทับเงา
const btnBase =
  "h-[44px] w-full rounded-sm border-2 font-bold font-mono text-[1.1rem] cursor-pointer transition-all duration-75 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none";

const colors = {
  // ปุ่มเมมโมรี่ / operator: พื้นชมพูสด ตัวอักษรดำ เงาชมพูอ่อน
  green:
    "bg-pink-500 text-black border-black shadow-[3px_3px_0_0_#fbcfe8] enabled:hover:bg-pink-400",
  // ปุ่ม CE: พื้นดำ ขอบชมพู กด hover แล้วกลับสี
  red: "bg-black text-pink-500 border-pink-500 shadow-[3px_3px_0_0_#ec4899] enabled:hover:bg-pink-500 enabled:hover:text-black",
  // ปุ่มตัวเลข: เทาดำ ตัวอักษรชมพูอ่อน
  blue: "bg-zinc-900 text-pink-100 border-zinc-700 shadow-[3px_3px_0_0_#3f3f46] enabled:hover:border-pink-500",
};

const Button = ({ color, onClick, disabled, children }) => (
  <button className={cn(btnBase, colors[color])} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

const insertSeparator = (str, separator = " ", groupSize = 3) => {
  let resultString = " ";
  let counter = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    resultString = str[i] + resultString;
    if (i != 0 && counter++ % groupSize === groupSize - 1)
      resultString = separator + resultString;
  }
  return resultString;
};

export default function Calculator() {
  // State สำหรับเก็บค่าต่างๆ ของเครื่องคิดเลข
  const [state, setState] = useState("first"); // first/operator/second
  const [display, setDisplay] = useState("0"); // ตัวเลขที่แสดงบนหน้าจอ
  const [first, setFirst] = useState(0); // เลขตัวแรก
  const [second, setSecond] = useState(0); // เลขตัวที่สอง
  const [operator, setOperator] = useState("?"); // ตัวดำเนินการ (+, -)
  const [lastOperator, setLastOperator] = useState("?"); // operator ล่าสุดสำหรับกด = ซ้ำ
  const [lastSecond, setLastSecond] = useState(0); // เลขตัวที่สองล่าสุดสำหรับกด = ซ้ำ

  const debug = true;

  // รีเซ็ตค่าทั้งหมด
  const init = () => {
    setState("first");
    setDisplay("0");
    setFirst(0);
    setSecond(0);
    setOperator("?");
    setLastOperator("?");
    setLastSecond(0);
  };

  // กดปุ่มตัวเลข
  const numberClick = (num) => {
    console.log(num);
    switch (state) {
      case "first":
        if (display.length < 9) {
          if (display === "0") {
            setDisplay(String(num));
          } else {
            setDisplay(display + String(num));
          }
        }
        break;
      case "operator":
        setDisplay(String(num));
        setState("second");
        break;
      case "second":
        if (display.length < 9) {
          if (display === "0") {
            setDisplay(String(num));
          } else {
            setDisplay(display + String(num));
          }
        }
        break;
    }
  };

  // กดปุ่ม operator (+, -)
  const operatorClick = (op) => {
    console.log(op);
    switch (state) {
      case "first":
        setFirst(Number(display));
        setOperator(String(op));
        setState("operator");
        break;
      case "operator":
        setOperator(String(op));
        break;
      case "second":
        const newSecond = Number(display);
        let result;
        switch (operator) {
          case "+":
            result = first + newSecond;
            break;
          case "-":
            result = first - newSecond;
            break;
          default:
            result = 0;
        }
        setDisplay(String(result));
        setFirst(result);
        setSecond(0);
        setOperator(String(op));
        setState("operator");
        break;
    }
  };

  // กดปุ่มเท่ากับ (=)
  const equalClick = () => {
    console.log("=");
    switch (state) {
      case "first":
        if (lastOperator !== "?") {
          const newSecond = lastSecond;
          let result;
          switch (lastOperator) {
            case "+":
              result = first + newSecond;
              break;
            case "-":
              result = first - newSecond;
              break;
            default:
              result = first;
          }
          setDisplay(String(result));
          setFirst(result);
        }
        break;
      case "operator":
        break;
      case "second":
        const newSecond = Number(display);
        let result;
        switch (operator) {
          case "+":
            result = first + newSecond;
            break;
          case "-":
            result = first - newSecond;
            break;
          default:
            result = 0;
        }
        setDisplay(String(result));
        setState("first");
        setFirst(result);
        setLastOperator(operator);
        setLastSecond(newSecond);
        setSecond(0);
        setOperator("?");
        break;
    }
  };

  // กดปุ่ม CE (Clear)
  const ceClick = () => {
    init();
  };

  // รองรับ keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") ceClick();
      else if (e.key === "Enter") equalClick();
      else if (e.key >= "0" && e.key <= "9") numberClick(Number(e.key));
      else if (e.key === "-") operatorClick("-");
      else if (e.key === "+") operatorClick("+");
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [state, display, first, second, operator, lastOperator, lastSecond]);

  return (
    <div className="flex justify-center mt-10">
      <div className="w-[310px]">
        {/* ตัวเครื่อง: สี่เหลี่ยมมุมคม ขอบบาง 2px เงาชมพูแข็งเยื้องมุมขวาล่าง */}
        <div className="rounded-md border-2 border-pink-500 bg-black p-4 shadow-[8px_8px_0_0_#ec4899]">
          {/* แถบหัวเครื่อง */}
          <div className="mb-2 flex items-center justify-between font-mono text-[0.65rem] tracking-[0.3em] text-pink-500">
            <span>PINK·CALC</span>
            <span className="flex gap-1">
              <i className="h-2 w-2 bg-pink-500" />
              <i className="h-2 w-2 bg-pink-300" />
              <i className="h-2 w-2 border border-pink-500" />
            </span>
          </div>

          {/* หน้าจอ: สูงขึ้น มุมคม แถบชมพูหนาด้านซ้าย มีตัวบอก operator */}
          <div
            id="screen"
            className="flex h-16 items-center justify-between overflow-hidden rounded-sm border-l-[6px] border-pink-500 bg-zinc-900 px-3"
          >
            <span className="self-start pt-1 font-mono text-sm text-pink-500">
              {operator !== "?" ? operator : ""}
            </span>
            <span className="font-mono text-[2rem] text-pink-200">
              {insertSeparator(display)}
            </span>
          </div>

          {/* ปุ่มทั้งหมดจัดเป็นตาราง 5 คอลัมน์ */}
          <div className="mt-5 grid grid-cols-5 gap-2">
            <Button color="green" disabled>MC</Button>
            <Button color="green" disabled>MR</Button>
            <Button color="green" disabled>M+</Button>
            <Button color="green" disabled>M-</Button>
            <Button color="red" onClick={ceClick}>CE</Button>

            <Button color="blue" onClick={() => numberClick(7)}>7</Button>
            <Button color="blue" onClick={() => numberClick(8)}>8</Button>
            <Button color="blue" onClick={() => numberClick(9)}>9</Button>
            <Button color="green" disabled>÷</Button>
            <Button color="green" disabled>√</Button>

            <Button color="blue" onClick={() => numberClick(4)}>4</Button>
            <Button color="blue" onClick={() => numberClick(5)}>5</Button>
            <Button color="blue" onClick={() => numberClick(6)}>6</Button>
            <Button color="green" disabled>×</Button>
            <Button color="green" disabled>%</Button>

            <Button color="blue" onClick={() => numberClick(1)}>1</Button>
            <Button color="blue" onClick={() => numberClick(2)}>2</Button>
            <Button color="blue" onClick={() => numberClick(3)}>3</Button>
            <Button color="green" onClick={() => operatorClick("-")}>–</Button>
            <Button color="green" disabled>1/x</Button>

            <Button color="blue" onClick={() => numberClick(0)}>0</Button>
            <Button color="blue" disabled>.</Button>
            <Button color="blue" disabled>±</Button>
            <Button color="green" onClick={() => operatorClick("+")}>+</Button>
            <Button color="green" onClick={equalClick}>=</Button>
          </div>

          {/* ชื่อ: คั่นด้วยเส้นประ */}
          <div className="mt-4 border-t border-dashed border-pink-500/60 pt-2 text-center font-mono text-[0.75rem] text-pink-400">
68095945 นายธนัท แสงสว่าง
          </div>
        </div>
      </div>
    </div>
  );
}