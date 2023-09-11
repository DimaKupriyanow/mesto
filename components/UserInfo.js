export class UserInfo {
  constructor({ selectorName, selectorInfo, selectorAvatar }) {
    this._name = selectorName;
    this._info = selectorInfo;
    this._avatar = selectorAvatar;
  }

  getUserInfo() {   // возвращает обьект с данными пользователя
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {   // принимает новые данные и добавляет их на страницу
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.src = avatar;
  }
}
