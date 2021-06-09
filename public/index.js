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
                participantId: 'fake_id',
                changes: [
                    {
                        emotion: 'sad',
                        timestamp: '2020-06-09T10:30:00Z'
                    },
                    {
                        emotion: 'happy',
                        timestamp: '2020-06-09T10:32:00Z'
                    },
                    {
                        emotion: 'mad',
                        timestamp: '2020-06-09T10:44:00Z'
                    }
                ]
            }
        ]
    }
    
    setMeetingData(data)
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
    ${meetingData ? html`<${Charts} data=${meetingData} />` : null}
  `;
};

render(html`<${App} />`, root);
