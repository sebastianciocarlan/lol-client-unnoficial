import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { LeagueService } from '../core/services/league/league.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {
  constructor(private router: Router,private leagueService: LeagueService) { }
  chart:any
  friends:any
  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
      data: {
        // values on X-Axis

        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Soloq",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'silver',
            borderColor: 'white',

          },
          {
            label: "Flex",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'gold',
            borderColor: 'white',
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

  async ngOnInit(): Promise<void> {
    await this.leagueService.init({})
    await this.updateFriendList()
    this.leagueService.ws?.subscribe('/lol-chat/v1/friend-counts',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      ()=>{this.leagueService.getFriendList().then((data)=>this.friends = data.json()).catch((err)=>console.log(err))}
    )
    console.log(this.friends)
    this.createChart();
    if (this.isUserInGame()) {
      await this.router.navigate(['ingame']);
    }
    if (this.isUserInLobby()) {
      await this.router.navigate(['lobby']);
    }
  }
 async updateFriendList(){
    this.friends = (await this.leagueService.getFriendList()).json()
  }
  startUpdatingFriendList(){

    const request = this.leagueService.makeRequestSync('GET','/lol-chat/v1/friends',null)
    request.then((data)=>{
      const json = data.json()
      //find the friend in json array that his gameName == arturo238
      console.log("Evento fireado")
      const friend = (<any>json).find((friend:any) => friend.gameName === 'arturo238')
      console.log(friend)

      this.friends = data.json()
    }).catch((err)=>{
      console.log(err)
    })
    
  }
  //TODO check if user is in game
  isUserInGame(): boolean {
    return false;
  }
  isUserInLobby(): boolean {
    return false;
  }
}
