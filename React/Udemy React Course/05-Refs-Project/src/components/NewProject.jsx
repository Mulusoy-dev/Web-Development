import { useRef } from "react";
import Modal from "./Modal";

const NewProject = ({ onAdd, onCancel }) => {
  const modal = useRef();

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const handleSave = () => {
    // retrieve value from inputs
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    // validation
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      // show error modal
      modal.current.open();
      return; // onAdd() is not executed.
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  };

  return (
    <>
      <Modal ref={modal} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        {/* <p className="text-stone-400 mb-2">Please enter a value.</p> */}
        <p className="text-stone-600 mb-2">
          Make sure you provide a valid value.
        </p>
      </Modal>
      <div className="mt-16 w-2/3 md:w-7/12">
        <menu className="flex flex-row justify-end items-center gap-4 pt-12 my-4 mb-4">
          <button
            onClick={onCancel}
            className="text-stone-800 hover:text-stone-950"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-stone-800 py-2 px-6 text-stone-50 hover:bg-stone-950 rounded-md"
          >
            Save
          </button>
        </menu>
        <div>
          <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">
              Title
            </label>
            <input
              type="text"
              ref={title}
              className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            />
          </p>
          <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">
              Description
            </label>
            <textarea
              ref={description}
              className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            />
          </p>
          <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">
              Due Date
            </label>
            <input
              ref={dueDate}
              type="date"
              className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default NewProject;
