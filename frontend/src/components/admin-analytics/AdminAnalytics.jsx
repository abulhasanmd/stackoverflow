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
import { KAFKA_MIDDLEWARE_URL } from "../../config/configBackend";
import './AdminAnalytics.css';
import PageTitle from "../PageTitle/PageTitle.component";

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

const baseOptions = {
  responsive: true,
  // maintainAspectRatio: false,
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
const topTagsOptions = {
  ...baseOptions,
  plugins: {
    ...baseOptions.plugins,
    title: {
      display: true,
      text: "Top Tags Bar Graph",
    },
  },
};
const topQuestionsOptions = {
  ...baseOptions,
  plugins: {
    title: {
      display: true,
      text: "Top Questions Bar Graph",
    },
  },
};
const topUsersOptions = {
  ...baseOptions,
  plugins: {
    title: {
      display: true,
      text: "Top Users Bar Graph",
    },
  },
};
const bottomUsersOptions = {
  ...baseOptions,
  plugins: {
    title: {
      display: true,
      text: "Bottom Users Bar Graph",
    },
  },
};
const questionsPerDayOptions = {
  ...baseOptions,
  plugins: {
    title: {
      display: true,
      text: "Questions Per Day Line Graph",
    },
  },
};
export default function AdminAnalytics() {
  
  const [topTagsData,setTopTagsData] = useState({
    labels: [],
    datasets: [
      {
        label: "Questions Per Tag",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  
  const [topQuestionsData,setTopQuestionsData] = useState({
    labels: [],
    datasets: [
      {
        label: "Views Per Question",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const [topUsersData,setTopUsersData] = useState({
    labels: [],
    datasets: [
      {
        label: "Reputation Per User",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  
  const [bottomUsersData,setBottomUsersData] = useState({
    labels: [],
    datasets: [
      {
        label: "Reputation Per User",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const [questionsPerDayData,setQuestionsPerDayData] = useState({
    labels: [],
    datasets: [
      {
        label: "Questions Per Day",
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
          label: "Questions Per Tag",
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
          label: "Views Per Question",
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
          label: "Reputation Per User",
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
          label: "Reputation Per User",
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
          label: "Questions Per Day",
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
    <div className="analytics-container">
      <PageTitle title='Admin Analytics'/>
      <div className="analytics-header">Admin Analytics</div>
    <div className="analytics-graphs-container">
      <div className="analytics-barchart"><Bar options={topTagsOptions} data={topTagsData} /></div>
      <div className="analytics-barchart"><Bar options={topQuestionsOptions} data={topQuestionsData} /></div>
      <div className="analytics-barchart"><Bar options={topUsersOptions} data={topUsersData} /></div>
      <div className="analytics-barchart"> <Bar options={bottomUsersOptions} data={bottomUsersData}  /></div>
      <div className="analytics-barchart"><Line options={questionsPerDayOptions} data={questionsPerDayData} /></div>
    </div>
    </div>

  );
}
