import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getChartData } from "../../services/FolderService";
import "./chart2.css"; // Importez le fichier CSS pour le style du composant
import {Chart,registerables} from 'chart.js'; 


const ChartPage = () => {
  const [chartData, setChartData] = useState<{
    datasets: { label: string; data: any[]; fill: boolean; borderColor: string; tension: number; }[];
    labels: any[];
  }>({
    datasets: [],
    labels: []
  });
  Chart.register(...registerables);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChartData();
        const formattedData = formatChartData(data);
        setChartData(formattedData);
      } catch (error:any) {
        console.error("Failed to fetch chart data:", error.message);
      }
    };

    fetchData();
  }, []);

  const formatChartData = (data: any) => {
    return {
      labels: data.map((entry: any) => {
        const date = new Date(entry.date);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Les mois sont indexés à partir de zéro, donc nous ajoutons 1
        const year = date.getFullYear();
        return `${day}-${month}-${year}`; // Format: JJ-MM-AAAA
      }),
      datasets: [
        {
          label: "Nombre de dossiers",
          data: data.map((entry: any) => entry.folderCount),
          fill: false,
          borderColor: "rgb(30, 182, 102)",
          tension: 0.1,
        },
      ],
    };
  };
  

  return (
    <div > 
        <Line data={chartData} /> 
    </div>
  );
};
export default ChartPage;