const Header = ({ column = [] }) => {
  return (
    <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
      <tr>
        {column.map(({ header }) => {
          return (
            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold text-left">{header}</div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default Header;
