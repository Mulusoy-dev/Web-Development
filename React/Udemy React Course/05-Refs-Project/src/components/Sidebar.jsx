const Sidebar = ({
  onStartAppProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) => {
  return (
    <aside className="w-1/3 min-w-56 md:w-72 h-screen rounded-r-xl bg-stone-900 my-8 px-8 py-16 text-stone-50">
      <h2 className="mb-8 font-bold md:text-lg uppercase text-stone-200">
        Your Projects
      </h2>
      <div>
        <button
          onClick={onStartAppProject}
          className="bg-stone-700 text-stone-400 py-2 px-4 text-xs md:text-base rounded-md hover:bg-stone-600 hover:text-stone-100"
        >
          + Add Project
        </button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1  hover:text-stone-200 hover:bg-stone-800";
          if (project.id === selectedProjectId) {
            cssClasses += " bg-stone-800 text-stone-200";
          } else {
            cssClasses += " text-stone-400";
          }

          return (
            <li key={project.id}>
              <button
                onClick={() => onSelectProject(project.id)}
                className={cssClasses}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
