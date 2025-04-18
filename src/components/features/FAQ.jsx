import { useEffect, useState } from "react";
import { ref, push, onValue, update, get } from "firebase/database";
import { database } from "../../firebase/firebase";
import { useAuth } from "../../contexts/authContext";
import { useLocation } from "react-router-dom"; // To access the current URL

const FaqPage = () => {
  const { currentUser } = useAuth();
  const location = useLocation(); // Get current URL
  const [user, setUser] = useState(null); // To store user data
  const [question, setQuestion] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Determine the table to fetch user data from based on URL
    const userRef = location.pathname.includes("/home/faq")
      ? ref(database, "users") // If URL contains /home/faq, fetch from 'users'
      : ref(database, "admins"); // Else fetch from 'admins'

    // Fetch user data from the respective table
    if (currentUser) {
      get(userRef).then((snapshot) => {
        const usersData = snapshot.val();
        if (usersData) {
          const userId = Object.keys(usersData).find(
            (key) => usersData[key].email === currentUser.email
          );
          if (userId) {
            setUser(usersData[userId]);
          }
        }
      });
    }

    // Fetch FAQs from 'queries' table
    const faqRef = ref(database, "queries");
    onValue(faqRef, (snapshot) => {
      const data = snapshot.val();
      const loadedFaqs = [];
      for (const key in data) {
        const { question, answer, userEmail } = data[key];
        loadedFaqs.push({ id: key, question, answer, userEmail });
      }
      setFaqs(loadedFaqs.reverse());
    });
  }, [currentUser, location]);

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      await push(ref(database, "queries"), {
        question,
        answer: "",
        userEmail: currentUser.email,
      });
      setQuestion("");
      alert("Submitted!", "Your question has been submitted.", "success");
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Error", "Could not submit question.", "error");
    }
  };

  const handleAnswerSubmit = async (id) => {
    const answerText = answers[id];
    if (!answerText || !answerText.trim()) return;

    try {
      await update(ref(database, `queries/${id}`), {
        answer: answerText,
      });
      alert("Success", "Answer submitted successfully.", "success");
      setAnswers((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Error", "Could not submit answer.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="text-center mb-6">
        <ion-icon
          name="help-circle-outline"
          className="text-4xl text-blue-600"
        ></ion-icon>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600">
          {user?.role === "admin"
            ? "Answer user queries below."
            : "Ask your questions or browse answered ones below."}
        </p>
      </div>

      {/* Ask a Question Form (for normal users) */}
      {user?.role !== "admin" && (
        <form onSubmit={handleSubmitQuestion} className="mb-8">
          <label className="block text-black font-medium mb-2">
            Have a question?
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows={3}
            required
          />
          <button
            type="submit"
            className="mt-3 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit Question
          </button>
        </form>
      )}

      {/* Display FAQs */}
      {faqs.length === 0 ? (
        <p className="text-gray-500 text-center">No questions found.</p>
      ) : (
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="p-5 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                <ion-icon
                  name="chatbubble-ellipses-outline"
                  className="text-xl text-blue-500"
                ></ion-icon>
                Q{index + 1}: {faq.question}
              </h3>

              {faq.answer ? (
                <p className="mt-2 text-gray-800">
                  <span className="font-medium text-green-600">Answer:</span>{" "}
                  {faq.answer}
                </p>
              ) : user?.role === "admin" ? (
                <div className="mt-3">
                  <textarea
                    rows={2}
                    placeholder="Write your answer..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={answers[faq.id] || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [faq.id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    onClick={() => handleAnswerSubmit(faq.id)}
                    className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
                  >
                    Submit Answer
                  </button>
                </div>
              ) : (
                <p className="mt-2 italic text-gray-500">No answer yet.</p>
              )}

              <p className="text-xs text-gray-500 mt-1">
                Asked by: {faq.userEmail}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaqPage;
