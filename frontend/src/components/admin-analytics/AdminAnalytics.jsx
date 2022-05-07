import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar,Line } from "react-chartjs-2";
import faker from "@faker-js/faker";
import { KAFKA_MIDDLEWARE_URL } from "../../config/configBackend";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

export default function AdminAnalytics() {
  
  const [topTagsData,setTopTagsData] = useState({
    labels: [],
    datasets: [
      {
        label: "Top Tags Data",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  
  const [topQuestionsData,setTopQuestionsData] = useState({
    labels: [],
    datasets: [
      {
        label: "Top Questions Data",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const [topUsersData,setTopUsersData] = useState({
    labels: [],
    datasets: [
      {
        label: "Top Users Data",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  
  const [bottomUsersData,setBottomUsersData] = useState({
    labels: [],
    datasets: [
      {
        label: "Bottom Users Data",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const [questionsPerDayData,setQuestionsPerDayData] = useState({
    labels: [],
    datasets: [
      {
        label: "Questions Per Day Data",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  



  const tranformToTopTagData = (analytics) => {
    const tagData = {
      labels: [],
      datasets: [
        {
          label: "Top Tags Data",
          data: [],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    }
       analytics.topTags.forEach((tag) => {
        tagData.labels.push(tag.name)
        tagData.datasets[0].data.push(tag.questionsCount);
    });
    console.log(tagData)
    return tagData;
  };

  const tranformToTopQuestionsData = (analytics) => {
    const questionsData = {
      labels: [],
      datasets: [
        {
          label: "Top Questions Data",
          data: [],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    }
       analytics.topQuestions.forEach((question) => {
        questionsData.labels.push(question.title.substring(0,15))
        questionsData.datasets[0].data.push(question.views);
    });
    console.log(questionsData)
    return questionsData;
  };

  const tranformToTopUsersData = (analytics) => {
    const topUsersData = {
      labels: [],
      datasets: [
        {
          label: "Top Users Data",
          data: [],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    }
       analytics.topUsers.forEach((user) => {
        topUsersData.labels.push(user.name)
        topUsersData.datasets[0].data.push(user.reputation);
    });
    console.log(topUsersData)
    return topUsersData;
  };

  const tranformToBottomUsersData = (analytics) => {
    const bottomUsersData = {
      labels: [],
      datasets: [
        {
          label: "Bottom Users Data",
          data: [],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    }
       analytics.bottomUsers.forEach((user) => {
        bottomUsersData.labels.push(user.name)
        bottomUsersData.datasets[0].data.push(user.reputation);
    });
    console.log(bottomUsersData)
    return bottomUsersData;
  };

  const tranformToQuestionsPerDayData = (analytics) => {
    const questionsData = {
      labels: [],
      datasets: [
        {
          label: "Questions Per Day Data",
          data: [],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    }
       analytics.questionsPerDay.forEach((question) => {
        questionsData.labels.push(question._id)
        questionsData.datasets[0].data.push(question.count);
    });
    console.log(questionsData)
    return questionsData;
  };

  useEffect(() => {
    fetch(KAFKA_MIDDLEWARE_URL + "admin/get-analytics", {
      mode: "cors",
      headers: {
        Authorization: "",
      },
    })
      .then((response) => response.json())
      .then((responsejson) => {
        setTopTagsData(tranformToTopTagData(responsejson.data));
        setTopQuestionsData(tranformToTopQuestionsData(responsejson.data));
        setTopUsersData(tranformToTopUsersData(responsejson.data));
        setBottomUsersData(tranformToBottomUsersData(responsejson.data));
        setQuestionsPerDayData(tranformToQuestionsPerDayData(responsejson.data));
      })
      .catch((error) =>
        console.error(
          `Some error occured while gettin analytics data ${JSON.stringify(
            error
          )}`
        )
      );
  }, []);

  return (
    <>
      <Bar options={options} data={topTagsData} />
      <Bar options={options} data={topQuestionsData} />
      <Bar options={options} data={topUsersData} />
      <Bar options={options} data={bottomUsersData} />
      <Line options={options} data={questionsPerDayData} />
    </>
  );
}
