import { useState } from "react";

import { getPath } from "@/utils/url-helper";
import "./style.less";

function Decompiler() {
  const [file, setFile] = useState();

  const onSelectFile = async () => {
    let res = await $electron.openFileDialog("apk");
    setFile(res);
    // 选择后，立刻开始编译
    const dirPath = getPath(res);
    console.log(111, dirPath);
    
    $electron.execApkTool(`d ${res} -o ${dirPath}`);
  };

  return (
    <div className="decompiler">
      <div className="fileup" onClick={onSelectFile}>
        {file ? file : "请选择 安装包"}
      </div>
    </div>
  );
}

export default Decompiler;
