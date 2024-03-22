import { useEffect, useState } from "react"
import { HappyCard } from "./components/HappyCard";
import { ThoughtCreator } from "./components/ThoughtCreator";


export const App  = () => {  
  const [thoughts, setThoughts] = useState ([])

  useEffect (() => {
    fetchThoughts()
  }, []) //Only run once when the component mounts

  const fetchThoughts = async () => {
    try{
      const response = await fetch ("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      const data = await response.json()
      setThoughts(data)
      console.log(thoughts)
    } catch (error) {
      console.error("Error fetching thoughts:", error)
    }
  }

  //This function will modify the timestamp in order to show the time since created
  const calculateTimeDifference = (timestamp) => {
    const now = new Date();
    const parsedDate = Date.parse(timestamp);
    const timeDifference = now - parsedDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    let output;
    if (seconds < 60) {
      output = `${seconds} seconds ago`;
    } else if (minutes < 60) {
      output = `${minutes} minutes ago`;
    } else if (hours < 24) {
      output = `${hours} hours ago`;
    } else {
      output = `${days} days ago`;
    }

    return output;
  }  

  return (
    <div className="App">
      <ThoughtCreator />
      {thoughts.map((thoughts) => (
        <HappyCard 
          key={thoughts._id}
          message={thoughts.message}
          hearts={thoughts.hearts}
          timeSinceCreated={calculateTimeDifference(thoughts.createdAt)}
        />
      ))}      
    </div>
  )
};
