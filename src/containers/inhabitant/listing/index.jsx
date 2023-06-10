import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, redirect, Link } from "react-router-dom";
import Table from "../../../components/table";
import Pagination from "../../../components/table/pagination";
import Api from "../../../utils/api";
import { openErrorModal } from "../../../redux/reducers/common";
import moment from "moment";

const initialFilters = {
  page: 1,
  sort: "id",
  order: "asc",
  limit: 10,
  offset: 0,
  total: 0,
  filter: {},
};

const Listing = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [filter, setFilter] = useState(initialFilters);
  const [totalCount, setCount] = useState(0);
  const [list, setList] = useState([]);

  const getData = ({ rows, count }) => {
    setCount(count);
    const ListNew = rows.map((v, i) => {
      return {
        ...v,
        id: i + 1 + (filter.page - 1) * 10,
      };
    });
    return ListNew;
  };

  useEffect(() => {
    fetchData(filter);
  }, [filter]);
  const fetchData = async (data) => {
    try {
      const res = await Api.post("/inhabitant/list", data);
      setList(getData(res.data.data));
    } catch (error) {
      dispatch(openErrorModal({ isOpen: true, message: error.message }));
    }
  };

  const column = [
    {
      header: "ID",
      accessor: "id",
    },
    {
      header: "Name",
      accessor: "name",
      Cell: (value, allValues) => {
        const { _id } = allValues;
        return <Link to={`/inhabitant/${_id}`}>{value}</Link>;
      },
    },
    {
      header: "Age",
      accessor: "age",
    },
    {
      header: "Is pensioner",
      accessor: "is_pensioner",
      Cell: (value, allValues) => {
        return value ? `Yes(${allValues.pension_type})` : "No";
      },
    },
    {
      header: "Marital Status",
      accessor: "marital_status",
      Cell: (value) => {
        return value ? "Married" : "Unmarried";
      },
    },
    {
      header: "Date Of Birth",
      accessor: "date_of_birth",
      Cell: (value) => {
        return moment(value).format("DD-MMM-YYYY");
      },
    },
    {
      header: "Adhar Card",
      accessor: "adhar_card",
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
            Population
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Search form */}
          {/* <SearchForm placeholder="Search by invoice ID…" /> */}
          {/* Create invoice button */}
          <button
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
            onClick={() => navigate("/inhabitant/add")}
          >
            <svg
              className="w-4 h-4 fill-current opacity-50 shrink-0"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Add Inhabitant</span>
          </button>
        </div>
      </div>
      {/* More actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        {/* Left side */}
        <div className="mb-4 sm:mb-0">
          <ul className="flex flex-wrap -m-1">
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                All <span className="ml-1 text-indigo-200">67</span>
              </button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                Paid <span className="ml-1 text-slate-400">14</span>
              </button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                Due <span className="ml-1 text-slate-400">34</span>
              </button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                Overdue <span className="ml-1 text-slate-400">19</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Right side */}
      </div>
      <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
        <header className="px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            Invoices <span className="text-slate-400 font-medium">67</span>
          </h2>
        </header>
        <div>
          {/* Table */}
          <div className="overflow-x-auto">
            <Table
              columns={column}
              initialData={list}
              setFilter={setFilter}
              api
            />
            ;
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Pagination filter={{ ...filter, totalCount }} setFilter={setFilter} />
      </div>
      {/* Table */}
    </div>
  );
};

export default Listing;
