import { createPortal } from "react-dom";

/**
 * Portal — 将子元素渲染到 <body> 层
 * 
 * 作用：所有 position:fixed 的覆盖层（抽屉/弹窗/Toast 等）
 * 必须用 Portal 挂到 body 下，避免父级 transform/filter 影响固定定位。
 * 
 * 用法：
 *   <Portal>
 *     <div className="fixed inset-0 z-50">...</div>
 *   </Portal>
 */
export default function Portal({ children }) {
  return createPortal(children, document.body);
}
