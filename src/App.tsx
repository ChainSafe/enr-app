import {Toaster} from "sonner";
import ENRViewer from "./components/ENRViewer";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "var(--color-surface-raised)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
          },
        }}
      />
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ENRViewer />
      </main>
      <Footer />
    </div>
  );
}
