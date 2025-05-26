const tabNavigations = document.querySelectorAll(".tab__navigation");

tabNavigations.forEach((tabNavigation) => {
  const tabs = Array.from(tabNavigation.querySelectorAll(".tab"));
  const tabContents = Array.from(
    tabNavigation.nextElementSibling.querySelectorAll(".tab__content")
  );

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("tab_active"));
      tabContents.forEach((c) => c.classList.remove("tab__content_active"));
      tab.classList.add("tab_active");
      tabContents[index].classList.add("tab__content_active");
    });
  });
});
