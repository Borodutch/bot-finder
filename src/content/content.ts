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
    const botButton = document.createElement('div');
    botButton.className = '__vcbf comments__item__reply';
    const userLink = username
      .getElementsByClassName('comments__item__user')[0]
      .getAttribute('href');
    botButton.innerHTML = 'Это бот?';
    botButton.onclick = async () => {
      botButton.innerHTML = 'Загрузка...';
      const userData = await parseUser(userLink);
      alert(
        `Reg: ${userData.header.stats[0].label} \n Name: ${userData.header.subsiteData.name}, karma: ${userData.header.subsiteData.karma}, comments: ${userData.header.tabs[1].counter}, articles: ${userData.header.tabs[0].counter}, isPlus: ${userData.header.subsiteData.isPlus}`
      );
      botButton.innerHTML = 'Это бот?';
    };
    username
      .getElementsByClassName('comments__item__self')[0]
      .appendChild(botButton);
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const botButtonsToRemove = Array.from(document.querySelectorAll('.__vcbf'));
  for (let botButton of botButtonsToRemove) {
    botButton.remove();
  }
  runScript();
});
