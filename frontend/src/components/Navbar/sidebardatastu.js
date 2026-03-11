// Filename - components/SidebarData.js

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import { MdPostAdd } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";

export const Sidebardatastu = [
    {
        title: "Request Certificate",
        path: "/certireq",
        icon: <PiStudentFill/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        
    },
    {
        title: "View Certificate",
        path: "/mycerti",
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: "Send Certificate",
        path: "/sendcerti",
        icon: <IoIosPeople/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
];
