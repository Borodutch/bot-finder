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

(async () => {
  const commentNames = Array.from(
    document.querySelectorAll('.comments__item__users')
  );

  for (let username of commentNames) {
    const botButton = document.createElement('span');
    const userLink = username
      .getElementsByClassName('comments__item__user')[0]
      .getAttribute('href');
    botButton.innerHTML = 'Check';
    botButton.onclick = async () => {
      const userData = await parseUser(userLink);
      alert(
        `Reg: ${userData.header.stats[0].label} \n Name: ${userData.header.subsiteData.name}, karma: ${userData.header.subsiteData.karma}, comments: ${userData.header.tabs[1].counter}, articles: ${userData.header.tabs[0].counter}, isPlus: ${userData.header.subsiteData.isPlus}`
      );
      console.log(userData);
    };
    username.append(botButton);
  }
})();
