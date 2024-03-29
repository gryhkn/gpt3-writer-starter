import { useState } from "react";
import Image from "next/image";
import TwitterLogo from "../assets/twitter.svg";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Summarize any text in just two sentences.</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write below your text:</h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="start typing here"
            value={userInput}
            onChange={onUserChangedText}
          />

          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Summarize</p>
                )}
              </div>
            </a>
          </div>
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Summary:</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
          <div className="badge-container grow">
            <div className="badge">
              <Image src={TwitterLogo} alt="buildspace logo" />
              <p>
                <a href="https://twitter.com/gryhkn">Build by Giray</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
