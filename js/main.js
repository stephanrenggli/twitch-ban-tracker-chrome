window.onload = function () {
  document.getElementById("track").addEventListener("click", track);
  fill();
};

function fill() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    url = tabs[0].url;
    console.log(url);
    if (url.includes("twitch.tv")) {
      console.log("we're on twitch");
      const username = url.replace("https://www.twitch.tv/", "");
      document.getElementById("username").value = username;
    }
  });
}

async function track() {
  let username = document.getElementById("username").value;
  let trackingReason = document.getElementById("trackingReason").value;
  const res = await fetch("http://10.0.0.10:3033/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      trackingReason: trackingReason,
    }),
  });

  const msg = document.getElementById("response");
  res.json().then(data => {
    if (res.status == 201) {
      msg.textContent = `Tracking user ${username}.`;
    }
  
    if (res.status == 409) {
      msg.textContent = `User ${username} is already being tracked. Reason: ${data.trackingReason}`;
    }
  });
}
