export class UserInfo {
  constructor({ selectorName, selectorInfo }) {
    this._name = selectorName;
    this._info = selectorInfo;
  }

  getUserInfo({ nameInput, infoInput }) {  // возвращает обьект с данными пользователя
    return {
      name: (nameInput.textContent = this._name.value),
      info: (infoInput.textContent = this._info.value),
    };
  }

  setUserInfo({ nameInput, infoInput }) {  // принимает новые данные и добавляет их на страницу
    this._name.textContent = nameInput.value;
    this._info.textContent = infoInput.value;
  }
}
