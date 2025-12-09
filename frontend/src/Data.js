import { FormatPrice } from "./Formatter";
import {
  FaChartBar,
  FaUsers,
  FaPlayCircle,
  FaBook,
  FaPage4,
} from "react-icons/fa";

export const filtersData = [
  {
    label: "Customer Region",
  },
  {
    label: "Gender",
  },
  {
    label: "Age Range",
  },
  {
    label: "Product Category",
  },
  {
    label: "Tags",
  },
  {
    label: "Payment Method",
  },
  {
    label: "Date",
  },
];

export const StatData = [
  {
    label: "Total units Sold",
    secondaryLabel: 10,
  },
  {
    label: "Total Amount",
    secondaryLabel: FormatPrice(89000),
  },
  {
    label: "Total Discount",
    secondaryLabel: FormatPrice(15000),
  },
];

export const DropDownData = [
  {
    label: "DashBoard",
    icon: FaChartBar,
  },
  {
    label: "Nexus",
    icon: FaUsers,
  },
  {
    label: "Intake",
    icon: FaPlayCircle,
  },
  {
    label: "Services",
    icon: FaBook,
  },
  {
    label: "Invoices",
    icon: FaPage4,
  },
];
