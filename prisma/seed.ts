import { db } from '../lib/db';
// import { hash } from 'bcrypt';

async function main() {
  //     const hashedPassword = await hash('12345678', 10);
  //   await db.user.upsert({
  //     where: {
  //       id: 1,
  //       username:"test",
  //       email: 'testuser@gmail.com',
  //     },
  //     create: {
  //       id: 2,
  //       username:"test",
  //       email: 'testuser@gmail.com',
  //       password:hashedPassword //12345678
  //     },
  //     update: {},
  //   });

  const doBlogsExists = !!(await db.post.findMany()).length;
  if (doBlogsExists) {
    console.error('DB is already seeded!');
    process.exit(0);
  }

  await db.post.createMany({
    data: [
      {
        id: 1,
        title: 'What’s Tiptap?',
        content:
          '<p>Tiptap is a headless wrapper around <u>ProseMirror</u> – a toolkit for building rich text WYSIWYG editors, which is already in use at many well-known companies such as <em>New York Times</em>, <em>The Guardian</em> or <em>Atlassian</em>.</p><p>Create exactly the rich text editor you want out of customizable building blocks. Tiptap comes with sensible defaults, a lot of extensions and a friendly API to customize every aspect. It’s backed by a welcoming community, open source, and free.</p><p></p><h3>#What does “headless” mean?</h3><p></p><p>There is no provided user interface, you are absolutely free to build whatever interface you want. No need to overwrite any class, to use .</p><p></p><blockquote><p><code>!important</code> or other hacks, just write whatever you like in the setup you are used to.</p></blockquote><p></p><h3>#Why should I use Tiptap?</h3><p></p><p><u>ProseMirror</u> is a well-written, reliable and very powerful editor toolkit. It’s not so much the ready-to-use editor most people look for, but with Tiptap you can start in minutes, choose from tons of amazing extensions and still have that powerful ProseMirror API accessible when you really need it.</p><p></p><h3>#Do you enjoy real-time editing?</h3><p>Great! We do so, too. <u>Hocuspocus</u> is our yjs-based real-time solution for conflict-free text editing with Tiptap.</p><p>Even better: Our managed solution <u>Tiptap Collab</u> is just a few clicks away.<br>– Enhance your Tiptap experience with multiplayer support in minutes instead of hours.</p><p></p>',
        status: 'published',
        image:
          'https://media.licdn.com/dms/image/C4E12AQH7C4CgOZ81hg/article-cover_image-shrink_720_1280/0/1520134478949?e=2147483647&v=beta&t=CQSCD2U5X2Gvk87PyDWMKEOPmt3GHyaPY6P49_kF8QA',
      },
      {
        id: 2,
        title: 'Shared UI Setup For Micro Frontend Application with Nx',
        content:
          '<p>This tutorial will guide you through setting up a shared <code>UI library</code> for a <code>Micro Frontend Application</code> using Nx Workspace, React, and Tailwind CSS. We will use <code>Shadcn UI for the UI components.</code></p><h2>Link for Final Implementation</h2><p>The final implementation of the tutorial can be found in the following repository commits:</p><ul><li><p><u>Add UI package with Shadcn components and use them on apps</u></p></li><li><p><u>Add UI package with Button component and update dependencies</u></p></li></ul><blockquote><p>Live Demo: <u>Micro Frontend Application with Nx Workspace</u></p></blockquote><h2>Prerequisites</h2><p>Before we begin, make sure you have the following things set up:</p><ul><li><p><u>Base Repository</u> for creating Nx Workspace with ESLint, Prettier, and Husky Configuration.</p></li><li><p><u>Building a Micro Frontend Architecture with Nx Workspace</u> for creating a micro frontend architecture using Nx Workspace.</p></li><li><p><u>Shared Tailwind Setup For Micro Frontend Application with Nx Workspace</u></p></li><li><p><u>Nx Workspace</u>: Nx is a set of extensible dev tools for monorepos, which helps you develop like Google, Facebook, and Microsoft.</p></li><li><p><u>Nx Console</u>: Nx Console is a Visual Studio Code extension that provides a UI for the Nx CLI.</p></li><li><p><u>React</u>: A JavaScript library for building user interfaces.</p></li><li><p><u>Tailwind CSS</u>: A utility-first CSS framework for rapidly building custom designs.</p></li><li><p><u>ESLint</u>: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.</p></li><li><p><u>Prettier</u>: An opinionated code formatter that enforces a consistent code style.</p></li><li><p><u>Netlify</u>: A platform that provides continuous deployment, serverless functions, and more.</p></li><li><p><u>Shadcn UI</u>: Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.</p></li></ul><h2>Table of Contents</h2><ul><li><p><u>Create UI Library</u></p></li><li><p><u>Add Tailwind CSS Setup</u></p></li><li><p><u>Shadcn UI Setup</u></p><ul><li><p><u>Add Button Component</u></p></li><li><p><u>Add Shadcn UI Hover Card</u></p></li><li><p><u>Add Shadcn UI Badge</u></p></li></ul></li><li><p><u>Conclusion</u></p></li></ul><h2>Create UI Library</h2><p>First, we need to create a UI library using the Nx Workspace. We will use the <code>@nx/react:library</code> generator to create the UI library.</p><p></p><blockquote><p>With Script</p></blockquote><p></p><pre><code>pnpm exec nx generate @nx/react:library --name=ui --bundler=vite --directory=packages/ui --projectNameAndRootFormat=as-provided --no-interactive </code></pre><p></p><p></p><blockquote><p>With Nx Console</p></blockquote><p></p>',
        status: 'published',
        image: '',
      },
    ],
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
