/** @jsx createElement */

function createElement(type, props = {}, ...children) {
  if (typeof type === "function") {
    return type.apply(null, [props, ...children]);
  }
  return { type, props, children };
}

function App() {
  return (
    <div id="app">
      <h1>Hello</h1>
      <ul>
        <li className="item">shinkai</li>
        <li className="item">smile</li>
        <li className="item">kaerunouta</li>
      </ul>
    </div>
  );
}

console.log(<App />);
