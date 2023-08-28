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

  setUserInfo( inputName, inputInfo ) { // принимает новые данные и добавляет их на страницу 
    this._name.textContent = inputName;
    this._info.textContent = inputInfo;
    }
  }