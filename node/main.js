const fs = require("fs");

// Cargar dataset
const data = require("../data/cuadro_completo.json");

// Generar CSV
const headers = ["Tematica", "Candidato", "Propuesta"];
const csvLines = [
  headers.join(","),
  ...data.map(row => [
    `"${row.Tematica.replace(/"/g, '""')}"`,
    `"${row.Candidato.replace(/"/g, '""')}"`,
    `"${row.Propuesta.replace(/"/g, '""')}"`
  ].join(","))
];

fs.writeFileSync("data/cuadro_completo.csv", csvLines.join("\n"));
console.log("CSV generado correctamente en /data.");
