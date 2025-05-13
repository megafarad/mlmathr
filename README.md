# MLMathr 🧠📐

An interactive, gamified web app to help self-learners brush up on the essential math behind machine learning.

Built with React, TypeScript, Vite, and Tailwind CSS.

---

## 🚀 Features

- 🧮 **Lessons** on vectors, dot product, and gradients
- 🖱️ **Interactive visualizations** (drag, snap, scale)
- 🧠 **Quizzes** with scoring, retry logic, and XP rewards
- 🔓 **Lesson unlock system** based on quiz completion
- 🌟 **Persistent XP tracking** and score storage (localStorage)
- 📊 **Progress dashboard** showing XP, quiz results, and completion bar
- ▶️ **Resume last lesson** feature for smooth continuation

---

## 🧰 Tech Stack

- React + TypeScript
- Vite (build system)
- Tailwind CSS (styling)
- LocalStorage (persistence)
- SVG (vector graphics + interactivity)

---

## 🛠️ Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/your-username/mlmathr.git
cd mlmathr
````

2. **Install dependencies**

```bash
npm install
```

3. **🔐 Setup Environment**

Create a `.env` file with:

```

VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

```

You can find these in your [Supabase project settings](https://app.supabase.com).


4. **Run the dev server**

```bash
npm run dev
```

5 Open [http://localhost:5173](http://localhost:5173)

---

## 📦 Project Structure

```

src/
├── App.tsx               # Main app entry and routes
├── main.tsx              # React + Vite bootstrap
├── index.css             # Global styles
├── App.css               # App-specific styles
├── assets/               # Static assets (e.g. logos)
├── components/
│   ├── Quiz.tsx          # Reusable quiz engine
│   ├── context/          # XP context + unlock logic
│   ├── lessons/          # Interactive visualizers and lessons
│   ├── pages/            # Page-level components (dashboard, etc.)
│   └── quizzes/          # Individual quiz route components
└── vite-env.d.ts         # Vite/TypeScript globals

```

---

## 📌 Roadmap

* [x] 3 core lessons
* [x] Interactive SVG-based learning
* [x] Quiz + XP engine
* [x] Progress dashboard
* [ ] Matrix Multiplication lesson
* [ ] User accounts + cloud sync
* [ ] Leaderboards or achievements

---

## 🧑‍💻 Author

Made with love by Chris Carrington
Inspired by self-learners prepping for ML/AI

---

## 📖 License

MIT

