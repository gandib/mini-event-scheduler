import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";

const AddEventModal = ({
  refresh,
  setRefresh,
}: {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const closeModal = () => modalRef.current?.close();

  const onSubmit = async () => {
    const API_URL = import.meta.env.VITE_BASE_API_URL;
    const formattedDate = startDate.toISOString().split("T")[0];
    const timeOnly = selectedDateTime.toTimeString().slice(0, 5);

    const eventData = {
      title,
      date: formattedDate,
      time: timeOnly,
      notes,
    };

    try {
      setLoading(true);
      toast.dismiss();
      toast.loading("Creating event...");

      const res = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (res.ok) {
        toast.dismiss();
        setRefresh(!refresh);
        toast.success("Event created successfully");
        closeModal();
      } else {
        toast.dismiss();
        toast.error("Failed to create event");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {/* Modal */}
      <dialog ref={modalRef} id="add_event_modal" className="modal">
        <div className="modal-box space-y-4 overflow-visible">
          <h3 className="text-xl font-bold">Add New Event</h3>

          <form method="dialog" className="space-y-3">
            <input
              type="text"
              placeholder="Event Title"
              className="input input-bordered w-full"
              required
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Notes"
              className="textarea textarea-bordered w-full"
              rows={3}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>

            <div className="flex gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date!)}
                  className="input input-bordered w-full"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select Date"
                  popperPlacement="top"
                  calendarClassName="rounded-box"
                />

                <DatePicker
                  selected={selectedDateTime}
                  onChange={(date) => setSelectedDateTime(date!)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={1}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  timeFormat="HH:mm"
                  className="input input-bordered w-full"
                  placeholderText="Select Time"
                  popperPlacement="top"
                  calendarClassName="rounded-box"
                />
              </div>
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddEventModal;
