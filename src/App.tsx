import React, { useState } from "react";
import { Form } from "./components";
import { sample } from "./utils/fixtures";

function App() {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const handleSubmit = (formData: { [key: string]: any }) => {
    setisLoading(true);
    console.info(formData);
  };
  return (
    <div className="App">
      <Form handleSubmit={handleSubmit} disabled={isLoading}>
        {sample}
      </Form>
    </div>
  );
}

export default App;
