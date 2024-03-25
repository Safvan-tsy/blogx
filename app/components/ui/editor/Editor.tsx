"use client";
import React, { useEffect, useState } from "react";

const Editor = () => {
  const [data, setData] = useState<string[]>([]);
  const colors = ["#ffcccc", "#ccffcc", "#ccccff", "#ffffcc", "#ffccff"];


  return (
    <div className="max-w-6xl mx-auto px-5">
      {data.map((item: any, idx: number) => (
        <div key={idx} style={{ color: colors[idx % colors.length] }}>
          <div
            className="px-4 py-3 font-bold text-slate-950"
            style={{ backgroundColor: colors[idx % colors.length] }}
          >
            Note - {idx + 1}
          </div>
          <div
            className="ProseMirror whitespace-pre-line border border-slate-700 px-6 py-4 rounded-lg"
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      ))}
    </div>
  );
};

export default Editor;
