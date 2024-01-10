import React, { useState } from "react";
// Nested Component
import AppSelect from "./components/appSelect";
import "./App.css";

function App() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const options = [
    "Option1",
    "Option2",
    "Option3",
    "Option4",
    "Option5",
    "Option6",
  ];

  const onOptionChangeHandler = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <div className="App">
      <h1>Kimp Test</h1>
      <h2>Create a reuseable select component using react and typescript</h2>
      <h3>Selected value : {selectedValue || 'N/A'}</h3>
      <AppSelect
        options={options}
        selectedValue={selectedValue}
        onOptionChange={onOptionChangeHandler}
      />
    </div>
  );
}

export default App;
