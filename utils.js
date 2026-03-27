export function showToast(text) {
  const toast = document.createElement("div");
  toast.innerText = text;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#000";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "10px";
  toast.style.zIndex = "999";

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2000);
}