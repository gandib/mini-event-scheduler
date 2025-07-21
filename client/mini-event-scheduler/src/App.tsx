import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import type { TEvent } from "./types/event.types";
import DisplayEvent from "./components/DisplayEvent";
import Footer from "./components/Footer";
import AddEventModal from "./components/AddEventModal";

function App() {
  const API_URL = import.meta.env.VITE_BASE_API_URL;
  const [allEvents, setAllEvents] = useState<TEvent[]>([]);
  const [events, setEvents] = useState<TEvent[] | []>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then((data) => {
        setAllEvents(data.data);
        setEvents(data.data);
      });
  }, [API_URL, refresh]);

  useEffect(() => {
    if (!category) {
      setEvents(allEvents);
      return;
    }

    const filtered = allEvents.filter((event) => event.category === category);
    setEvents(filtered);
  }, [category, allEvents]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-[1440px] px-6 mt-20 flex-grow min-h-screen mb-10">
        <h1 className="text-xl font-semibold py-4">Events</h1>

        {/*Filtering */}
        <div className="flex justify-end mb-4 items-center gap-4">
          <h1>Filter by: </h1>
          <form className="filter">
            <input
              onClick={() => setCategory("")}
              className="btn btn-square"
              type="reset"
              name="reset"
              value="×"
            />
            <input
              onClick={(e) => setCategory(e.currentTarget.value)}
              className="btn"
              type="radio"
              value="Work"
              name="Work"
              aria-label="Work"
            />
            <input
              onClick={(e) => setCategory(e.currentTarget.value)}
              className="btn"
              type="radio"
              name="Personal"
              value="Personal"
              aria-label="Personal"
            />
            <input
              onClick={(e) => setCategory(e.currentTarget.value)}
              className="btn"
              type="radio"
              name="Other"
              value="Other"
              aria-label="Other"
            />
          </form>
        </div>
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
