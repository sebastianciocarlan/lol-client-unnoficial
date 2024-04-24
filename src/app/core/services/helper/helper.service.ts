import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../../environments/environment'
import { firstValueFrom } from 'rxjs';
import { ElectronService } from '../electron/electron.service';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http: HttpClient, private electronService: ElectronService) {
    this.createFolders();
  }

  createFolders() {
    this.electronService.fs.mkdir(APP_CONFIG.BASE_PATH + APP_CONFIG.SUMMONER_ICONS, { recursive: true }, () => { });
    this.electronService.fs.mkdir(APP_CONFIG.BASE_PATH + APP_CONFIG.SUMMONER_SPELLS, () => { });
    this.electronService.fs.mkdir(APP_CONFIG.BASE_PATH + APP_CONFIG.CHAMPIONS, () => { });
    this.electronService.fs.mkdir(APP_CONFIG.BASE_PATH + APP_CONFIG.ITEMS, () => { });
  }

  async getIcons(pathUrl: string, url: string, folder: string, callback: (max: number, index: number, nombreActual: string) => void) {
    let resIcons: any = await firstValueFrom(this.http.get(pathUrl))
    console.log(resIcons)
    for (let index = 0; index < Object.keys(resIcons).length; index++) {
      // Get the substring from the last slash to the end from resIcons[index].iconPath
      try {
        let path = (resIcons[index].iconPath).substring((resIcons[index].iconPath).lastIndexOf('/') + 1);
        
        if (path && !this.checkIfExists(APP_CONFIG.BASE_PATH + folder + path)) {
          let iconValue = await firstValueFrom(this.http.get(url + path, { responseType: 'arraybuffer' }));
          
          this.electronService.fs.writeFileSync(APP_CONFIG.BASE_PATH + folder + path, Buffer.from(iconValue));
          callback(resIcons.length, index, APP_CONFIG.BASE_PATH + folder + path);
        } else {
          console.log('File ' + resIcons[index].id + ' already exists')
        }
      } catch (e) {
        console.log(e)
      }
    }

  }

  async getChampions(pathUrl: string, url: string, folder: string, callback: (max: number, index: number, nombreActual: string) => void) {
    let resIcons: any = await firstValueFrom(this.http.get(pathUrl))
    console.log(resIcons)
    for (let index = 0; index < Object.keys(resIcons).length; index++) {
      // Get the substring from the last slash to the end from resIcons[index].iconPath
      try {
        let path = (resIcons[index].squarePortraitPath).substring((resIcons[index].squarePortraitPath).lastIndexOf('/') + 1);
        
        if (path && !this.checkIfExists(APP_CONFIG.BASE_PATH + folder + path)) {
          let iconValue = await firstValueFrom(this.http.get(url + path, { responseType: 'arraybuffer' }));
          
          this.electronService.fs.writeFileSync(APP_CONFIG.BASE_PATH + folder + path, Buffer.from(iconValue));
          callback(resIcons.length, index, APP_CONFIG.BASE_PATH + folder + path);
        } else {
          console.log('File ' + resIcons[index].id + ' already exists')
        }
      } catch (e) {
        console.log(e)
      }
    }

  }

  checkIfExists(path: string) {
    if (this.electronService.fs.existsSync(path)) {
      return true
    }
    return false
  }
}
