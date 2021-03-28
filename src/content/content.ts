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
        window.addEventListener('click', function (e) {
          if (
            e.target &&
            !(<HTMLElement>e.target).classList.contains('__vcbf')
          ) {
            if (botDropdown.style.display === 'block') {
              botDropdown.style.display = 'none';
            }
          }
        });

        if (botDropdown.style.display === 'none') {
          // Preloader
          let html = '<div class="__vcbf__popup-preloader">';
          html += 'Загрузка...';
          html += '</div>';
          botDropdown.innerHTML = html;
          botDropdown.style.display = 'block';
          // Load user data
          const userData = await parseUser(userLink);
          // Parse user data
          const user = {
            name: userData.header.subsiteData.name,
            karma: userData.header.subsiteData.karma || 0,
            registerDate: userData.header.stats[0].label,
            commentsCount: userData.header.tabs[1].counter,
            articlesCount: userData.header.tabs[0].counter,
            isPremium: userData.header.subsiteData.isPlus,
          };
          // Styling karma
          let karmaClass = ' ';
          if (user.karma > 0) {
            karmaClass += '__vcbf__popup-header_karma--positive';
            user.karma = '+' + user.karma;
          } else if (user.karma < 0) {
            karmaClass += '__vcbf__popup-header_karma--negative';
          }
          // Set popup header
          html = '';
          html += '<div class="__vcbf__popup-header">';
          html += `<div class="__vcbf__popup-header_name">${user.name}</div>`;
          html += `<div class="__vcbf__popup-header_karma${karmaClass}">${user.karma}</div>`;
          html += '</div>';
          // Set popup content
          html += '<div class="__vcbf__popup-content">';
          html += `<div class="__vcbf__popup-content_date">${user.registerDate}</div>`;
          html += `<div><span>Премиум</span>: ${
            user.isPremium ? 'да' : 'нет'
          }</div>`;
          html += `<div><span>Комментариев</span>: ${user.commentsCount} шт.</div>`;
          html += `<div><span>Статей</span>: ${user.articlesCount} шт.</div>`;
          html += '</div>';

          botDropdown.innerHTML = html;
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
