import pkg from "../../package.json";

export default function Footer() {
  return (
    <footer className="border-t border-border py-5 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-muted font-mono">
        <span>
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://chainsafe.io"
            className="hover:text-text-secondary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            ChainSafe Systems
          </a>
        </span>
        <a
          href="https://www.npmjs.com/package/@chainsafe/enr"
          className="hover:text-text-secondary transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          @chainsafe/enr {pkg.dependencies["@chainsafe/enr"]}
        </a>
      </div>
    </footer>
  );
}
