// Optional niceties

// Remember that the user "entered" so you could skip the splash next time if you want.
document.addEventListener("click", (e) => {
  const enter = e.target.closest("[data-enter]");
  if (!enter) return;
  sessionStorage.setItem("enteredAtelierL", String(Date.now()));
});

// Example: if you ever want to auto-redirect past splash when they've already entered once:
// (Uncomment to use.)
// if (location.pathname.endsWith("splash.html") && sessionStorage.getItem("enteredAtelierL")) {
//   location.replace("home.html");
// }

