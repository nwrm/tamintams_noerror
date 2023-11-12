import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import styled from "styled-components";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [showNotice, setShowNotice] = useState(false); // 모달 상태 관리

  // 네비게이션바 열기 함수
  const showSidebar = () => setSidebar(!sidebar);

  // 네비게이션바 닫기 함수
  const closeSidebar = () => {
    setSidebar(false);
  };

  // 모달 열기 함수
  const openNotice = () => {
    setShowNotice(true);
  };

  // 모달 닫기 함수
  const closeNotice = () => {
    setShowNotice(false);
    setSidebar(false);
  };

  return (
    <>
      {/* 네비게이션 바 열기 버튼 */}
      <Link to="#" className="menu-button">
        {/* FaBars 아이콘을 클릭하면 showSidebar 함수 호출 */}
        <FaIcons.FaBars onClick={showSidebar} />
      </Link>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-width">
          {/* 네비게이션 바 닫기 버튼 */}
          <li className="navbar-toggle">
            <Link to="#" className="menu-button">
              <AiIcons.AiOutlineClose onClick={closeSidebar} />
            </Link>
          </li>
          {/* SidebarData 배열을 반복하며 네비게이션 바 메뉴 아이템 생성 */}
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                {/* 메뉴 아이템 클릭 시 해당 경로로 이동 */}
                <Link
                  to={item.path}
                  onClick={() => {
                    if (item.title === "공지사항") {
                      openNotice();
                    }
                  }}
                >
                  {" "}
                  <div className="Space">
                    {/* 아이콘 표시 */}
                    {item.icon}
                  </div>
                  {/* 메뉴 이름 표시 */}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* 네비게이션 바가 열려있을 때만 어두운 배경인 Dark를 불러옴 */}
      {sidebar && <div className="Dark"></div>}
      {/* Notice 모달 */}
      {showNotice && (
        <div className="black-square">
          <span className="notice-title">공지사항</span>
          <div className="white-square">
            <Notice />
            <button onClick={closeNotice} className="close-button">
              네, 모두 읽고 확인하였습니다.
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

// 공지사항 그림을 불러오는 스타일드 컴포넌트

const Notice = styled.div`
  background-image: url("/img/notice.png");
  background-repeat: no-repeat;
  background-size: contain;
  padding: 350px;
  margin-top: 30px;
`;
