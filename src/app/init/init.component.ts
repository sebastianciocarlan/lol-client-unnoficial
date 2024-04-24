import { Component } from '@angular/core';
import { LeagueService } from '../core/services/league/league.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';
import { HelperService } from '../core/services/helper/helper.service';
import { APP_CONFIG } from '../../environments/environment';
@Component({
  selector: 'app-init',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './init.component.html',
  styleUrl: './init.component.scss'
})
export class InitComponent {
  constructor(
    private riotService: LeagueService,
    private router: Router,
    private electronService: ElectronService,
    private helper: HelperService
  ) { }
  message = 'Hello World!';
  isLolStarted: boolean = false;
  isLolChecked: boolean = false;
  endedLoadingAssets: boolean = false;
  actualFile:string = "";
  actualPercentage = 0;
  async ngOnInit(): Promise<void> {
    this.message = "Descargando archivos para el cliente. Puede tomar tiempo."
    await this.downloadNecessaryAssets();
    this.endedLoadingAssets = true;
    this.message = "Checkeando si el lol esta encendido"
    try {
      await this.riotService.init({})
      this.isLolChecked = true;
      this.isLolStarted = true;
      //await this.router.navigate(['client']);
    } catch (e) {
      this.isLolChecked = true;
      console.log(e)
    }
  }
  async downloadNecessaryAssets() {
    this.message = "Descargando iconos...";
    await this.helper.getIcons(APP_CONFIG.SUMMONER_ICONS_PATH_URL, APP_CONFIG.SUMMONER_ICONS_URL, APP_CONFIG.SUMMONER_ICONS, this.assetCallback);
    this.message = "Descargando iconos de campeon...";
    await this.helper.getChampions(APP_CONFIG.CHAMPIONS_PATH_URL, APP_CONFIG.CHAMPIONS_URL, APP_CONFIG.CHAMPIONS, this.assetCallback);
  }

  assetCallback(max: number, index: number, nombreActual: string) {
    this.actualFile = nombreActual;
    this.actualPercentage = (index / max) * 100;
  }
}
