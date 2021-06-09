import { html } from "./index.js";
import {
  useEffect,
  useRef,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

export function Timeline({ data }) {
  const canvasRef = useRef();
  const contextRef = useRef();

  useEffect(() => {
    console.log("CHART DATA", data);
    contextRef.current = canvasRef.current.getContext("2d");

    const [from, to] = data.reduce(([earliest, latest], participant) => {
      participant.changes.forEach(change => {
        const time = new Date(change.timestamp);

        if (time < earliest) {
          earliest = time
        } else if (time > latest) {
          latest = time
        }
      })

      return [earliest, latest];
    }, [new Date(2100, 0, 0), new Date(2000, 0, 0)]);

    const milisecIncrement = 1000;
    const times = [];
    let now = from;
    while (now < to) {
      times.push(now);
      now = new Date(now.getTime() + milisecIncrement);
    }

    const participantEmotions = {}
    data.forEach(participant => {
      participantEmotions[participant.participantId] = [];

      let currentEmotion = 'neutral;'
      times.forEach(t => {
        const change = participant.changes.find(c => new Date(c.timestamp) > t);
        if (change) {
          currentEmotion = change.emotion;
        }

        participantEmotions[participant.participantId].push(currentEmotion);
      })
    });
    console.log(participantEmotions);


    const emotions = ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'];
    const colors = {
      'neutral': `gray`,
      'happy': 'green',
      'sad': 'blue',
      'angry': 'red',
      'fearful': 'black',
      'disgusted': 'green',
      'surprised': 'orange',
    }
    const emotionamounts = emotions.reduce((a, e) => { a[e] = []; return a; }, {})
    times.forEach((_, i) => {
      emotions.forEach(emotion => {
        const amount = Object.values(participantEmotions).reduce((sum, pe) => {
          return sum + (pe[i] == emotion ? 1 : 0);
        }, 0);

        emotionamounts[emotion].push(amount);
      })
    });

    console.log(emotionamounts)

    const chartDataset = [];
    for (const emotion of emotions) {
      chartDataset.push({
        label: emotion,
        data: emotionamounts[emotion],
        backgroundColor: colors[emotion],
        // backgroundColor: "rgba(255, 99, 132, 0.2)",
      })
    }

    console.log(contextRef.current);

    const chartdata = {
      labels: times.map(t => t.toLocaleTimeString()),
      datasets: chartDataset
    };

    new Chart(contextRef.current, {
      // type: 'line',
      // data: chartdata,
      // options: {
      //   responsive: true,
      //   plugins: {
      //     legend: {
      //       position: 'top',
      //     },
      //     title: {
      //       display: true,
      //       text: 'Timeline'
      //     }
      //   }
      // },



      type: 'bar',
      data: chartdata,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked'
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }, []);

  useEffect(() => { }, []);

  return html`
    <div>
      <p>timeline</p>
      <canvas ref=${canvasRef} width="640" height="480"></canvas>
    </div>
  `;
}
