"use client";

import { useEffect, useState } from "react";

// Opening hours in Sri Lanka time, as [open, close] in minutes after midnight.
const WEEKDAY: [number, number] = [7 * 60, 22 * 60];
const WEEKEND: [number, number] = [8 * 60, 23 * 60];

function colomboNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Colombo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    weekend: ["Sat", "Sun"].includes(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
    clock: `${get("hour")}:${get("minute")}`,
  };
}

function fmt(m: number) {
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

export default function OpenStatus() {
  const [status, setStatus] = useState<{ open: boolean; text: string; clock: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const now = colomboNow();
      const [open, close] = now.weekend ? WEEKEND : WEEKDAY;
      const isOpen = now.minutes >= open && now.minutes < close;
      setStatus({
        open: isOpen,
        text: isOpen
          ? `Open now · closes ${fmt(close)}`
          : `Closed · opens ${now.minutes < open ? fmt(open) : "tomorrow"}`,
        clock: `${now.clock} in Kandy`,
      });
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="inline-flex min-h-8 items-center gap-2.5 rounded-full border border-line bg-ink/40 px-4 py-1.5 font-caps text-[0.68rem] tracking-[0.18em] text-ivory/85 uppercase">
      <span className="relative flex h-2 w-2">
        {status?.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${status ? (status.open ? "bg-emerald-400" : "bg-wax") : "bg-muted"}`} />
      </span>
      {status?.text ?? "Checking the court's hours…"}
      {status && <span className="hidden text-muted sm:inline">· {status.clock}</span>}
    </p>
  );
}
