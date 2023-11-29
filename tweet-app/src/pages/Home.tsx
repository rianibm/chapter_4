import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define TypeScript interfaces for User and Tweet entities
interface UserEntity {
  id: number;
  name: string;
  email: string;
  profile_picture_url: string;
}

interface TweetEntity {
  id: number;
  content: string;
  user: UserEntity;
}

// Base URL for the tweets API
const tweetsApiBaseUrl = "http://localhost:8082";

// Home component
const Home = () => {
  // State variables for tweets, login status
  const [tweets, setTweets] = useState<TweetEntity[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch tweets and check login status on component mount
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        // Fetch tweets from the API
        const response = await fetch(`${tweetsApiBaseUrl}/api/tweets`);
        const { data } = await response.json();

        // Update the state with fetched tweets
        setTweets(data.tweets);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    const checkIsLoggedIn = () => {
      // Check if the user is logged in by checking the presence of an access token in localStorage
      const accessToken = localStorage.getItem("access_token");
      setIsLoggedIn(!!accessToken);
    };

    // Call the functions to fetch tweets and check login status
    fetchTweets();
    checkIsLoggedIn();
  }, []);

  // Logout handler
  const logoutHandler = () => {
    // Remove access token from localStorage and update login status
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
  };

  // JSX structure of the Home component
  return (
    <div className="flex w-full bg-gray-300 place-content-center min-h-screen">
      <div className="w-[600px] bg-gray-200 p-5">
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl">Home</h1>
          {/* Conditional rendering of login/logout button */}
          {isLoggedIn ? (
            <button
              className="py-2 px-3 bg-black text-white rounded-lg"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="py-2 px-3 bg-black text-white rounded-lg">
                Login
              </button>
            </Link>
          )}
        </div>

        <div className="mt-[30px]">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">List Tweet</h1>
            {/* Link to the create-tweet page */}
            <Link to="/create-tweet">
              <button className="py-2 px-3 text-white rounded-lg">
                {/* PlusCircleIcon for creating a new tweet */}
                <PlusCircleIcon className="w-8 h-8 text-black" />
              </button>
            </Link>
          </div>

          <div className="mt-[10px]">
            {/* Conditional rendering based on the existence of tweets */}
            {tweets.length ? null : <div>Data kosong</div>}

            {/* Mapping through tweets and displaying content */}
            {tweets.map((tweet) => (
              <div key={tweet.id} className="mt-3">
                <h3>{tweet.content}</h3>
                <p>
                  Dibuat oleh <strong>{tweet.user.name}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Home component
export default Home;
