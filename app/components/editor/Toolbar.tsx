'use client';

import React from 'react';
import { type Editor } from '@tiptap/react';
import {
  FaBold,
  FaCode,
  FaItalic,
  FaList,
  FaListOl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from 'react-icons/fa';
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from 'react-icons/lu';

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="flex w-full flex-wrap items-start justify-between gap-3 rounded-tl-md
    rounded-tr-md border border-gray-700 px-4 py-3"
    >
      <div className="flex w-full flex-wrap items-center justify-start gap-3 lg:w-10/12 lg:gap-5 ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive('bold') ? 'rounded-lg bg-sky-700 p-1 text-white' : 'text-sky-400'
          }
        >
          <FaBold className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive('italic') ? 'rounded-lg bg-sky-700 p-1 text-white' : 'text-sky-400'
          }
        >
          <FaItalic className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive('underline') ? 'rounded-lg bg-sky-700 p-1 text-white' : 'text-sky-400'
          }
        >
          <FaUnderline className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive('strike') ? 'rounded-lg bg-sky-700 p-1 text-white' : 'text-sky-400'
          }
        >
          <FaStrikethrough className="h-5 w-5" />
        </button>
        <div className="flex cursor-pointer flex-row flex-wrap gap-2 rounded-lg border p-1 shadow-lg">
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            className={
              editor.isActive('heading', { level: 1 })
                ? 'rounded-lg bg-sky-700 p-1 text-white'
                : 'text-sky-400'
            }
          >
            <LuHeading1 className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={
              editor.isActive('heading', { level: 2 })
                ? 'rounded-lg bg-sky-700 p-1 text-white'
                : 'text-sky-400'
            }
          >
            <LuHeading2 className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            className={
              editor.isActive('heading', { level: 3 })
                ? 'rounded-lg bg-sky-700 p-1 text-white'
                : 'text-sky-400'
            }
          >
            <LuHeading3 className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 4 }).run();
            }}
            className={
              editor.isActive('heading', { level: 4 })
                ? 'rounded-lg bg-sky-700 p-1 text-white'
                : 'text-sky-400'
            }
          >
            <LuHeading4 className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive('bulletList') ? 'rounded-lg bg-sky-700 p-1 text-white' : 'text-sky-400'
          }
        >
          <FaList className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive('orderedList') ? 'rounded-lg bg-sky-700 p-1 text-white' : 'text-sky-400'
          }
        >
          <FaListOl className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive('blockquote') ? 'rounded-lg bg-sky-700 p-1 text-white' : 'text-sky-400'
          }
        >
          <FaQuoteLeft className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run();
          }}
          className={
            editor.isActive('codeBlock') ? 'rounded-lg bg-sky-700 p-1 text-white' : 'text-sky-400'
          }
        >
          <FaCode className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive('undo')
              ? 'rounded-lg bg-sky-700 p-1 text-white'
              : 'p-1 text-sky-400 hover:rounded-lg hover:bg-sky-700 hover:text-white'
          }
        >
          <FaUndo className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive('redo')
              ? 'rounded-lg bg-sky-700 p-1 text-white'
              : 'p-1 text-sky-400 hover:rounded-lg hover:bg-sky-700 hover:text-white'
          }
        >
          <FaRedo className="h-5 w-5" />
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
