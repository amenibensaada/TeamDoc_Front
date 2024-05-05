import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getSharedFolderCount } from "../../services/FolderService";
import "./chart.css"; // Importez le fichier CSS pour le style du composant
import { Chart, registerables } from 'chart.js';
import { FaSyncAlt } from 'react-icons/fa';
import SideBar from "../sidebar/sidebar";

import Chart2 from "./chart2";

const ChartPage = () => {
  const [chartData, setChartData] = useState<{
    datasets: { label: string; data: any[]; fill: boolean; borderColor: string; tension: number; }[];
    labels: any[];
  }>({
    datasets: [],
    labels: []
  });
  const [currentChartIndex, setCurrentChartIndex] = useState(0); // État pour suivre l'index de la charte actuellement affichée
  const [chartDescription, setChartDescription] = useState<string>("Description du Chart 1"); // État pour stocker la description du chart

  Chart.register(...registerables);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSharedFolderCount();
        const formattedData = formatChartData(data);
        setChartData(formattedData);
      } catch (error: any) {
        console.error("Failed to fetch chart data:", error.message);
      }
    };

    fetchData();
  }, []);

  const formatChartData = (data: any) => {
    return {
      labels: data.map((entry: any) => entry.folderName),
      datasets: [
        {
          label: "Nombre de dossiers partagés",
          data: data.map((entry: any) => entry.shareCount),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  };

  const handleChartChange = () => {
    setCurrentChartIndex((prevIndex) => (prevIndex + 1) % 2); 
    if (currentChartIndex === 0) {
      setChartDescription("This function retrieves data for a chart showing the count of shared folders by Name It filters documents with non-empty sharedWith arrays, calculates the share count for each folder, and returns an array of objects with folder names and share counts. The chart provides insights into shared folder distribution, aiding in system management and collaboration.");
    } else {
      setChartDescription("This function aggregates data for a chart depicting the creation of folders over time. It groups folders by their creation dates, counts the number of folders created on each date, and formats the output to include the date and folder count. The resulting array contains objects with dates and corresponding folder counts, facilitating the visualization of folder creation trends.");
    }
  };

  return (
    <div className="content-container">
              <SideBar />
 <div className="main-content">

    <div className="chart-page-container">
      <h1 className="chart-title">Teamdoc Statistics</h1>
      <div className="chart-container">
        <div className="chart-description">{chartDescription}</div>
        <div className="chart-wrapper">
          {currentChartIndex === 0 ? <Chart2 /> : null}
          {currentChartIndex === 1 ? <Line data={chartData} /> : null}
        </div>
        <div className="change-chart-icon" onClick={handleChartChange}>
          <FaSyncAlt />
        </div>
      </div>
    </div>
    </div>
    </div>

  );
};

export default ChartPage;