import React, { useState } from "react";
import Wheel from "./components/Wheel";
import Navbar from "./components/common/Navbar";
import { Trash2, Link, Facebook, Instagram } from "lucide-react";
import WhatsappLogo from "../src/assets/WhatsappLogo.png";

function App() {
  const [segments, setSegments] = useState(["", "", "", ""]);
  const [showWheel, setShowWheel] = useState(false); // New state to control the visibility of the Wheel

  const handleSegmentChange = (index, value) => {
    const newSegments = [...segments];
    newSegments[index] = value;
    setSegments(newSegments);
  };

  const addSegment = () => {
    setSegments([...segments, ""]);
  };

  const removeSegment = (index) => {
    const newSegments = segments.filter((_, i) => i !== index);
    setSegments(newSegments);
  };

  const hasDuplicates = (array) => {
    const lowerCaseArray = array.map((element) => element.trim().toLowerCase());
    return new Set(lowerCaseArray).size !== lowerCaseArray.length;
  };

  const duplicates = hasDuplicates(
    segments.filter((segment) => segment.trim() !== "")
  );

  const updateSegments = () => {
    // This function could be used to update the state elsewhere, such as saving to a database
    console.log("Segments updated:", segments);
    // Show the Wheel component if there are 2 or more non-empty segments
    const nonEmptySegments = segments.filter(
      (segment) => segment.trim() !== ""
    );
    if (nonEmptySegments.length >= 2) {
      setShowWheel(true);
    }
  };

  return (
    <>
      <Navbar />
      {!showWheel && (
        <div className="bg-[#f1f1f1] px-4 duration-100 dark:bg-slate-800 dark:text-gray-100 w-full h-full min-h-screen">
          <div className="flex flex-col justify-center items-center h-full pt-[80px]">
            <div className="max-w-[489.51px]">
              <h1 className="text-violet-700 capitalize text-[32px] font-bold leading-10 tracking-wide">
                Add Items
              </h1>
              <p className="pt-5 text-stone-500 dark:text-white text-base font-normal tracking-tight">
                Lorem ipsum dolor sit amet consectetur. Diam habitant platea at
                vehicula. Mi nulla vitae congue ultricies mauris nibh justo
                elit.
              </p>
              <form className="mt-10 flex flex-col gap-5">
                {segments.map((segment, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="text"
                      placeholder={`Segment ${index + 1}`}
                      className="bg-neutral-200 dark:text-slate-900 w-full rounded-[5px] p-4"
                      value={segment}
                      onChange={(e) =>
                        handleSegmentChange(index, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="w-[33.22px] h-[33.55px] p-2.5 bg-rose-100 rounded-[5px] flex justify-center items-center"
                      onClick={() => removeSegment(index)}
                    >
                      <Trash2 className="text-red-500" />
                    </button>
                  </div>
                ))}
                {duplicates && (
                  <p className="text-white mt-2 bg-red-500 p-2 rounded-[5px]">
                    Error: Duplicate items are not allowed.
                  </p>
                )}
                <button type="button" onClick={addSegment} className="mt-2">
                  Add New Input
                </button>
                <button
                  className="h-[60px] bg-[#623ECA] text-white rounded-[10px] flex items-center justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  onClick={updateSegments}
                  disabled={duplicates}
                >
                  Generate
                </button>
              </form>
              <div className="my-20 flex justify-center items-center gap-4">
                <div className="flex items-center justify-center bg-white text-black p-3 rounded-full cursor-pointer">
                  <Link />
                </div>
                <img
                  src={WhatsappLogo}
                  className="cursor-pointer"
                  alt="whatsapp logo"
                />
                <div className="flex items-center justify-center bg-white text-black p-3 rounded-full cursor-pointer">
                  <Facebook />
                </div>
                <div className="flex items-center justify-center bg-white text-black p-3 rounded-full cursor-pointer">
                  <Instagram />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showWheel && (
        <Wheel segments={segments.filter((segment) => segment.trim() !== "")} />
      )}
    </>
  );
}

export default App;
