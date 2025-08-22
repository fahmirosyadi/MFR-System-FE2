import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class CommonService {

  public title = "";

  constructor(public router: Router) { }

  customFetch = (url: any, header: any, method: string, action:any = null) => {
    let loadingData = document.getElementById("loadingData");
    if (loadingData != undefined) {
      loadingData.style.visibility = "visible";
    }
    let r = this.router;
    let self = this;
    return fetch(url, {
      method: method,
      headers: header
    }).then(response => response.json()).then(function (result) {
      if (result.status == true) {
        if (method == 'delete') {
          // Swal.fire(
          //   'Deleted!',
          //   result.messages,
          //   'success'
          // )
          action();
        } else if (method == 'post') {
          // Swal.fire(
          //   'Berhasil disimpan!',
          //   result.messages,
          //   'success'
          // )
        }
        return result.data;
        
      } else if (result.status == 403) {
        if(url.endsWith('/api/menu/')){
          r.navigate(["login"]);
        }else{
          // Swal.fire(
          //   'Error!',
          //   result.message,
          //   'error'
          // )
        }
        return null;
      } else {
        r.navigate(["login"]);
        return null;
      }
      
    }).catch(response => {
      if(url.endsWith('/api/menu/')){
        r.navigate(["login"]);
      }else{
        // Swal.fire(
        //   'Error!',
        //   response.message,
        //   'error'
        // )
      }
      return null;
    }).finally(() => {
      if (loadingData != undefined) {
        loadingData.style.visibility = "hidden";
      }
    })
  }

  getHeader = () => {
    let token = sessionStorage.getItem("token");
    let header: any;
    if (token != null) {
      header = {
        'Content-Type': 'application/json',
        "Authorization": token!
      }
    } else {
      header = {
        'Content-Type': 'application/json',
        "Authorization": ""
      }
    }
    return header;
  }

  get = (url: any) => {
    url = baseUrl + `${url}`;
    let header: any = this.getHeader();
    return this.customFetch(url, header, "get");
  }

  getPublic = (url: any) => {
    let header: any = this.getHeader();
    return fetch(url)
      .then(response => response.text())
      .then(data => {
        return data;
      })
      .catch(error => console.error('Error:', error));
  }

  post = (data: any, url: any, toast = 1) => {
    url = baseUrl + url;
    if(document.getElementById("loadingData")){
      document.getElementById("loadingData")!.style.visibility = "visible";
    }
    let header: any = this.getHeader();
    let self = this;
    console.log("Post data : ", data);
    return fetch(url, {
      method: 'post',
      headers: header,
      body: JSON.stringify(data)
    }).then(response => response.json()).then(function (result) {
      console.log(result);
      if(result.status){
        if(toast == 1){
          // Swal.fire(
          //   'Berhasil disimpan!',
          //   result.messages,
          //   'success'
          // )
        } else if(toast == 2){
          // self.toastr.success(result.messages,'success');
        }
      }else{
        // Swal.fire(
        //   'Gagal!',
        //   result.messages,
        //   'warning'
        // )  
      }
      return result;
    }).catch((result) => {
      // Swal.fire(
      //   'Gagal!',
      //   result.messages,
      //   'warning'
      // )
    }).finally(() => {
      if(document.getElementById("loadingData")){
        document.getElementById("loadingData")!.style.visibility = "hidden";
      }
    })
  }

  delete = (url = "", action: any = null) => {
    let res: any = null;
    // Swal.fire({
    //   title: 'Apa anda yakin?',
    //   text: `Anda tidak akan bisa mengembalikan ${this.getCommonUrl()} ini!`,
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Ya, tetap hapus!',
    //   cancelButtonText: 'Jangan, biarkan saja'
    // }).then((result) => {
    //   if (result.value) {
        url = baseUrl + `${url}`;
        let header: any = this.getHeader();
        res = this.customFetch(url, header, "delete", action);
      // } else if (result.dismiss === Swal.DismissReason.cancel) {
      //   Swal.fire(
      //     'Dibatalkan',
      //     `${this.getCommonUrl()} anda aman :)`,
      //     'error'
      //   )
      // }
    // })
    return res;
  }

  getSheetData = ( query = "", callback: any, sheetName = "", sheetID = "1xoh3h3ib52vkC15PkJ_Rx8PxnflCDowrZ1e17gOS2jA") => {
    const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    const url = `${base}&sheet=${encodeURIComponent(
      sheetName
    )}&tq=${encodeURIComponent(query)}`;

    fetch(url)
      .then((res) => res.text())
      .then((response) => {
        callback(responseToObjects(response));
      });

    function responseToObjects(res: any) {
      // credit to Laurence Svekis https://www.udemy.com/course/sheet-data-ajax/
      const jsData = JSON.parse(res.substring(47).slice(0, -2));
      let data = [];
      const columns = jsData.table.cols;
      const rows = jsData.table.rows;
      let rowObject: any;
      let cellData;
      let propName = [];
      for (let r = 0, rowMax = rows.length; r < rowMax; r++) {
        rowObject = {};
        for (let c = 0, colMax = columns.length; c < colMax; c++) {
          if(r == 0){
            propName.push(rows[r]["c"][c].v.toLowerCase());
          }else{
            cellData = rows[r]["c"][c];
            if (cellData === null) {
              rowObject[propName[c]] = "";
            } else if (
              typeof cellData["v"] == "string" &&
              cellData["v"].startsWith("Date")
            ) {
              rowObject[propName[c]] = new Date(cellData["f"]);
            } else {
              rowObject[propName[c]] = cellData["v"];
            }
          }
        }
        if( r > 0) { // Skip the first row which is the header
          data.push(rowObject);
        }
      }
      return data;
    }
  };

  
  getSheet(query: string, sheetName: string, callback: any) {
    this.getSheetData(query, (data: any) => {
      let result = "";
      data.forEach((item: any) => {
        result += item.name;
      });
      callback(result);
    }, sheetName);
  }

  stripHtml(html: any)
  {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || "").trim();
  }
  
  login = async (data: any) => {
    let result = await this.post(data, "user/login", 0);
    if (result.status == false) {
      alert(result.messages);
    } else {
      sessionStorage.setItem("user", JSON.stringify(result.data.user));
      console.log(result.data.user);
      sessionStorage.setItem("token", result.data.token);
      alert(result.messages);
      this.router.navigate([""]);
    }
  }

  logout = () => {
    sessionStorage.clear();
    this.router.navigate(["login"]);
  }

}
