import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import type { TEvent } from "./types/event.types";
import DisplayEvent from "./components/DisplayEvent";
import Footer from "./components/Footer";
import AddEventModal from "./components/AddEventModal";

function App() {
  const API_URL = import.meta.env.VITE_BASE_API_URL;
  const [events, setEvents] = useState<TEvent[] | []>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data.data));
  }, [API_URL, refresh]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-[1440px] px-6 mt-20 flex-grow min-h-screen mb-10">
        <h1 className="text-xl font-semibold py-4">Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.map((data) => (
            <DisplayEvent
              key={data.id}
              data={data}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
        </div>
      </div>
      <AddEventModal refresh={refresh} setRefresh={setRefresh} />
      <Footer />
    </>
  );
}

export default App;
