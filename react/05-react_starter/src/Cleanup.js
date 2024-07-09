import React, { useEffect, useState } from "react";

function Hello() {
  function effectFn() {
    console.log("created :) ");
    return destroyedFn;
  }
  function destroyedFn() {
    console.log("destroyed :( ");
  }

  useEffect(effectFn, []);

  useEffect(() => {
    console.log("created :) ");
    return () => console.log(" destroyed :( ");
  }, []);

  return <h1>Hello</h1>;
}

function Cleanup(props) {
  const [Showing, setShowing] = useState(false);
  const onClick = () => {
    setShowing(!Showing);
  };
  return (
    <div>
      {Showing ? <Hello /> : null}
      <button onClick={onClick}>{Showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default Cleanup;
