import React from "react";

const Pagination = ({ filter, setFilter }) => {
  const { total, page, limit } = filter;

  const onClick = (inc) => {
    setFilter((prevState) => {
      const { page } = prevState;
      return { ...prevState, page: page + inc };
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="mb-4 sm:mb-0 sm:order-1"
        role="navigation"
        aria-label="Navigation"
      >
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <a
              className="btn bg-white border-slate-200 text-slate-300 cursor-not-allowed"
              href="#0"
              disabled
              onClick={() => onClick(-1)}
            >
              &lt;- Previous
            </a>
          </li>
          <li className="ml-3 first:ml-0">
            <a
              className="btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500"
              href="#0"
              onClick={() => onClick(1)}
            >
              Next -&gt;
            </a>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 text-center sm:text-left">
        Showing{" "}
        <span className="font-medium text-slate-600">{page * limit}</span> to{" "}
        <span className="font-medium text-slate-600">{(page + 1) * limit}</span>{" "}
        of <span className="font-medium text-slate-600">{total}</span> results
      </div>
    </div>
  );
};

export default Pagination;
