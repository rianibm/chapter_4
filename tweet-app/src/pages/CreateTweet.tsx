import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// Define the base URL for the tweets API
const tweets_api_base_url = "http://localhost:5173";

// CreateTweet component with TypeScript
const CreateTweet: React.FC = () => {
  // Initialize state for the tweet content and navigation
  const [content, setContent] = useState<string>("");

  // Access the navigation function from react-router-dom
  const navigate = useNavigate();

  // Event handler for updating the content state on input change
  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a payload with the content to be sent to the server
    const payload = { content };

    try {
      // Send a POST request to the tweets API
      const response = await fetch(`${tweets_api_base_url}/api/tweets`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(payload),
      });

      // Parse the JSON response
      const responseJson = await response.json();

      // Check if the response status is not 201 (error status)
      if (response.status !== 201) {
        alert(`Error: ${responseJson.message}`);
      } else {
        // If create tweet succeeds, redirect to the home page
        navigate("/");
      }
    } catch (error) {
      // Log and display an error message in case of an unexpected error
      console.error("Error creating tweet:", error);
      alert("An unexpected error occurred.");
    }
  };

  // Render the CreateTweet component
  return (
    <div>
      <h1>Create New Tweet!</h1>

      {/* Form with an input field and submit button */}
      <form onSubmit={handleSubmit}>
        {/* Input field for entering the tweet content */}
        <input
          value={content}
          onChange={handleContentChange}
          placeholder="Masukkan content"
        />

        {/* Submit button triggers the form submission */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// Export the CreateTweet component
export default CreateTweet;
