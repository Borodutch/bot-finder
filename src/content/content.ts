const parseUser = async (url: string | null) => {
  if (!url) return null;
  let userInfo: NodeListOf<Element> | undefined;
  await fetch(url)
    .then((response) => response.text())
    .then((html) => {
      let parser = new DOMParser();
      let doc = parser.parseFromString(html, 'text/html');
      userInfo = doc.querySelectorAll('textarea.l-hidden');
    });
  if (userInfo !== undefined) return JSON.parse(userInfo[0].innerHTML);
  return null;
};

const runScript = async () => {
  const commentNames = Array.from(
    document.querySelectorAll('.comments__item__space')
  );

  for (let username of commentNames) {
    const userDom = username.getElementsByClassName('comments__item__user')[0];
    const userLink = userDom ? userDom.getAttribute('href') : null;

    if (userLink) {
      const botButton = document.createElement('div');
      const botDropdown = document.createElement('div');
      botDropdown.className = '__vcbf__popup';
      botDropdown.style.display = 'none';
      botButton.className = 'comments__item__reply __vcbf';
      botButton.innerHTML = 'Это бот?';
      botButton.onclick = async () => {
        if (botDropdown.style.display === 'none') {
          botDropdown.innerHTML = 'Загрузка...';
          botDropdown.style.display = 'block';
          const userData = await parseUser(userLink);
          botDropdown.innerHTML = `${userData.header.subsiteData.name} (${
            userData.header.subsiteData.isPlus ? 'Премиум, ' : ''
          }карма: ${userData.header.subsiteData.karma})<br /><br />${
            userData.header.stats[0].label
          }<br /><br />Комментариев: ${
            userData.header.tabs[1].counter
          }<br>Статей: ${userData.header.tabs[0].counter}`;
        } else {
          botDropdown.style.display = 'none';
        }
      };
      username
        .getElementsByClassName('comments__item__self')[0]
        .appendChild(botButton);
      username.getElementsByClassName('__vcbf')[0].appendChild(botDropdown);
    }
  }
};

chrome.storage.local.get(['bots'], function (data) {
  if (data.bots) {
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      const botButtonsToRemove = Array.from(
        document.querySelectorAll('.__vcbf')
      );
      for (let botButton of botButtonsToRemove) {
        botButton.remove();
      }
      runScript();
    });
  }
});
