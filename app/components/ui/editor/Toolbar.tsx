"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  FaBold,
  FaCode,
  FaHeading,
  FaItalic,
  FaList,
  FaListOl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-3 w-full flex-wrap border border-gray-700"
    >
      <div className="flex justify-start items-center gap-3 lg:gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400"
          }
        >
          <FaBold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400"
          }
        >
          <FaItalic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400"
          }
        >
          <FaUnderline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400"
          }
        >
          <FaStrikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400"
          }
        >
          <FaHeading className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400"
          }
        >
          <FaList className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400"
          }
        >
          <FaListOl className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400"
          }
        >
          <FaQuoteLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400"
          }
        >
          <FaCode className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <FaUndo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <FaRedo className="w-5 h-5" />
        </button>
      </div>
      {/* {content && (
        <button
          type="submit"
          className="px-4 bg-sky-700 text-white py-2 rounded-md"
        >
          Add
        </button>
      )} */}
    </div>
  );
};

export default Toolbar;
