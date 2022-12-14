import "./App.css";
import CallNotifier from "./Components/CallNotifier";
import Controls from "./Components/Controls";
import AppBar from "./Components/AppBar";
import { VideoWrapper } from "./Components/VideoWrapper";
import Greetings from "./Components/Greetings";

function App() {
  return (
    <div className="w-screen h-screen">
      <AppBar />
      <Greetings />
      <div className="flex flex-col justify-center items-center  bg-slate-200">
        <div className=" my-2 w-full">
          <VideoWrapper />
        </div>
        <div className="mx-10 my-5">
          <Controls>
            <CallNotifier />
          </Controls>
        </div>
      </div>

      <footer className="absolute bottom-0 w-screen p-5 select-none">
        {" "}
        <div className="text-center user select-none" tabIndex={-1}>
          {" "}
          &copy; {new Date().getFullYear()} Shiva Adigopula
        </div>
      </footer>
    </div>
  );
}

export default App;
