import { Component, OnInit } from '@angular/core';
import * as YouTubePlayer from 'youtube-player';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AppService ]
})

export class AppComponent implements OnInit {

    player: any;
    currentState;
    videos: string[] = [
        "M7lc1UVf-VE",
        "BR9h47Jtqyw",
        "dz_jeuWx3j0",
        "Nj2YSLPn6OY"
    ];
    currentVideoIndex: number = 0;
    buttonText = "Pause";
    stateNames: any = {
        '-1': 'unstarted',
        '0': 'ended',
        '1': 'playing',
        '2': 'paused',
        '3': 'buffering',
        '5': 'video cued'
    };

    constructor(private appService : AppService)
    {
    } 

    ngOnInit(): void {
        this.player = YouTubePlayer('video-player', {
            width: 300,
            height: 250,
            playerVars: {
                controls:0,
                disablekb: 1,
                showinfo: 0,
                rel: 0,
                modestBranding: 1
            }
        });
        let currentVideoId = this.videos[this.currentVideoIndex];
        this.loadVideo(currentVideoId);
        this.player.playVideo();
        let me = this;
        this.player.on('stateChange', function (event) {
            console.log(event.data);   
            me.currentState = me.stateNames[event.data];
        });
        
    }

    skip10Seconds() {
        var currTime = this.player.getCurrentTime();
        var me = this;
        currTime.then((x) =>
        {
            console.log(x);
            this.player.seekTo(x + 10, true);
        });
    }

    previousVideo() {
        if(this.currentVideoIndex == 0)
        {
            this.currentVideoIndex = this.videos.length - 1;
        }
        else
        {
            this.currentVideoIndex--;
        }
        this.loadVideo(this.videos[this.currentVideoIndex]);
    }

    nextVideo() {
        if(this.currentVideoIndex == this.videos.length - 1)
        {
            this.currentVideoIndex = 0;
        }
        else
        {
            this.currentVideoIndex++;
        }
        this.loadVideo(this.videos[this.currentVideoIndex]);
    }

    loadVideo(id: string) {
        this.player.loadVideoById(id);
        let result = this.appService.getVideoData(id);
        console.log(result);
    }

    pauseResume() {
        console.log(this.player);
        this.player.getOptions().then((x) => {
            console.log(x);
        });
        
        console.log(this.currentState);
        this.buttonText = "asdfasdf";
        if(this.currentState == 'playing')
        {
            this.buttonText = "Play";
            this.player.pauseVideo();
        }
        else
        {
            this.buttonText = "Pause";
            this.player.playVideo();
        }
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
