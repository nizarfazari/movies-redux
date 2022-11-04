import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Modals from "../Modals/Modals";

import "./navbar.css";

const Navbars = () => {
  const navigate = useNavigate();
  const [log, setShowLog] = useState(false);
  const [reg, setShowReg] = useState(false);
  const [datas, setDatas] = useState([]);

  const loginHandleClose = () => setShowLog(false);
  const loginHandleShow = () => setShowLog(true);
  const registerHandleClose = () => setShowReg(false);
  const registerHandleShow = () => setShowReg(true);

  const getDataGoogle = () => {
    const data = JSON.parse(localStorage.getItem("profile"));
    setDatas(data);
  };

  useEffect(() => {
    datas && getDataGoogle();
  }, []);

  const searchButton = async (e) => {
    e.preventDefault();
    let data = e.target[0].value;

    navigate(`/search/${data}`);
  };

  return (
    <nav>
      <div className="wrapper flex justify-between items-center container mx-auto">
        <div className="logos">
          <svg width="198" height="32" viewBox="0 0 99 16" fill="none" className="logo cursor-pointer" xmlns="http://www.w3.org/2000/svg" onClick={() => navigate("/")}>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M50.9948 15.7635H47.251V3.94089H50.9948V15.7635ZM51.0933 2.75862H47.1524V0H51.0933V2.75862ZM27.3136 6.6601C29.3432 6.6601 29.5599 6.97537 29.5599 9.85222C29.5599 12.7291 29.3432 13.0443 27.3136 13.0443C25.2841 13.0443 25.0673 12.7291 25.0673 9.85222C25.0673 6.97537 25.2841 6.6601 27.3136 6.6601ZM21.1264 9.85222C21.1264 14.7783 22.3678 16 27.3136 16C32.2594 16 33.5008 14.7783 33.5008 9.85222C33.5008 4.92611 32.2594 3.70443 27.3136 3.70443C22.3678 3.70443 21.1264 4.92611 21.1264 9.85222ZM46.456 3.94089H42.7319L40.1506 13.0049H40.0324L37.6875 3.94089H33.8058L37.0767 15.7635H42.8501L46.456 3.94089ZM64.1929 12H60.252C60.252 12.9852 59.858 13.2414 58.3013 13.2414C56.6855 13.2414 56.3112 12.9852 56.2323 10.9163H64.2915V9.08374C64.1929 4.78818 62.9516 3.70443 58.2816 3.70443C53.4737 3.70443 52.2717 4.92611 52.2717 9.85222C52.2717 14.7783 53.4737 16 58.2816 16C62.9318 16 64.1141 15.1921 64.1929 12ZM56.252 8.15764C56.39 6.6601 56.8432 6.46305 58.3013 6.46305C60.0353 6.46305 60.3112 6.64039 60.3506 8.15764H56.252ZM69.216 11.4089C69.216 12.3153 69.3736 12.4138 70.7727 12.4138V15.7635H68.6249C66.083 15.7635 65.4525 15.1133 65.4722 12.532V0H69.216V11.4089ZM72.0462 15.7635H75.7901V3.94089H72.0462V15.7635ZM71.9477 2.75862H75.8886V0H71.9477V2.75862ZM80.8108 11.803V12.0591C80.8108 13.1232 81.0276 13.2414 83.0374 13.2414C84.9488 13.2414 85.1655 13.1429 85.1655 12.335C85.1655 11.7438 84.6138 11.4877 82.3675 11.0739C78.3478 10.2857 77.3429 9.53695 77.3429 7.27094C77.3429 4.41379 78.5054 3.70443 83.136 3.70443C87.668 3.70443 88.8109 4.51232 88.8109 7.70443V8.05911H85.067V7.70443C85.067 6.58128 84.87 6.46305 83.136 6.46305C81.4611 6.46305 81.2838 6.56158 81.2838 7.38916C81.2838 7.94089 81.6187 8.11823 82.9192 8.31527C87.865 9.12315 89.1064 9.99015 89.1064 12.6108C89.1064 15.33 87.9044 16 83.136 16C78.2887 16 77.067 15.2118 77.067 12.0591V11.803H80.8108ZM98.3655 12.4138H96.3754C95.1537 12.4138 95.0157 12.2562 95.0157 10.8177V7.0936H98.1685V3.94089H95.0157V1.41872H91.4689V3.94089H90.0896V7.0936H91.2719V11.7833C91.2719 14.9754 92.2177 15.7635 96.001 15.7635H98.3655V12.4138ZM6.96294 15.7635L4.65752 4.33497V0.394088H7.88905L10.1945 11.8227H10.3521L12.6772 0.394088H19.9482V15.7635H15.8102V4.33497H15.692L13.3669 15.7635H6.96294ZM0 0.392189H1.37798V1.03291H2.75586V0.392284H4.13384V1.03291H4.13395V2.31381H4.13384V3.59502H4.13395V4.87592H4.13384V6.1583H4.13395V7.43921H4.13384V8.71963H4.13395V10.0005H4.13384V11.2821H4.13395V12.563H4.13384V13.8446H4.13395V15.1255H4.13384V15.7663H2.75586V15.1255H1.37798V15.7662H0V15.1255V13.8446V12.563V11.2821V10.0005V8.71963V7.43921V6.1583V4.87592V3.59502V2.31381V1.03291V0.392189ZM1.37798 3.59502V2.31381H2.75586V3.59502H1.37798ZM1.37798 4.87592V6.1583H2.75586V4.87592H1.37798ZM1.37798 8.71963V7.43921H2.75586V8.71963H1.37798ZM1.37798 10.0005V11.2821H2.75586V10.0005H1.37798ZM1.37798 13.8446V12.563H2.75586V13.8446H1.37798Z"
              fill="#F33F3F"
            />
          </svg>
        </div>
        <form className="" onSubmit={(e) => searchButton(e)}>
          <div className="nav-search relative w-80 flex ">
            <input className="py-2 pl-5  rounded-3xl " type="text" placeholder="What do you want to watch?" name="search" />
            <AiOutlineSearch className="icon absolute" />
          </div>
        </form>
        <div className="nav-buttons flex gap-x-2">
          {localStorage.getItem("token") ? (
            <Dropdown>
              {localStorage.getItem("profile") ? (
                <Dropdown.Toggle id="dropdown-basic">
                  <div className="flex items-center">
                    <span className="w-10 ">{datas.imageUrl ? <img className="rounded-full" src={datas.imageUrl} alt="" /> : <img className="rounded-full" src={`https://ui-avatars.com/api/?name=${datas.imageUrl}`} alt="" />}</span>
                    <span>
                      <h1 className="hidden sm:block text-white ml-3 text-lg">{datas.givenName}</h1>
                    </span>
                  </div>
                </Dropdown.Toggle>
              ) : (
                <Dropdown.Toggle id="dropdown-basic">
                  <div className="flex items-center">
                    <span className="w-10 ">{datas.image ? <img className="rounded-full" src={datas.image} alt="" /> : <img className="rounded-full" src={`https://ui-avatars.com/api/?name=${datas.image}`} alt="" />}</span>
                    <span>
                      <h1 className="hidden sm:block text-white ml-3 text-lg">
                        {datas.first_name} {datas.last_name}
                      </h1>
                    </span>
                  </div>
                </Dropdown.Toggle>
              )}

              <Dropdown.Menu className="mt-2">
                <Dropdown.Item href="#/action-1">Edit Profile</Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <button className="button-border rounded-3xl px-6 py-2" onClick={loginHandleShow}>
                Login
              </button>
              <button className="button-full rounded-3xl px-6 py-2 font-medium" onClick={registerHandleShow}>
                Register
              </button>
            </>
          )}
          <Modals loginHandleClose={loginHandleClose} log={log} getDataGoogle={getDataGoogle} />
          <Modals registerHandleClose={registerHandleClose} reg={reg} />
        </div>
      </div>
    </nav>
  );
};

export default Navbars;
