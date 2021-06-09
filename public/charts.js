import { html } from "./index.js";
import {
  useEffect,
  useRef,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

const emotions = ["neutral", "surprised", "happy"];

export function Charts({ data }) {
  const canvasRef = useRef();
  const contextRef = useRef();

  useEffect(() => {
    console.log("CHART DATA", data);
    contextRef.current = canvasRef.current.getContext("2d");

    console.log(contextRef.current);

    const sample = {
      labels: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running",
      ],
      datasets: [
        {
          label: "My First Dataset",
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
        {
          label: "My Second Dataset",
          data: [28, 48, 40, 19, 96, 27, 100],
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgb(54, 162, 235)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(54, 162, 235)",
        },
      ],
    };

    new Chart(contextRef.current, {
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

  useEffect(() => {}, []);

  return html`
    <div>
      <p>charts</p>
      <canvas ref=${canvasRef} width="640" height="480"></canvas>
    </div>
  `;
}
