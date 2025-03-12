import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; 
import { useContext } from "react";
import { NavbarContext } from "../context/navbarContext";
import { LoginContext } from "../context/loginContext";

interface NavBarProps {
  openInfo?: string; 
}

function NavBar({ openInfo = "" }: NavBarProps) {
  let navigate = useNavigate();

  type DropdownState = {
    admin: boolean;
    academicOffice: boolean;
    examOffice: boolean;
    courseInstructor: boolean;
    invigilator: boolean;
    configuration: boolean;
  };
  useEffect(() => {
    if (openInfo === "admin") {
      setDropdownOpen((prev) => ({ ...prev, admin: true }));
    } else if (openInfo === "academicOffice") {
      setDropdownOpen((prev) => ({ ...prev, academicOffice: true }));
    } else if (openInfo === "examOffice") {
      setDropdownOpen((prev) => ({ ...prev, examOffice: true }));
    } else if (openInfo === "courseInstructor") {
      setDropdownOpen((prev) => ({ ...prev, courseInstructor: true }));
    } else if (openInfo === "invigilator") {
      setDropdownOpen((prev) => ({ ...prev, invigilator: true }));
    } else if (openInfo === "configuration") {
      setDropdownOpen((prev) => ({ ...prev, configuration: true }));
    }
  }, [openInfo]);

  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
    admin: false,
    academicOffice: false,
    examOffice: false,
    courseInstructor: false,
    invigilator: false,
    configuration: false
  });

  const toggleDropdown = (section: keyof DropdownState) => {
    setDropdownOpen({
      admin: false,
      academicOffice: false,
      examOffice: false,
      courseInstructor: false,
      invigilator: false,
      configuration: false,
      [section]: !dropdownOpen[section],
    });
  };

  const { navitem, setNavItem } = useContext(NavbarContext);
  const [target, setTarget] = useState<string>("");

  const [col, setcol] = useState<boolean>(false);

  const logstat = useContext(LoginContext);

  const handleLogout = () => {
    logstat.setIsLoggedIn(false);
    sessionStorage.clear();
    console.log("session storage length", sessionStorage.length);
    navigate("/");
    console.log("is logged in", logstat.isLoggedIn);
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ height: "100vh", width: "319px" }}
    >
      <div
        className="d-flex flex-column col-xs-2"
        style={{ background: "#074E85", height: "90vh", width: "319px" }}
      >
        <div className="my-2">
          <p className="text-center mt-2">
            <img
              src="/images/iiit_logo.png"
              className="border rounded-circle p-2 w-25 h-25"
              alt=""
            />
          </p>
          <p style={{ textAlign: "center", color: "white" }}>
            International Institute of <br /> Information Technology
            <br />
            Bangalore
          </p>
        </div>

        <hr className="border border-light w-100 m-1" />

        <div className="d-flex flex-column navbar navbar-nav-scroll">
          <div>
            <ul
              className="text-start d-flex flex-column h-75 gap-0 mx-4 navbar-nav"
              style={{ fontSize: "16px", color: "white" }}
            >
              <li className="nav-item">
                <p
                  className="btn dropdown-heading"
                  onClick={() => {
                    toggleDropdown("admin");
                    setNavItem("admin");
                  }}
                  style={{
                    color: "white",
                    backgroundColor: `${navitem === "admin" ? "#509CDB" : ""}`,
                  }}
                >
                  <i className="fa-sharp fa-solid fa-graduation-cap"></i>{" "}
                  Administration
                </p>
                {dropdownOpen.admin && (
                  <ul className="dropdown-list">
                    <li>
                      <p
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("user");
                        }}
                        onMouseLeave={() => {
                          setcol(false);
                        }}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "user" ? "#509CDB" : ""
                          }`,
                        }}
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/user")}
                      >
                        <i className="fa-regular fa-user"></i> User
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/batch")}
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("batch");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "batch" ? "#509CDB" : ""
                          }`,
                        }}
                      >
                        <i className="fa-regular fa-calendar"></i> Batch
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/room")}
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("room");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "room" ? "#509CDB" : ""
                          }`,
                        }}
                      >
                        <i className="fa-regular fa-calendar"></i> Room
                      </p>
                    </li>

                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/course")}
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("course");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "course" ? "#509CDB" : ""
                          }`,
                        }}
                      >
                        <i className="fa-regular fa-calendar"></i> Course
                      </p>
                    </li>

                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/term")}
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("term");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "term" ? "#509CDB" : ""
                          }`,
                        }}
                      >
                        <i className="fa-regular fa-calendar"></i> Term
                      </p>
                    </li>


                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/termCourse")}
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("termCourse");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "termCourse" ? "#509CDB" : ""
                          }`,
                        }}
                      >
                        <i className="fa-regular fa-calendar"></i> Term Course
                      </p>
                    </li>

                    
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/examType")}
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("examtyp");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "examtyp" ? "#509CDB" : ""
                          }`,
                        }}
                      >
                        <i className="fa-regular fa-calendar"></i> Exam Type
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/examMode")}
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("exammod");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "exammod" ? "#509CDB" : ""
                          }`,
                        }}
                      >
                        <i className="fa-regular fa-calendar"></i> Exam Mode
                      </p>
                    </li>

                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("gradeScale");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${col && target === "gradeScale" ? "#509CDB" : ""}`,
                        }}
                        onClick={() => navigate("/grade-scale")}
                      >
                        <i className="fa-solid fa-scale-balanced"></i> Grade Scale
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/specialization-student-mapping")}
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("specStudentMapping");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${col && target === "specStudentMapping" ? "#509CDB" : ""}`,
                        }}
                      >
                        <i className="fa-solid fa-users-gear"></i> Specialization-Student
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/academic")}
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("academic");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "academic" ? "#509CDB" : ""
                          }`,
                        }}
                      >
                        <i className="fas fa-graduation-cap me-2"></i> Academic Year
                      </p>
                    </li>
                  </ul>
                )}
              </li>

              <br />

              {/* Academic Office Section - Added between Admin and Exam Office */}
              <li className="nav-item">
                <p
                  className="btn dropdown-heading"
                  onClick={() => {
                    toggleDropdown("academicOffice");
                    setNavItem("acadoff");
                  }}
                  style={{
                    color: "white",
                    backgroundColor: `${navitem === "acadoff" ? "#509CDB" : ""}`,
                  }}
                >
                  <i className="fa-solid fa-graduation-cap"></i> Academic Office
                </p>
                {dropdownOpen.academicOffice && (
                  <ul className="dropdown-list">
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("specialization");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "specialization" ? "#509CDB" : ""
                          }`,
                        }}
                        onClick={() => navigate("/academic-office/specialization")}
                      >
                        <i className="fa-solid fa-book"></i> Specialization
                      </p>
                    </li>
                  </ul>
                )}
              </li>

              <br />

              <li className="nav-item">
                <p
                  className="btn dropdown-heading"
                  onClick={() => {
                    toggleDropdown("examOffice");
                    setNavItem("xamoff");
                  }}
                  style={{
                    color: "white",
                    backgroundColor: `${navitem === "xamoff" ? "#509CDB" : ""}`,
                  }}
                >
                  <i className="fa-solid fa-book"></i> Exam Office
                </p>
                {dropdownOpen.examOffice && (
                  <ul className="dropdown-list">
                    <li onClick={() => navigate("/schedule")}>
                      <p
                        className="btn my-auto ps-5"
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("xamsched");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "xamsched" ? "#509CDB" : ""
                          }`,
                        }}
                      >
                        <i className="fa-regular fa-calendar"></i> Exam
                        Scheduling
                      </p>
                    </li>
                  </ul>
                )}
              </li>

              <br />

              <li
                className=" btn nav-item dropdown-heading"
                onClick={() => {
                  navigate("/progCord");
                  setNavItem("progcord");
                }}
                style={{
                  backgroundColor: `${navitem === "progcord" ? "#509CDB" : ""}`,
                }}
              >
                <p style={{ color: "white" }}>
                  <i className="fa-solid fa-sheet-plastic"></i> Programme
                  Co-ordinator
                </p>
              </li>

              <br />

              <li className="nav-item">
                <p
                  className=" btn dropdown-heading"
                  onClick={() => {
                    toggleDropdown("courseInstructor");
                    setNavItem("coursinst");
                  }}
                  style={{
                    color: "white",
                    backgroundColor: `${
                      navitem === "coursinst" ? "#509CDB" : ""
                    }`,
                  }}
                >
                  <i className="fa-solid fa-chalkboard-user"></i> Course
                  Instructor
                </p>
                {dropdownOpen.courseInstructor && (
                  <ul className="dropdown-list">
                    <li>
                      <p
                        className="btn m-0 ps-5"
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("uploadgrad");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "uploadgrad" ? "#509CDB" : ""
                          }`,
                        }}
                        onClick={() => navigate("/uploadGrade")}
                      >
                        <i className="fa-solid fa-chalkboard-user"></i> Upload
                        Grades
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn m-0 ps-5"
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("issuerepo");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "issuerepo" ? "#509CDB" : ""
                          }`,
                        }}
                        onClick={() =>
                          navigate("/coursesList?redirectedPage=issuereporting")
                        }
                      >
                        <i className="fa-solid fa-chalkboard-user"></i> Issue
                        Reporting
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn m-0 ps-5"
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("xammodeupd");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "xammodeupd" ? "#509CDB" : ""
                          }`,
                        }}
                        onClick={() => navigate("/exammodelupdate")}
                      >
                        <i className="fa-solid fa-chalkboard-user"></i> Exam
                        Mode Update
                      </p>
                    </li>
                  </ul>
                )}
              </li>

              <br />

              <li className="nav-item">
                <p
                  className="btn dropdown-heading"
                  onClick={() => {
                    toggleDropdown("invigilator");
                    setNavItem("invig");
                  }}
                  style={{
                    color: "white",
                    backgroundColor: `${navitem === "invig" ? "#509CDB" : ""}`,
                  }}
                >
                  <i className="fa-solid fa-person"></i> Invigilator
                </p>
                {dropdownOpen.invigilator && (
                  <ul className="dropdown-list">
                    <li>
                      <p
                        className="btn m-0 ps-5"
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("attend");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "attend" ? "#509CDB" : ""
                          }`,
                        }}
                        onClick={() =>
                          navigate("/attendence")
                        }
                      >
                        <i className="fa-solid fa-chalkboard-user"></i>{" "}
                        Attendance
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn m-0 ps-5"
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("incirepo");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${
                            col && target === "incirepo" ? "#509CDB" : ""
                          }`,
                        }}
                        onClick={() =>
                          navigate("/coursesList?redirectedPage=incident")
                        }
                      >
                        <i className="fa-solid fa-chalkboard-user"></i> Incident
                        Reporting
                      </p>
                    </li>
                  </ul>
                )}
              </li>

              <br />
              <li className="nav-item">
                <p
                  className="btn dropdown-heading"
                  onClick={() => {
                    toggleDropdown("configuration");
                    setNavItem("config");
                  }}
                  style={{
                    color: "white",
                    backgroundColor: `${navitem === "config" ? "#509CDB" : ""}`,
                  }}
                >
                  <i className="fa-solid fa-cog"></i> Configuration
                </p>
                {dropdownOpen.configuration && (
                  <ul className="dropdown-list">
                    <li>
                      <p
                        className="btn m-0 ps-5"
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("role");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${col && target === "role" ? "#509CDB" : ""
                            }`,
                        }}
                        onClick={() =>
                          navigate("/role")
                        }
                      >
                        <i className="fa-solid fa-chalkboard-user"></i>{" "}
                        Role
                      </p>
                    </li>
                    <li className="multi-line-list-ele">
                      <p
                        className="btn m-0 ps-5"
                        onMouseEnter={() => {
                          setcol(true);
                          setTarget("roleresmap");
                        }}
                        onMouseLeave={() => setcol(false)}
                        style={{
                          color: "white",
                          backgroundColor: `${col && target === "roleresmap" ? "#509CDB" : ""
                            }`,
                        }}
                        onClick={() =>
                          navigate("/role-resource-mapping")
                        }
                      >
                        <i className="fa-solid fa-chalkboard-user"></i> {" "}
                        Role Resource
                        <p style={{ marginLeft: "-0.75rem" }}>Mapping</p>
                      </p>
                    </li>
                  </ul>
                )}
              </li>
              <br />
            </ul>
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-row justify-content-around"
        style={{ backgroundColor: "#070241", height: "10vh" }}
      >
        <div className="ms-3 mt-2" style={{ color: "white" }}>
          <p className="mb-0 fw-bold">Application Admin</p>
          <p>application@iiitb.in</p>
        </div>
        <i
          onClick={handleLogout}
          className="fa-solid fa-right-from-bracket fa-2x mb-4 fs-4"
          style={{
            color: "white",
            transform: "rotate(180deg)",
            cursor: "pointer",
          }}
        ></i>
      </div>
    </div>
  );
}

export default NavBar;
