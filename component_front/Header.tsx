// ตัวอักษรเป็นบล็อกสี่เหลี่ยมจัตุรัสมุมคม สลับสูง-ต่ำเป็นคลื่น แทนการเอียง
const letters = [
  { char: "C", color: "bg-pink-500 text-black border-black", offset: "-translate-y-2" },
  { char: "S", color: "bg-black text-pink-400 border-pink-500", offset: "translate-y-1" },
  { char: "I", color: "bg-pink-500 text-black border-black", offset: "-translate-y-2" },
  { char: "2", color: "bg-black text-pink-400 border-pink-500", offset: "translate-y-1" },
  { char: "0", color: "bg-pink-500 text-black border-black", offset: "-translate-y-2" },
  { char: "5", color: "bg-black text-pink-400 border-pink-500", offset: "translate-y-1" },
];

export default function Header() {
  return (
    <div className="mt-8 text-center">
      <div className="flex justify-center gap-2">
        {letters.map((item, i) => (
          <span
            key={i}
            className={`flex h-12 w-12 items-center justify-center rounded-none border-[3px] font-mono text-2xl font-black shadow-[4px_4px_0_0_#ec4899] transition-all duration-100 hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_#ec4899] ${item.color} ${item.offset}`}
          >
            {item.char}
          </span>
        ))}
      </div>

      {/* ป้าย: สี่เหลี่ยมมุมคม ขอบ 2px เงาแข็ง แทนแคปซูลกลม */}
      <span className="mt-6 inline-block border-2 border-pink-500 bg-black px-5 py-1.5 font-mono text-xs tracking-[0.35em] text-pink-400 shadow-[4px_4px_0_0_#ec4899]">
        FRONT END SOFTWARE DEVELOPMENT
      </span>
    </div>
  );
}