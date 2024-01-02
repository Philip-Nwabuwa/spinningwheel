import { useMemo, useState, useEffect } from "react";
import WheelComponent from "./WheelComponent";
import clapping from "../assets/clapping.wav";
import { Button } from "./ui/button";
import Confetti from "react-confetti";
import { X } from "lucide-react";
import { useWindowSize } from "react-use";

const Wheel = ({ segments }) => {
  const [key, setKey] = useState(0);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  const [winner, setWinner] = useState("");
  const [winnersList, setWinnersList] = useState([]);
  const { width, height } = useWindowSize();

  useEffect(() => {
    localStorage.setItem("segments", JSON.stringify(segments));
  }, [segments]);

  console.log(width);

  const getWheelSize = () => {
    if (width < 640) {
      return 175;
    } else if (width >= 640 && width < 1024) {
      return 190;
    } else {
      return 250;
    }
  };

  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#E53935",
    "#FFEB3B",
    "#9C27B0",
    "#03A9F4",
    "#4CAF50",
  ];
  const getColorForSegment = (index) => {
    return segColors[index % segColors.length];
  };

  const onFinished = (winner) => {
    if (segments.length >= 2) {
      console.log("onFinished function called");
      setTimeout(() => {
        setWinner(winner);
        setIsWinnerModalOpen(true);
        setWinnersList((prevWinners) => [...prevWinners, winner]);
        const audio = new Audio(clapping);
        audio.play();
      }, 500);
    } else {
      console.log("Select at least 2 segments");
    }
  };

  const memoizedWheelComponent = useMemo(() => {
    const size = getWheelSize();
    const segmentColors = segments.map((_, index) => getColorForSegment(index));
    return (
      <WheelComponent
        key={key}
        segments={segments}
        segColors={segmentColors}
        onFinished={onFinished}
        primaryColor="black"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={size}
        upDuration={3000}
        downDuration={3000}
        fontFamily="Arial"
      />
    );
  }, [key, segments, onFinished]);
  return (
    <div className="App">
      {isWinnerModalOpen && <Confetti width={width} height={height} />}

      {isWinnerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 w-full">
          <div className="fixed top-1/2 left-[11%] md:left-[32%] md:top-[45%] lg:left-[40%] z-50 grid w-fit  gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <div className="text-4xl font-semibold leading-none tracking-tight">
                Congratulations!
              </div>
              <p className="pt-4 text-lg">{winner}</p>
              <div className="flex justify-end">
                <Button
                  className="w-fit"
                  onClick={() => {
                    setIsWinnerModalOpen(false);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex lg:flex-row w-full min-h-screen flex-col justify-center items-center gap-4 my-4">
        <div>{memoizedWheelComponent}</div>
        <div>
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center mt-2">
              <p className="mr-2">{segment}</p>
              <button
                className="p-1 rounded-full bg-red-500 text-white"
                onClick={() => {
                  const updatedSegments = segments.filter(
                    (_, i) => i !== index
                  );
                  setSegments(updatedSegments);
                  setKey((prevKey) => prevKey + 1);
                }}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="winners-list">
          <h2>Winners:</h2>
          <ul>
            {winnersList.map((winner, index) => (
              <li key={index}>{winner}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wheel;
