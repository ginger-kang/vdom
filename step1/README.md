# React와 VirtualDOM

아래는 jsx를 이용한 React의 기본 구조이다.

```jsx
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
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
```

`ReactDOM`은 `render`라는 정적메서드를 가지며, 2개의 인자를 받는다.
첫 번째 인자는 화면에 렌더링할 컴포넌트이고 두 번째는 컴포넌트를 렌더링할 요소이다.
위에서 작성한 `App`컴포넌트는 babel에 의해 아래와 같이 변환된다.

```js
function App() {
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      id: "app",
    },
    /*#__PURE__*/ React.createElement("h1", null, "Hello"),
    /*#__PURE__*/ React.createElement(
      "ul",
      null,
      /*#__PURE__*/ React.createElement(
        "li",
        {
          className: "item",
        },
        "shinkai",
      ),
      /*#__PURE__*/ React.createElement(
        "li",
        {
          className: "item",
        },
        "smile",
      ),
      /*#__PURE__*/ React.createElement(
        "li",
        {
          className: "item",
        },
        "kaerunouta",
      ),
    ),
  );
}
```

jsx코드가 `React`의 `createElement`함수로 변환된 것과 `createElement`가 세 개의 인자를 받는 것을 볼 수 있다.

세 개의 인자는 다음과 같다.
현재 노드의 타입인 `type`, `id`나 `className`과 같은 노드의 속성 값들을 나타내는 객체, 자식 노드들을 나타내는 `children`.

실제로 `React`의 `createElement`는 다음과 같이 구성되어 있다.

```js
function createElement(type, props = {}, ...children) {
  return { type, props, children }
}
```

babel을 통해 jsx를 변환시키기 위해 관련 패키지 `@babel/plugin-transform-react-jsx`를 설치하고, 코드 최상단에 `/** @jsx createElement */`를 작성해주면 babel이 jsx문법을 `createElement`함수를 통해 변환시킨다.

변환시킨 결과는 아래와 같다.

```json
{
  "type": "div",
  "props": {
    "id": "app"
  },
  "children": [
    {
      "type": "h1",
      "props": null,
      "children": [
        "Hello"
      ]
    },
    {
      "type": "ul",
      "props": null,
      "children": [
        {
          "type": "li",
          "props": {
            "className": "item"
          },
          "children": [
            "shinkai"
          ]
        },
        {
          "type": "li",
          "props": {
            "className": "item"
          },
          "children": [
            "smile"
          ]
        },
        {
          "type": "li",
          "props": {
            "className": "item"
          },
          "children": [
            "kaerunouta"
          ]
        }
      ]
    }
  ]
}
```