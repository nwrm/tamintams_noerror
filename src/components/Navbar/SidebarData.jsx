import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "공지사항",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-button",
  },
  {
    title: "회의실 예약",
    path: "/mypage",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-button",
  },
  {
    title: "로그아웃",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-button",
  },
];
