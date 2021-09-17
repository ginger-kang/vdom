/** @jsx createElement */

function createElement(type, props = {}, ...children) {
  return { type, props, children };
}

const dom = (
  <div id="app">
    <h1>Hello</h1>
    <ul>
      <li className="item">shinkai</li>
      <li className="item">smile</li>
      <li className="item">kaerunouta</li>
    </ul>
  </div>
);

const $root = document.querySelector("#root");

$root.innerHTML = `<pre>${JSON.stringify(dom, null, 2)}</pre>`;
