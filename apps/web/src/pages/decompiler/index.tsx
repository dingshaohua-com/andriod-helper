import { useState } from "react";

import { getPathWhithFile } from "@/utils/url-helper";
import "./style.less";

function Decompiler() {
  const [file, setFile] = useState();
  const [execStatus, setExecStatus] = useState("");
  const [decompilerRes, setDecompilerRes] = useState("");
  const onSelectFile = async () => {
    let res = await $electron.openFileDialog("apk");
    if(!res){
      return false;
    }
    setFile(res);
    // 初始化数据
    setExecStatus("ing");
    setDecompilerRes("");
    // 选择后，立刻开始编译
    const dirPath = getPathWhithFile(res);
    const decompilerResTemp = await $electron.execApkTool(
      `d ${res} -o ${dirPath} -f`
    );
    // 设置数据
    setExecStatus("end");
    setDecompilerRes(decompilerResTemp.data);
  };

  return (
    <div className="decompiler">
      <div className="fileup" onClick={onSelectFile}>
        {file ? file : "请选择 安装包"}
      </div>
      <div className="exec-status">
        {execStatus === "ing" && (
          <div className="ing">
            <div>正在编译中，请等候...</div>
            <div>🥲 没有卡住，过程取决于 apk 大小，一般在一分钟内</div>
          </div>
        )}
        {execStatus === "end" && (
          <div className="end">
            <div>
              执行结束，结果如下
              <button
                className="small green button"
                onClick={() => $electron.showExplorer(getPathWhithFile(file))}
              >
                打开输出目录
              </button>
            </div>
            <div className="end-output">{decompilerRes}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Decompiler;
