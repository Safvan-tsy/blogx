'use client';
import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Toolbar from './Toolbar';

const Tiptap: React.FC<{
  onChange: (newContent: string) => void;
  content: string;
}> = ({ onChange, content }) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          'flex flex-col border border-gray-700 focus-visible:outline-none p-2.5 lg:p-5 min-h-[20rem]',
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });
  useEffect(() => {
    if (!editor) return;
    const value = content;
    if (value) {
      editor.commands.setContent(value);
    }
  }, [editor, content]);

  return (
    <div className="editor ">
      <Toolbar editor={editor} />
      <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
    </div>
  );
};

export default Tiptap;
