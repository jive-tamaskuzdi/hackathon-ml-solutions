// @ts-check
import { html } from "./index.js";
import {
  useEffect,
  useRef,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import {
  compareDesc,
  differenceInSeconds,
} from "https://unpkg.com/date-fns@2.22.1/esm/index.js";

const emotions = [
  "neutral",
  "surprised",
  "happy",
  "sad",
  "angry",
  "fearful",
  "disgusted",
];

export function Charts({ data }) {
  const canvasRef = useRef();
  const contextRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    console.log("CHART DATA", data);
    contextRef.current = canvasRef.current.getContext("2d");

    const endOfMeeting = data
      .map(
        (participant) =>
          new Date(
            participant.changes[participant.changes.length - 1].timestamp
          )
      )
      .sort(compareDesc)[0];

    const datasets = data.map((participant) => {
      const diffs = calculateDiffs(participant.changes, endOfMeeting);

      let chartData = [];

      for (const emotion of emotions) {
        const dataForEmotion = diffs.filter((diff) => diff.emotion === emotion);

        console.log({ dataForEmotion });
        const sumForEmotion = dataForEmotion.reduce(
          (acc, current) => acc + current.diff,
          0
        );

        chartData.push(sumForEmotion);
      }

      const colors = {
        r: `${random(0, 255)}`,
        g: `${random(0, 255)}`,
        b: `${random(0, 255)}`,
      };

      return {
        label: participant.participantId,
        data: chartData,
        fill: true,
        backgroundColor: `rgba(${colors.r}, ${colors.g}, ${colors.b}, 0.2)`,
        borderColor: `rgb(${colors.r}, ${colors.g}, ${colors.b})`,
        pointBackgroundColor: `rgba(${colors.r}, ${colors.g}, ${colors.b}, 0.2)`,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      };
    });
    const sample = {
      labels: emotions,
      datasets: datasets,
    };

    chartRef.current = new Chart(contextRef.current, {
      type: "radar",
      data: sample,
      options: {
        elements: {
          line: {
            borderWidth: 3,
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    const endOfMeeting = data
      .map(
        (participant) =>
          new Date(
            participant.changes[participant.changes.length - 1].timestamp
          )
      )
      .sort(compareDesc)[0];

    const datasets = data.map((participant) => {
      const diffs = calculateDiffs(participant.changes, endOfMeeting);

      let chartData = [];

      for (const emotion of emotions) {
        const dataForEmotion = diffs.filter((diff) => diff.emotion === emotion);

        console.log({ dataForEmotion });
        const sumForEmotion = dataForEmotion.reduce(
          (acc, current) => acc + current.diff,
          0
        );

        chartData.push(sumForEmotion);
      }

      const colors = {
        r: `${random(0, 255)}`,
        g: `${random(0, 255)}`,
        b: `${random(0, 255)}`,
      };

      return {
        label: participant.participantId,
        data: chartData,
        fill: true,
        backgroundColor: `rgba(${colors.r}, ${colors.g}, ${colors.b}, 0.2)`,
        borderColor: `rgb(${colors.r}, ${colors.g}, ${colors.b})`,
        pointBackgroundColor: `rgba(${colors.r}, ${colors.g}, ${colors.b}, 0.2)`,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      };
    });

    chartRef.current.data.datasets = datasets;

    chartRef.current.update();
  }, [data]);

  return html`
    <div>
      <p>charts</p>
      <div style="max-width: 900px;margin-left: auto;margin-right: auto;">
        <canvas ref=${canvasRef} width="400" height="400"></canvas>
      </div>
    </div>
  `;
}
/**
 *
 * @param {Array<{emotion: string, timestamp: string}>} changes
 * @param {Date} endOfMeeting
 *
 * @returns {Array<{emotion: string, timestamp: string, diff?: number}>}
 */
function calculateDiffs(changes, endOfMeeting) {
  const newArr = [];

  if (changes.length === 1) {
    newArr.push({
      ...changes[0],
      diff: differenceInSeconds(endOfMeeting, new Date(changes[0].timestamp)),
    });
  } else {
    for (let i = 0; i < changes.length; i++) {
      const element = changes[i];
      if (i === changes.length - 1) {
        newArr.push({
          ...element,
          diff: differenceInSeconds(
            new Date(element.timestamp),
            new Date(changes[i - 1].timestamp)
          ),
        });
      } else {
        newArr.push({
          ...element,
          diff: differenceInSeconds(
            new Date(changes[i + 1].timestamp),
            new Date(element.timestamp)
          ),
        });
      }
    }
  }

  return newArr;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
