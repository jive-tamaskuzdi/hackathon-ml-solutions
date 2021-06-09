import { h, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm?module";
import {
  useEffect,
  useState,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import { Charts } from "./charts.js";
import { Chart } from "https://www.unpkg.com/chart.js@3.3.2/dist/chart.esm.js";

export const html = htm.bind(h);

const root = document.querySelector("#app");

const App = () => {
  const [meetingId, setMeetingId] = useState("");
  const [data, setData] = useState();
  useEffect(() => {
    console.log("from effect", meetingId);
  }, [meetingId]);

  function onSubmit(event) {
    event.preventDefault();

    fetch(`/meeting/${meetingId}`).then(resp => resp.json()).then((data) => {setData(data)});

  }

  return html`
    <h1>App</h1>
    <form onSubmit=${(event) => onSubmit(event)}>
      <label for="meeting-id">Meeting ID:</label>
      <input
        value=${meetingId}
        onChange=${(event) => setMeetingId(event.target.value)}
        id="meeting-id"
        type="text"
      />
    </form>
    ${data ? `<${Charts} data=${data} />` : null}
  `;
};

render(html`<${App} />`, root);
