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
      return 175; // Example size for small screens
    } else if (width >= 640 && width < 1024) {
      return 190; // Example size for medium screens
    } else {
      return 250; // Example size for larger screens
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
        <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <div className="fixed md:left-[50%] left-[42%] top-[50%] z-50 grid lg:w-[600px] w-[350px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
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
      <div className="flex lg:flex-row flex-col items-center justify-center gap-4 my-4">
        <div className="px-5">{memoizedWheelComponent}</div>
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
