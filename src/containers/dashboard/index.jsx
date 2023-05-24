import React from "react";
import WelcomeBanner from "../../components/welcomeBanner";
import DashboardCard06 from "./component/sexmatrix";
import DashboardCard07 from "./component/matrix";

// const Dashboard = () => {
//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
//       {/* Welcome banner */}
//       <WelcomeBanner />

//       {/* Cards */}
//       <div className="grid grid-cols-12 gap-6">
//         {/* Doughnut chart (Top Countries) */}
//         <DashboardCard06 />
//         {/* Table (Top Channels) */}
//         <DashboardCard07 />
//       </div>
//     </div>
//   );
// };
const Dashboard = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <WelcomeBanner />
      <div className="grid grid-cols-12 gap-6">
        {/* <DashboardCard06 /> */}
        <DashboardCard07 />
      </div>
    </div>
  );
};

export default Dashboard;
