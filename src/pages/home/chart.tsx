import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getSharedFolderCount } from "../../services/FolderService";
import "./chart.css"; // Importez le fichier CSS pour le style du composant
import { Chart, registerables } from 'chart.js';
import { FaSyncAlt } from 'react-icons/fa';

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
    setCurrentChartIndex((prevIndex) => (prevIndex + 1) % 2); // Basculer entre les index 0 et 1
  };

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        {currentChartIndex === 0 ? <Chart2 /> : null}
        {currentChartIndex === 1 ? <Line data={chartData} /> : null}
      </div>
      <div className="change-chart-icon" onClick={handleChartChange}>
        {/* Utilisation de l'icône de changement */}
        <FaSyncAlt />
      </div>
    </div>
  );
};

export default ChartPage;
