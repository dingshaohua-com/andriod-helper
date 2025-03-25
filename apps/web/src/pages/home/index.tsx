import "./style.less";

function App() {
  const test = async() => {
    // @ts-ignore
    // electronApi.openWindow("https://baidu.com");
    const res = await electronApi.execApkTool();
    console.log(res);
    
  };
  return (
    <div className="editor-wrapp">
      <button onClick={test}>测试</button>
    </div>
  );
}

export default App;
