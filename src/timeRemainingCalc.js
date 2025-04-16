import { useEffect, useState } from "react";

function timeRemainingCalc(auctionDateTime) {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const auctionDate = new Date(auctionDateTime);
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = auctionDate - now;

      if (timeDiff < 0) {
        setTimeRemaining("Over!");
      } else {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionDateTime]);

  return timeRemaining;
}

export default timeRemainingCalc;
