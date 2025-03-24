import "./style.less";

function App() {
  const test = () => {
    // @ts-ignore
    electronApi.openWindow("https://baidu.com");
  };
  return (
    <div className="editor-wrapp">
      <button onClick={test}>测试</button>
    </div>
  );
}

export default App;
