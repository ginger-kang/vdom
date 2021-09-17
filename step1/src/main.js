/** @jsx createElement */

function createElement(type, props = {}, ...children) {
  if (typeof type === "function") {
    return type.apply(null, [props, ...children]);
  }
  return { type, props, children };
}

const todoList = [
  { id: 1, checked: false, content: "todo item1" },
  { id: 2, checked: true, content: "todo item2" },
  { id: 3, checked: true, content: "todo item3" },
];

const vm = (
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

const $root = document.body.querySelector("#root");

$root.innerHTML = `
  <pre>${JSON.stringify(vm, null, 2)}</pre>
`;
