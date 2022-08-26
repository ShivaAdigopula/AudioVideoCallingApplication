import "./App.css";
import CallNotifier from "./Components/CallNotifier";
import Controls from "./Components/Controls";
import { VideoWrapper } from "./Components/VideoWrapper";

function App() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className=" mx-10 my-5 h-1/2 w-screen  border-2 border-blue-500 sm:w-1/2 md:1/2 lg:w-1/2 xl:w-1/2">
        <VideoWrapper />
      </div>
      <div className="mx-10 my-5">
        <Controls>
          <CallNotifier />
        </Controls>
      </div>
      <div>Developed By Shiva Adigopula</div>
    </div>
  );
}

export default App;
