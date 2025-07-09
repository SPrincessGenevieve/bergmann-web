import {
  Bot,
  ChartGantt,
  ChartLine,
  FileCog,
  LayoutDashboard,
} from "lucide-react";

export const sidebar_items = [
  {
    title: "Welcome",
    icon: LayoutDashboard,
    link: "/green-future/welcome",
    sub_item: [],
  },
  {
    title: "Analytics",
    icon: ChartGantt,
    sub_item: [
      {
        title: "Machines",
        icon: Bot,
        link: "green-future/analytics/machines",
      },
      {
        title: "Profitability",
        icon: ChartLine,
        link: "green-future/analytics/profitability",
      },
    ],
  },
  {
    title: "Maintenance",
    icon: FileCog,
    link: "/green-future/maintenance",
    sub_item: [],
  },
];
