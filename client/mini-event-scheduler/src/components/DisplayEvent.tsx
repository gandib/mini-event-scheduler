import { format } from "date-fns";
import type { TEvent } from "../types/event.types";
import { toast } from "sonner";

const DisplayEvent = ({
  data,
  refresh,
  setRefresh,
}: {
  data: TEvent;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const API_URL = import.meta.env.VITE_BASE_API_URL;

  const handleDelete = async (id: number) => {
    const res = await fetch(`${API_URL}/events/${id}`, { method: "DELETE" });

    try {
      if (res.ok) {
        toast("Event deleted successfully!");
        setRefresh(!refresh);
      } else {
        toast.dismiss();
        toast.error("Failed to delete event");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast("Event archive status updated successfully!");
        setRefresh(!refresh);
      } else {
        toast.dismiss();
        toast.error("Failed to update event status!");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-100 card-xl shadow-sm">
      <div className="card-body">
        {/*Toggle for archive status change */}
        <label className="label flex justify-end">
          <input
            type="checkbox"
            defaultChecked
            className="toggle"
            disabled={data?.archivedStatus}
            onClick={() => handleUpdate(data.id)}
          />
          {data?.archivedStatus ? "Archived" : "Archive"}
        </label>

        <h2 className="card-title">{data.title}</h2>
        <h4>Category: {data.category}</h4>
        <h4>Date: {format(data.date, "dd MMM yyyy")}</h4>
        <h4>Time: {format(`${data.date}T${data.time}`, "HH:mm")}</h4>
        <p className="text-justify">{data.notes}</p>
        <div className="justify-end card-actions">
          <button
            onClick={() => handleDelete(data.id)}
            className="btn btn-warning"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayEvent;
