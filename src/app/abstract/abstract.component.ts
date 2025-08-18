import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-abstract',
  templateUrl: './abstract.component.html'
})
export class AbstractComponent {

  title = "MFR System/"

  generateLabel = (str: any) => {
    if(str){
      str = str.replace(/([A-Z])/g, ' $1').trim();
      str = str.charAt(0).toUpperCase() + str.slice(1);
      return (str)
    }
    return null;
  }

  generateValue(obj: any): any {
    let result = obj;
    if (Array.isArray(obj)) {
      result = "";
      obj.forEach((o) => {
        result += (o == obj[0] ? "" : ", ") + (o.label);
      })
    }
    return result;
  }

}
