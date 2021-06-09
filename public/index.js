import { h, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm?module";
import {
  useEffect,
  useState,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import { Charts } from "./charts.js";
import { Timeline } from "./timeline.js";

export const html = htm.bind(h);

const root = document.querySelector("#app");

const App = () => {
  const [meetingId, setMeetingId] = useState("");
  const [meetingData, setMeetingData] = useState();
  
  useEffect(() => {
    console.log("from effect", meetingId);
  }, [meetingId]);

  async function onSubmit(event) {
    event.preventDefault();

    let data;
    try {
      const response = await fetch(`/meeting/${meetingId}`);
      data = await response.json();
    } catch (error) {
      data = [
        {
          participantId: "Tamas Kuzdi",
          changes: [
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 11:59:38 GMT" },
            {
              emotion: "surprised",
              timestamp: "Wed, 09 Jun 2021 11:59:44 GMT",
            },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 11:59:46 GMT" },
            {
              emotion: "surprised",
              timestamp: "Wed, 09 Jun 2021 11:59:48 GMT",
            },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 11:59:50 GMT" },
            {
              emotion: "surprised",
              timestamp: "Wed, 09 Jun 2021 11:59:58 GMT",
            },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 12:00:00 GMT" },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 12:00:02 GMT" },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 12:00:08 GMT" },
          ],
        },
        {
          participantId: "Simon Abris",
          changes: [
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 11:59:34 GMT" },
            {
              emotion: "surprised",
              timestamp: "Wed, 09 Jun 2021 11:59:39 GMT",
            },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 11:59:43 GMT" },
            {
              emotion: "surprised",
              timestamp: "Wed, 09 Jun 2021 11:59:48 GMT",
            },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 11:59:50 GMT" },
            {
              emotion: "surprised",
              timestamp: "Wed, 09 Jun 2021 11:59:58 GMT",
            },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 12:00:00 GMT" },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 12:00:05 GMT" },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 12:00:13 GMT" },
          ],
        },
      ];
    }

    setMeetingData(data);
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
    ${meetingData ? html`<${Timeline} data=${meetingData} />` : null}
    ${meetingData ? html`<${Charts} data=${meetingData} />` : null}
  `;
};

render(html`<${App} />`, root);
