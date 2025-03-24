import { URL } from "url"; // 确保在 Node.js 环境下引入 URL

export default (url) => {
  // 检查 URL 是否包含协议（http:// 或 https://）
  const hasProtocol = /^https?:\/\//i.test(url);

  let parsedUrl;
  if (hasProtocol) {
    // 如果有协议部分，直接解析为绝对 URL
    parsedUrl = new URL(url);
  } else {
    // 如果没有协议部分，假设它是一个相对路径
    parsedUrl = new URL(url, "https://example.com"); // 使用一个默认基础URL
  }

  // 获取路径部分
  const pathname = parsedUrl.pathname;

  // 从路径中提取文件和后缀
  const pathParts = pathname.split("/");
  const file = pathParts[pathParts.length - 1];
  const suffix = file.includes(".") ? file.split(".").pop() : null;

  return {
    isAbsPath: hasProtocol, // 判断是否是绝对路径
    path: pathname,
    file,
    suffix,
  };
};
