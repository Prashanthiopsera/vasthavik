// Filename - components/SidebarData.js

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import { MdPostAdd } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";

export const SidebarData = [
    {
        title: "Add Student",
        path: "/addstud",
        icon: <PiStudentFill/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        
    },
    {
        title: "View All Requests",
        path: "/viewreq",
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: "View All Students",
        path: "/viewstud",
        icon: <IoIosPeople/>,
    },
    {
        title: "View All Certificates",
        path: "/verifycerti",
        icon: <IoIosPeople/>,
    },
    {
        title: "Issue Certificates",
        path: "/issuecerti",
        icon: <MdPostAdd />,

        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
];
