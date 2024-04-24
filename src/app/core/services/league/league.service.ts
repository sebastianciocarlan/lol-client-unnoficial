import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import * as league from 'league-connect';
import * as http2 from 'http2';
@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  riotService!: typeof league;
  constructor(private electronService: ElectronService) {
    if(this.isElectron){
    this.riotService = (window as any).require('league-connect');
    }
   }
   ws :league.LeagueWebSocket | undefined;
   auth :league.Credentials | undefined;
   httpSession :http2.ClientHttp2Session | undefined;
     async init(wsOptions:league.ConnectionOptions) {
      if(this.ws && this.auth && this.httpSession) return;
      this.ws = await this.riotService.createWebSocketConnection(wsOptions)
      this.auth = await this.riotService.authenticate()
      this.httpSession = await this.riotService.createHttpSession(this.auth)
    }
    async makeRequest(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', url:string, data:any) {
      return await this.riotService.createHttp2Request({
          method: method,
          url: url,
          body: data
      },this.httpSession!,this.auth!)
  }
    private get isElectron(): boolean {
      return !!(window && window.process && window.process.type);
    }
}
