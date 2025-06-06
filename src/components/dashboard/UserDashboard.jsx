import { Link } from "react-router-dom";

const menuItems = [
  {
    label: "BMI Calculator",
    path: "/home/bmi-calculator",
    icon: "fitness-outline",
  },
  {
    label: "Water Intake",
    path: "/home/water-intake",
    icon: "water-outline",
  },
  {
    label: "All Workouts",
    path: "/home/workouts",
    icon: "search-outline",
  },
  {
    label: "Workout Plan",
    path: "/home/myworkouts",
    icon: "barbell-outline",
  },
  {
    label: "Goals",
    path: "/home/goals",
    icon: "flag-outline",
  },
  {
    label: "Progress Reports",
    path: "/home/progress-reports",
    svg: (
      <svg
        className="fill-current mt-4 mb-2"
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_130_9801)">
          <path
            d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
            fill=""
          />
          <path
            d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
            fill=""
          />
        </g>
        <defs>
          <clipPath id="clip0_130_9801">
            <rect
              width="18"
              height="18"
              fill="white"
              transform="translate(0 0.052124)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    label: "Workout Recommendation",
    path: "/home/weather",
    icon: "sunny-outline",
  },
  {
    label: "FAQ",
    path: "/home/faq",
    icon: "help-circle-outline",
  },
  {
    label: "Feedback",
    path: "/home/feedback",
    icon: "chatbubble-outline",
  },
];

export default function UserDashboard() {
  return (
    <>
      <h5 className="text-lg text-center text-bold">
        Welcome to Fitness Software!
      </h5>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6 flex flex-col items-center text-center border border-blue-100 hover:bg-blue-50">
              <div className="text-blue-600 text-4xl mb-3">
                {item?.svg ? item.svg : <ion-icon name={item.icon}></ion-icon>}
              </div>
              <h3 className="text-xl font-semibold text-blue-900">
                {item.label}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
