"use client";

import { useState } from "react";

type TopicStatus = "done" | "learning" | "soon";

type Topic = {
  title: string;
  description: string;
  status: TopicStatus;
};

const topics: Topic[] = [
  {
    title: "UX/UI Fundamentals",
    description:
      "Design web interfaces that are easy to use, guided by UX research.",
    status: "done",
  },
  {
    title: "HTML, CSS and JavaScript",
    description:
      "Build web pages from the ground up: structure them with HTML, style them with CSS, and add interactivity with JavaScript and DOM manipulation.",
    status: "done",
  },
  {
    title: "React Web Applications",
    description:
      "Learn the core ideas of React: Virtual DOM, components, props, state, and hooks. Practice is still ongoing.",
    status: "learning",
  },
  {
    title: "Back-End Interface Preparation",
    description:
      "Connecting the front end to a back end. This topic has not been covered yet.",
    status: "soon",
  },
];

// สถานะใช้โทนชมพู-ดำทั้งหมด: เสร็จ = ชมพูทึบ, กำลังเรียน = ขอบชมพูกะพริบ, เร็วๆ นี้ = เทาเส้นประ
const statusStyle: Record<TopicStatus, { label: string; dot: string; chip: string }> = {
  done: {
    label: "Completed",
    dot: "bg-pink-500 border-pink-500",
    chip: "bg-pink-500 text-black border-pink-500",
  },
  learning: {
    label: "In progress",
    dot: "bg-black border-pink-500 animate-pulse",
    chip: "bg-black text-pink-400 border-pink-500",
  },
  soon: {
    label: "Coming soon",
    dot: "bg-zinc-800 border-zinc-600",
    chip: "bg-transparent text-zinc-500 border-dashed border-zinc-600",
  },
};

const affiliations = [
  "Computer Science and Software Development",
  "Innovation Dept. (CSI)",
  "School of Information Technology (SIT)",
  "Sripatum University (SPU)",
];

export default function Home() {
  const [imgError, setImgError] = useState(false);

  return (
    // พื้นหลังดำ มีลายจุดชมพูจางๆ
    <div className="min-h-screen px-4 py-10 md:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[360px_1fr] md:items-start">

        {/* Left - Instructor: กล่องมุมคม ขอบ 2px เงาชมพูแข็ง */}
        <aside className="border-2 border-pink-500 bg-black shadow-[8px_8px_0_0_#ec4899] md:sticky md:top-8">

          {/* Banner: ลายทางเฉียงชมพู-ดำ */}
          <div className="h-24 border-b-2 border-pink-500 bg-[repeating-linear-gradient(45deg,#ec4899_0_12px,#000_12px_24px)]" />

          <div className="-mt-14 flex flex-col items-center px-6 pb-8">
            {imgError ? (
              <div className="flex h-28 w-28 rotate-3 items-center justify-center border-4 border-pink-500 bg-zinc-900 font-mono text-xl font-black text-pink-400 shadow-[5px_5px_0_0_#fbcfe8]">
                Fahxaii
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/assets/img/human.png"
                alt="Instructor"
                onError={() => setImgError(true)}
                className="h-28 w-28 rotate-3 border-4 border-pink-500 bg-zinc-900 object-cover shadow-[5px_5px_0_0_#fbcfe8]"
              />
            )}

            <h2 className="mt-6 text-center text-2xl font-black uppercase tracking-wide text-white">
              นายธนัท แสงสว่าง
            </h2>
            <p className="mt-1 bg-pink-500 px-2 font-mono text-sm font-bold text-black">
            </p>

            <ul className="mt-7 w-full space-y-2">
              {affiliations.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-l-4 border-pink-500 bg-zinc-900 px-3 py-2.5 text-sm text-pink-100"
                >
                  <span className="font-mono text-xs text-pink-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right - Course */}
        <main className="border-2 border-pink-500 bg-black p-6 shadow-[8px_8px_0_0_#ec4899] md:p-10">
          <h1 className="text-3xl font-black leading-tight text-white md:text-4xl">
            <span className="mb-2 inline-block bg-pink-500 px-2 font-mono text-black">
              CSI205
            </span>
            <br />
            Front-End <span className="text-pink-400">Software</span> Development
          </h1>
          {/* เส้นประชมพูแทนแถบโค้ง */}
          <div className="mt-5 h-1.5 w-28 bg-[repeating-linear-gradient(90deg,#ec4899_0_10px,transparent_10px_15px)]" />

          <ol className="relative mt-10 space-y-5">
            {/* Vertical line: เส้นประ */}
            <div
              aria-hidden
              className="absolute bottom-4 left-[7px] top-4 border-l-2 border-dashed border-pink-500/40"
            />
            {topics.map((topic, i) => {
              const s = statusStyle[topic.status];
              return (
                <li key={topic.title} className="relative pl-10">
                  {/* Dot: ข้าวหลามตัดแทนวงกลม */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-5 h-4 w-4 rotate-45 border-2 ${s.dot}`}
                  />

                  {/* แต่ละหัวข้อเป็นการ์ดมุมคม hover แล้วขอบชมพู + เงาแข็ง */}
                  <div className="border border-zinc-800 bg-zinc-900/70 p-4 transition-all duration-100 hover:-translate-y-0.5 hover:border-pink-500 hover:shadow-[4px_4px_0_0_#ec4899]">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-mono text-sm text-pink-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {topic.title}
                      </h3>
                      <span
                        className={`border px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-widest ${s.chip}`}
                      >
                        {s.label}
                      </span>
                    </div>

                    <p
                      className={`mt-2 leading-relaxed ${
                        topic.status === "soon"
                          ? "italic text-zinc-600"
                          : "text-zinc-400"
                      }`}
                    >
                      {topic.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </main>
      </div>
    </div>
  );
}