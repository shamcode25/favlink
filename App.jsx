import { useState, useEffect } from "react";
import LinkContainer from "./components/LinkContainer";

export default function App() {
  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem("favelinks");
    return saved
      ? JSON.parse(saved)
      : [
          { id: crypto.randomUUID(), name: "MDN Web Docs", url: "https://developer.mozilla.org" },
          { id: crypto.randomUUID(), name: "React", url: "https://react.dev" },
        ];
  });

  useEffect(() => {
    localStorage.setItem("favelinks", JSON.stringify(links));
  }, [links]);

  const addLink = (link) => setLinks((prev) => [{ id: crypto.randomUUID(), ...link }, ...prev]);
  const deleteLink = (id) => setLinks((prev) => prev.filter((l) => l.id !== id));

  return (
    <main style={styles.app}>
      <div style={styles.card}>
        <h1 style={{ margin: 0 }}>My Favorite Links</h1>
        <p style={{ marginTop: 8, color: "#555" }}>
          Add a name and URL, submit, click to visit, or delete to remove.
        </p>
        <LinkContainer links={links} onAdd={addLink} onDelete={deleteLink} />
      </div>
      <footer style={{ marginTop: 24, color: "#777", fontSize: 12 }}>
        Built with React state & props.
      </footer>
    </main>
  );
}

const styles = {
  app: {
    minHeight: "100svh",
    display: "grid",
    placeItems: "center",
    background: "#f6f7fb",
    padding: 24,
  },
  card: {
    width: "min(900px, 95vw)",
    background: "white",
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,.07)",
    padding: 24,
  },
};
