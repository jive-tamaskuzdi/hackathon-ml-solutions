import { html } from "./index.js";
import { useEffect } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

export function Charts({ data }) {
  useEffect(() => {
    console.log("CHART DATA", data);
  }, []);

  return html`<p>charts</p>`;
}
