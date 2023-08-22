
export class UserInfo {
  constructor(selectorName, selectorInfo) {
    this._name = selectorName;
    this._info = selectorInfo;
  }

  getUserInfo({ nameProf, infoProf }) { // возвращает обьект с данными пользователя


    return {
        name: this._name.textContent = nameProf.textContent,
        info: this._info.textContent = infoProf.textContent
  }
}

  setUserInfo({ nameInput, infoInput}) { // принимает новые данные и добавляет их на страницу 
    nameInput.textContent = this._name.value;
    infoInput.textContent = this._info.value;

  }
}
