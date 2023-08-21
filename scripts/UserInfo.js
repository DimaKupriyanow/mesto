import { infoName } from './index.js';
import { infoClass } from './index.js';

export class UserInfo {
    constructor( selectorName, selectorInfo ) {
        this._name = selectorName;
        this._info = selectorInfo;
    }

    getUserInfo() {
        const newCardData = {
                name: this._name.value,
                info: this._info.value,
              };
console.log(newCardData)
          return newCardData;
    }

    
    

    setUserInfo() {
        this.getUserInfo()
        this._name.value = infoName.textContent;
        this._info.value = infoClass.textContent;
    }
}
