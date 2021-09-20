# Render Element

`step1`에서 React는 `render`라는 정적 메서드를 가진다는 것을 알았다.
이제 그 `render`함수를 직접 구현해보자.

```jsx
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
```

`step1`에서는 jsx문법을 `createElement`라는 함수를 통해 vdom으로 바꾸기만 했기 때문에 화면에 html요소가 그려지지 않는다. 따라서 `render`함수를 구현하여 그려줘야한다.

`render`는 두 개의 인자를 갖는다.
첫 번째 인자는 VirtualDOM(화면에 그릴 컴포넌트), 두 번째 인자는 그 컴포넌트를 담을 컨테이너이다.

```jsx
function render(vdom, container) {
  container.appendChild(renderElement(vdom));
}
```

위와 같이 `render`함수에서는 두 개의 인자를 받아 컨테이너에 `appendChild`메서드로 이어붙일 것 이다.

다음은 `renderElement`이다. `render`함수를 보면 이 `renderElement`에서 리턴해야할 값이 예측이 된다. html 요소(노드)를 리턴해야 한다.

```jsx
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
```

`renderElement`는 위와 같이 구현할 수 있다. 인자로 넘겨받은 node를 재귀적으로 탐색하여 노드의 타입이 `string`일 경우 텍스트 노드를 생성하여 리턴하고, 아닐 경우 자식 노드가 있다는 말이기 때문에 먼저 해당 요소를 생성하고, 재귀적으로 들어간다.
`props`에는 `id`나 `className`과 같은 요소의 속성들이 들어있는데, 이 속성들 또한 넣어주자.

```jsx
function createElement(type, props = {}, ...children) {
  if (typeof type === "function") {
    return type.apply(null, [props, ...children]);
  }
  return { type, props, children };
}
```

그리고 위와 같이 기존 step1의 jsx문법에서 vdom으로 바꾸는 `createElement`에서 `children`을 그대로 리턴했었는데, 이렇게 하면 depth가 하나 더 늘어나기 때문에 위의 로직에서 `node.children`을 참조할 때 `undefined`가 뜨게 된다.
이를 해결하기 위해 `children`을 flat시켜 vdom을 만들어준다.

```jsx
function createElement(type, props = {}, ...children) {
  if (typeof type === "function") {
    return type.apply(null, [props, ...children]);
  }
  return { type, props, children: children.flat() };
}
```

