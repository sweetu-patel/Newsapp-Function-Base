import React, { useState } from "react";

const SplitJsonLocalFile = () => {
  const [status, setStatus] = useState("");
  const chunkSize = 100;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setStatus("No file selected.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        setStatus("Reading and processing file...");
        const jsonData = JSON.parse(e.target.result);

        // Ensure the data is an array
        if (!Array.isArray(jsonData)) {
          setStatus("The JSON data must be an array.");
          return;
        }

        // Split the data into chunks and trigger downloads for each chunk
        for (let i = 0; i < jsonData.length; i += chunkSize) {
          debugger;
          const chunk = jsonData.slice(i, i + chunkSize);
          const chunkFileName = `split_${Math.floor(i / chunkSize)}.json`;

          // Create a Blob and trigger the download
          const blob = new Blob([JSON.stringify(chunk, null, 2)], {
            type: "application/json",
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = chunkFileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          console.log(`Successfully created ${chunkFileName}`);
        }

        setStatus("All chunks processed and downloaded successfully.");
      } catch (error) {
        console.error("Error processing the file:", error);
        setStatus(
          "Error processing the file. Ensure it is a valid JSON array."
        );
      }
    };

    reader.onerror = () => {
      console.error("Error reading the file.");
      setStatus("Error reading the file.");
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h1>Split Local JSON File</h1>
      <p>Status: {status}</p>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        style={{ marginBottom: "10px" }}
      />
    </div>
  );
};

export default SplitJsonLocalFile;
