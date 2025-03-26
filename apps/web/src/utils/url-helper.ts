export const getPath = (filePath) => {
  // 处理正斜杠和反斜杠
  const lastSlashIndex = Math.max(
    filePath.lastIndexOf("/"),
    filePath.lastIndexOf("\\")
  );
  return lastSlashIndex >= 0 ? filePath.substring(0, lastSlashIndex + 1) : "";
};

export const getPathWhithFile = (filePath)=> {
  return filePath.replace(/\.[^/.]+$/, '');
}

// 示例用法
// const fullPath = "C:/Users/Name/Documents/file.txt";
// const pathOnly = getPath(fullPath);
// console.log(pathOnly); // 输出: "C:/Users/Name/Documents/"
