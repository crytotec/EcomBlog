import { useEffect, useState } from "react";

function Quotes() {
  const [quoted, setQuoted] = useState("");

  useEffect(() => {
    const quote = async () => {
      try {
        const data = await fetch("https://api.adviceslip.com/advice");
        const res = await data.json();

        console.log(res);

        if (!res?.content) return;

        setQuoted(res.content);
      } catch (error) {
        console.log("Error fetching quote:", error);
      }
    };

    quote();
  }, []);

  return (
    <div>
      <h1>{quoted || "Loading..."}</h1>
    </div>
  );
}

export default Quotes;