/** @jsx createElement */

function createElement(type, props = {}, ...children) {
  if (typeof type === "function") {
    return type.apply(null, [props, ...children]);
  }
  return { type, props, children: children.flat() };
}

function renderElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const el = document.createElement(node.type);

  Object.entries(node.props || {})
    .filter(([attr, value]) => value)
    .forEach(([attr, value]) => el.setAttribute(attr, value));

  try {
    node.children.map(renderElement).forEach(element => {
      el.appendChild(element);
    });
  } catch (e) {
    console.log(node);
    console.log(e);
  }

  return el;
}

function render(vdom, container) {
  container.appendChild(renderElement(vdom));
}

const todoList = [
  { id: 1, checked: false, content: "todo item1" },
  { id: 2, checked: true, content: "todo item2" },
  { id: 3, checked: true, content: "todo item3" },
];

function App() {
  return (
    <div id="app">
      <h1>Hello</h1>
      <ul>
        {todoList.map(({ checked, content }) => (
          <li className={checked ? "checked" : null}>
            <input type="checkbox" className="toggle" checked={checked} />
            {content}
            <button className="remove">삭제</button>
          </li>
        ))}
      </ul>
      <form>
        <input type="text" />
        <button type="submit">추가</button>
      </form>
    </div>
  );
}

render(<App />, document.getElementById("root"));
