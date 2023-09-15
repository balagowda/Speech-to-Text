import React, { useState } from "react";
import "./App.css";
import MicIcon from "@mui/icons-material/Mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import Tooltip from "@mui/material/Tooltip";

const Speech = () => {
  const [speak, setSpeak] = useState(false);
  const [open, setOpen] = useState(false);

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const stopListening = () => SpeechRecognition.stopListening();

  const [isCopied, setCopied] = useClipboard(transcript);

  const handleClick = () => {
    setSpeak(!speak);
    if (speak) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleOpen = () => {
    setOpen(true);

    // Automatically close the tooltip after 2 seconds
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };

  const handleClickCopy =()=>{
      setCopied();
      handleOpen();
  } 

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="container-box">
      <div className="content">{transcript}</div>

      <div className="bottom-div">
        {transcript && !speak && (
          <div className="bottom-child btn1">
            <Tooltip title="copied" arrow placement="top" open={open} onClose={() => setOpen(false)}>
              <button className="btn-child" onClick={handleClickCopy}>
                Copy
              </button>
            </Tooltip>
          </div>
        )}

        <div className="bottom-child btn-2">
          <div className={speak ? "behind animate" : "behind"}></div>
          <div className="front" onClick={handleClick}>
            <MicIcon className="mic" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speech;
