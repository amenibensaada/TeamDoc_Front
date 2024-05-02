import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getChartData } from "../../services/FolderService";
import "./chart.css";
import { Chart, registerables } from "chart.js";

const ChartPage = () => {
  const [chartData, setChartData] = useState<{
    datasets: {
      label: string;
      data: any[];
      fill: boolean;
      borderColor: string;
      tension: number;
    }[];
    labels: any[];
  }>({
    datasets: [],
    labels: [],
  });
  Chart.register(...registerables);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChartData();
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
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="chart-container">
      {" "}
      {/* Ajoutez une classe pour le conteneur principal */}
      <h2 className="chart-heading">Chart Page</h2>{" "}
      {/* Ajoutez une classe pour le titre */}
      <div className="chart-wrapper">
        {" "}
        {/* Ajoutez une classe pour l'enveloppe du graphique */}
        <Line data={chartData} />{" "}
        {/* Utilisez Line de react-chartjs-2 pour afficher le graphique */}
      </div>
    </div>
  );
};
export default ChartPage;
