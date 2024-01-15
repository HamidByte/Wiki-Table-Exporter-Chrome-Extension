document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getTables" }, function (response) {
      const tablesList = document.getElementById("tables-list")

      response.tables.forEach(function (table, index) {
        const button = document.createElement("button")
        button.textContent = "Download Table " + (index + 1)
        button.addEventListener("click", function () {
          chrome.tabs.sendMessage(tabs[0].id, { action: "downloadTable", tableIndex: index })
        })

        tablesList.appendChild(button)
      })
    })
  })
})
