import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import videojs from 'video.js';
import { UniqueIdService } from '../services/unique-id/unique-id.service.spec';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.page.html',
  styleUrls: ['./video-page.page.scss'],
})
export class VideoPagePage implements OnInit {
  @ViewChild('player', { static: false }) video: ElementRef | undefined;
  player: any;
  videoElement: any;
  qualityLevels: any;
  source =
    'https://sabconetanw.cdn.mangomolo.com/news/smil:news.stream.smil/playlist.m3u8?stime=20240207012615&etime=20240214052755&token=0687e851763221714a27a';
  constructor(
    private http: HttpClient,
    private uniqueIDServive: UniqueIdService
  ) {}
  ngOnInit(): void {
    //   const src = document.createElement('source');
    //   src.src = this.source;
    //   document.getElementById('player')?.appendChild(src);
    //   this.player = videojs(
    //     document.getElementById('player') as HTMLVideoElement
    //   );
    // }

    document.querySelectorAll('button').forEach((x) => {
      x.addEventListener('click', () => {
        alert('OK');
      });
    });

    let p = document.getElementsByClassName('vjs-big-play-button');
    document
      .getElementsByClassName('vjs-big-play-button')
      .item(0)
      ?.addEventListener('click', () => {
        alert('Pressed');
      });
    this.player = videojs('player');

    this.player.src(
      'hhttps://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8'
    );
    this.player.on('play', () => {
      alert('ok');
    });
    //this.player.qualityLevels();

    let qualityLevels = this.player.qualityLevels();

    // disable quality levels with less than 720 horizontal lines of resolution when added
    // to the list.
    qualityLevels.on('addqualitylevel', function (event: any) {
      let qualityLevel = event.qualityLevel;

      if (qualityLevel.height >= 720) {
        qualityLevel.enabled = true;
      } else {
        qualityLevel.enabled = false;
      }
    });

    // example function that will toggle quality levels between SD and HD, defining and HD
    // quality as having 720 horizontal lines of resolution or more
    let toggleQuality = (function () {
      let enable720 = true;

      return function () {
        for (let qualityLevel of qualityLevels) {
          if (qualityLevel.height >= 720) {
            qualityLevel.enabled = enable720;
          } else {
            qualityLevel.enabled = !enable720;
          }
        }
        enable720 = !enable720;
      };
    })();

    let currentSelectedQualityLevelIndex = qualityLevels.selectedIndex; // -1 if no level selected

    // Listen to change events for when the player selects a new quality level
    qualityLevels.on('change', function () {
      console.log('Quality Level changed!');
      console.log('New level:', qualityLevels[qualityLevels.selectedIndex]);
    });
  }

  changeStream() {
    this.http
      .get(
        'https://admin.mangomolo.com/analytics/index.php/plus/getchanneldetails?key=a970e24e7a7cca3a5e97bfe5d708a9dd&user_id=194&channel_id=324&need_playback=yes'
      )
      .subscribe((response) => {
        alert(response);
      });
    // fetch(
    //   'https://admin.mangomolo.com/analytics/index.php/plus/getchanneldetails?key=a970e24e7a7cca3a5e97bfe5d708a9dd&user_id=194&channel_id=324&need_playback=yes'
    // ).then((res) => alert(res.json()));
    // fetch(
    //   'https://beacon.mangomolo.com/analytics/index.php/crosssitestats/UpdateOnline',
    //   {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       userid: 194,
    //       channelid: 324,
    //       sessionid: ' o3w7TK2HZi9i30giZ0P1pKE0KPbcEnq9',
    //       browserOS: null,
    //       device: 3,
    //       app_id: 40,
    //       /* other post data */
    //     }),
    //   }
    // )
    //   .then((res) => res.json())
    //   .then(console.log);
    //this.player.src('');
    // const src = document.createElement('source');
    // src.src =
    //   'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8';
    // const vid = document.getElementById('player');
    // //vid?.removeChild(vid.firstElementChild!);
    // vid?.firstElementChild?.setAttribute(
    //   'src',
    //   'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8'
    // );
    //div.innerHTML = '<p>Image</p>';
    // '<video' +
    // "id='player'" +
    // "class='video-js vjs-styles-defaults'" +
    // 'controls' +
    // 'muted' +
    // "width='350px'" +
    // "height='225px'" +
    // "data-setup='{}'" +
    // '>' +
    // '<source' +
    // "src='https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8'" +
    // "type='application/x-mpegURL'" +
    // '/>' +
    // '</video>';
  }

  showMeUniqueID(): void {
    this.http
      .post(
        'http://another-one.local/wp-json/techiepress/v1/receive-callback?name=1234564&pass=56456',
        {}
      )
      .subscribe((d) => console.log(d));
  }
}
