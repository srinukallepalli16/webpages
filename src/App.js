import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";
const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];
//=======================================================
// useState Counter Part Cde
function Counter() {
  const [count, setCount] = useState(0);
  // console.log("rendering...");
  //rendering means code will excuted
  // console.log(x);
  // btn.addEventListener('click',function());
  return (
    <div>
      <span style={{ fontSize: "40px" }}>{count}</span>
      <button className="btn btn-large" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
}
//=========================================================
function App() {
  //1. Define State Varibale
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);
        let query = supabase.from("fact").select("*");
        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);
        const { data: fact, error } = await query
          // .from("fact")
          // .select("*")
          // .eq("category", "technology")
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (!error) setFacts(fact);
        else alert("There was a problem getting data");
        setIsLoading(false);
        // console.log(fact);
        // console.log(error);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {/* // 2. use State variable */}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      {/* <Counter /> */}
      {/* <NewFactForm /> */}
      <main className="mainclass">
        <CategoryFilters setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}

        {/* <FactList facts={facts} /> */}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading....</p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Srinu Kallepalli";
  return (
    <header className="header">
      <div className="logo">
        <img src="srinupic1.jpeg" alt="Avatar" style={{ width: "120px" }} />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        //3. update state variable
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "add Domain"}
      </button>
    </header>
  );
}
const CATEGORIES = [
  { name: "SAPUI5", color: "#3b82f6" },
  { name: "SAP FIORI", color: "#16a34a" },
  { name: "SAP RAP", color: "#ef4444" },
  { name: "SAP CAPM", color: "#eab308" },
  { name: "SAP CPI", color: "#db2777" },
  { name: "SAP BTP", color: "#14b8a6" },
  { name: "SAP BAS", color: "#f97316" },
  { name: "SAP ABAP", color: "#8b5cf6" },
  {name:"REACT",color:"#00ffff"}
];

// url check if valid or not

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    //1.Prevent browser reload
    e.preventDefault();
    console.log(text, source, category);
    // 2. Check if data is valid. if so create a new fact

    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // console.log("there is data");
      //3. Create new fact object
      // const newFact = {
      //   id: Math.round(Math.random() * 10000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      //3. Uploading fact to Supabase & receive the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("fact")
        .insert([
          {
            text,
            source,
            category,
          },
        ])
        .select();
      setIsUploading(false);
      //4. Add the new fact to the UI: add the fact to the state
      if (!error) setFacts((facts) => [newFact[0], ...facts]);
      //5. Reset the input Fields
      setText("");
      setSource("");
      setCategory("");
      //6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Please Add Domain Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        value={source}
        placeholder="Please Add Source"
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilters({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            ALL (Learnings)
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category "
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
function FactList({ facts, setFacts }) {
  //Temporary
  if (facts.length === 0)
    return (
      <p className="message">
        No facts for this category yet! Create the first one ✌️
      </p>
    );
  return (
    <section>
      <ul className="fact-lists">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;
  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("fact")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setFacts((fact) =>
        fact.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[🤪DISPUTED]</span> : null}
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
        className="tag"
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          ❤️ {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          👍 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          😍 {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}
export default App;
