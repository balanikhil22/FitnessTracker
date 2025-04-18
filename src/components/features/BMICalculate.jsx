import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase/firebase";
import { useAuth } from "../../contexts/authContext";

const BMICalculate = () => {
  const { currentUser } = useAuth();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBMICategory] = useState("");

  useEffect(() => {
    if (currentUser?.uid) {
      const userRef = ref(database, `users/${currentUser.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data?.weight && data?.height) {
          setWeight(data.weight);
          setHeight(data.height);
        }
      });
    }
  }, [currentUser]);

  const calculateBMI = (weight, height) => {
    return (weight / Math.pow(height / 100, 2)).toFixed(2);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      return "Overweight";
    } else {
      return "Obesity";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (weight && height) {
      const calculatedBMI = calculateBMI(weight, height);
      const category = getBMICategory(calculatedBMI);
      setBMI(calculatedBMI);
      setBMICategory(category);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black">BMI Calculator</h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-7">
              <div className="mb-5">
                <label className="mb-3 block text-black" htmlFor="weight">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight in kg"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-black" htmlFor="height">
                  Height (cm)
                </label>
                <input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter your height in cm"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input "
                  required
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center text-white rounded bg-blue-900 p-3 font-medium hover:bg-opacity-90"
              >
                Calculate BMI
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {bmi && (
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-7">
              <h3 className="font-medium text-black">Your BMI Result</h3>
              <div className="mt-4 text-center">
                <p className="text-4xl font-bold text-primary">{bmi}</p>
                <p className="mt-2 text-lg text-black">
                  BMI Category:{" "}
                  <span className="font-semibold text-secondary">
                    {bmiCategory}
                  </span>
                </p>
                <div className="mt-4">
                  <p className="text-sm text-blue500 dark:text-blue400">
                    BMI Chart:
                  </p>
                  <div className="flex justify-between mt-2">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        bmi < 18.5 ? "bg-blue-300" : ""
                      }`}
                    >
                      Underweight
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full ${
                        bmi >= 18.5 && bmi < 24.9 ? "bg-green-300" : ""
                      }`}
                    >
                      Normal
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full ${
                        bmi >= 25 && bmi < 29.9 ? "bg-yellow-300" : ""
                      }`}
                    >
                      Overweight
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full ${
                        bmi >= 30 ? "bg-blue-300" : ""
                      }`}
                    >
                      Obesity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BMICalculate;
