import { NavLink } from "react-router-dom";
import Logo from "../logo/Logo";

function SideNavUser() {
  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 translate-x-0 bg-blue-900`}
    >
      <div className="flex items-center justify-between gap-2 px-6 pt-6 lg:py-6.5">
        <h2 className="mb-4 ml-4 text-lg font-semibold text-bodydark2">
          <Logo />
        </h2>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/home/bmi-calculator"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-blue-800 dark:hover:bg-meta-4 
                    bg-blue-900 dark:bg-meta-4
                  `}
                >
                  <ion-icon
                    name="calculator-outline"
                    aria-label="bmi-calculator"
                  ></ion-icon>
                  BMI Calculator
                </NavLink>
              </li>

              <li>
                <NavLink
                  aria-label="water-intake"
                  to="/home/water-intake"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-blue-800 dark:hover:bg-meta-4 
                    bg-blue-900 dark:bg-meta-4
                  `}
                >
                  <ion-icon
                    name="water-outline"
                    aria-label="water-intake"
                  ></ion-icon>
                  <span>Water Intake</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/home/workouts"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-blue-800 dark:hover:bg-meta-4 bg-blue-900 dark:bg-meta-4`}
                >
                  <ion-icon
                    name="search-outline"
                    aria-label="search-workout"
                  ></ion-icon>
                  All Workouts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home/myworkouts"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-blue-800 dark:hover:bg-meta-4 bg-blue-900 dark:bg-meta-4
                  `}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9756)">
                      <path
                        d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9756">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Workout Plan
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/home/feedback"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-blue-800 dark:hover:bg-meta-4 bg-blue-900 dark:bg-meta-4`}
                >
                  <ion-icon
                    name="chatbubble-outline"
                    aria-label="feedback"
                  ></ion-icon>
                  Feedback
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default SideNavUser;
