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
          participantId: "Franklin",
          changes: [
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:54:35 GMT" },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 14:54:36 GMT" },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:54:43 GMT" },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 14:54:51 GMT" },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:54:55 GMT" },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 14:55:01 GMT" },
            { emotion: "angry", timestamp: "Wed, 09 Jun 2021 14:55:10 GMT" },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 14:55:14 GMT" },
            { emotion: "angry", timestamp: "Wed, 09 Jun 2021 14:55:19 GMT" },
            {
              emotion: "surprised",
              timestamp: "Wed, 09 Jun 2021 14:55:22 GMT",
            },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 15:01:00 GMT" },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 15:01:39 GMT" },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 15:01:41 GMT" },
            { emotion: "angry", timestamp: "Wed, 09 Jun 2021 15:01:51 GMT" },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 15:01:53 GMT" },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 15:02:11 GMT" },
          ],
        },
        {
          participantId: "Peter Botos",
          changes: [
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:54:59 GMT" },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 14:55:03 GMT" },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:55:05 GMT" },
            {
              emotion: "surprised",
              timestamp: "Wed, 09 Jun 2021 14:55:07 GMT",
            },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:55:09 GMT" },
            {
              emotion: "surprised",
              timestamp: "Wed, 09 Jun 2021 14:55:15 GMT",
            },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 14:55:17 GMT" },
            { emotion: "angry", timestamp: "Wed, 09 Jun 2021 14:55:19 GMT" },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:55:29 GMT" },
            {
              emotion: "surprised",
              timestamp: "Wed, 09 Jun 2021 14:55:33 GMT",
            },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:55:35 GMT" },
            {
              emotion: "surprised",
              timestamp: "Wed, 09 Jun 2021 14:56:29 GMT",
            },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:56:35 GMT" },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 14:57:28 GMT" },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:57:30 GMT" },
            {
              emotion: "surprised",
              timestamp: "Wed, 09 Jun 2021 14:57:58 GMT",
            },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:58:06 GMT" },
          ],
        },
        {
          participantId: "Tamas Kuzdi",
          changes: [
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:55:23 GMT" },
          ],
        },
        {
          participantId: "Abris",
          changes: [
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:57:04 GMT" },
            { emotion: "happy", timestamp: "Wed, 09 Jun 2021 14:57:27 GMT" },
            { emotion: "neutral", timestamp: "Wed, 09 Jun 2021 14:57:29 GMT" },
          ],
        },
      ];
    }

    setMeetingData(data);
  }

  return html`
    <h1>GoToMeeting emotions</h1>
    <form onSubmit=${(event) => onSubmit(event)}>
      <label for="meeting-id">Meeting ID:</label>
      <input
        value=${meetingId}
        onChange=${(event) => setMeetingId(event.target.value)}
        id="meeting-id"
        type="text"
      />
    </form>
    <div>
      <div style="display: inline-block; width:50%;">
        ${meetingData ? html`<${Charts} data=${meetingData} />` : null}
      </div>
      <div style="display: inline-block; width:50%;">
        ${meetingData ? html`<${Timeline} data=${meetingData} />` : null}
      </div>
    </div>
  `;
};

render(html`<${App} />`, root);
