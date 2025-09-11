// 动态添加font-size样式到html元素
document.addEventListener('DOMContentLoaded', () => {
  const htmlElement = document.documentElement;
  // 获取当前样式
  const currentStyle = htmlElement.getAttribute('style') || '';
  
  // 检查是否已经包含font-size
  if (!currentStyle.includes('font-size')) {
    // 添加font-size样式
    htmlElement.setAttribute('style', `${currentStyle} font-size: 41.4px;`);
  } else if (!currentStyle.includes('font-size: 41.4px')) {
    // 如果已经有font-size但值不同，则更新它
    const updatedStyle = currentStyle.replace(
      /font-size:\s*[^;]+/, 
      'font-size: 41.4px'
    );
    htmlElement.setAttribute('style', updatedStyle);
  }
});