export function createElement(
  tag,
  { className, text, attrs = {}, on = {}, children = [] } = {},
) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  for (const [name, value] of Object.entries(attrs)) {
    element.setAttribute(name, value);
  }
  for (const [type, handler] of Object.entries(on)) {
    element.addEventListener(type, handler);
  }
  element.append(...children);

  return element;
}
