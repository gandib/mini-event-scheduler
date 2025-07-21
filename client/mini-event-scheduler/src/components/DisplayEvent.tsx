import { format } from "date-fns";
import type { TEvent } from "../types/event.types";

const DisplayEvent = ({ data }: { data: TEvent }) => {
  return (
    <div className="card bg-base-100 card-xl shadow-sm">
      <div className="card-body">
        {/*Toggle for archive status change */}
        <label className="label flex justify-end">
          <input
            type="checkbox"
            defaultChecked
            className="toggle"
            disabled={data?.archivedStatus ? true : false}
          />
          {data?.archivedStatus ? "Archived" : "Archive"}
        </label>

        <h2 className="card-title">{data.title}</h2>
        <h4>Category: {data.category}</h4>
        <h4>Date: {format(data.date, "dd MMM yyyy")}</h4>
        <h4>Time: {format(`${data.date}T${data.time}`, "HH:mm")}</h4>
        <p className="text-justify">{data.notes}</p>
        <div className="justify-end card-actions">
          <button className="btn btn-warning">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DisplayEvent;
