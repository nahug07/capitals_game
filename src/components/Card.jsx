import { useState, useEffect } from "react";
import Nations from "./Nations.ts";
import "./Card.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function Card() {
  const [country, setCountry] = useState([]);
  const [capitalCountry, setCapitalCountry] = useState({});
  const [score, setScore] = useState({ total: 0, correct: 0, incorrect: 0 });
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState({});

  const generateRandomNations = () => {
    let ct = [];
    for (let i = 0; i < 4; i++) {
      const r = Math.floor(Math.random() * Nations.length);
      ct.push(Nations[r]);
    }

    setCountry(ct);
    const index = Math.floor(Math.random() * 4);
    setCapitalCountry(ct[index]);
  };

  const checkAnswer = (country) => {
    setSelected(country);
    if (country.name === capitalCountry.name) {
      setScore({
        ...score,
        correct: score.correct + 1,
        total: score.total + 1,
      });
    } else {
      setScore({
        ...score,
        incorrect: score.incorrect + 1,
        total: score.total + 1,
      });
    }
    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    generateRandomNations();
  };

  useEffect(() => {
    generateRandomNations();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          minWidth: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <p class="instructions">
          <strong>Total : {score.total}</strong>
          <strong>Correct : {score.correct}</strong>
          <strong>Incorrect : {score.incorrect}</strong>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginBottom: "10px",
        }}
      >
          <h3> Of which of the following countries is <b className="text-gradient">{capitalCountry.city}</b> its capital?</h3>
        <div className="options">
          {country.map((c) => (
            <ul role="list" className="link-card-grid">
              <li className="link-card" onClick={(e) => checkAnswer(c)}>
                <h2>{c.name}</h2>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div className="answer">
        {showAnswer ? (
          capitalCountry.name === selected.name ? (
            <h2 className={"correct"}>Correct : {capitalCountry.name}</h2>
          ) : (
            <h2 className={"incorrect"}>
              Incorrect! Correct was : {capitalCountry.name}
            </h2>
          )
        ) : null}
      </div>
    </>
  );
}
