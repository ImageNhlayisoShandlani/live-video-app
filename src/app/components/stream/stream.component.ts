import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

declare var videojs: any;
@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StreamComponent implements OnInit {
  @ViewChild('target', { static: true }) target!: ElementRef;
  @Input() videoLink!: string;
  options = {
    autoplay: false,
    notSupportedMessage: 'Invalid Video URL', // to change the default message
  };
  player!: any;
  qualityLevels: any;
  constructor() {}

  ngOnInit() {
    this.readyVideojsPlayer();
  }

  readyVideojsPlayer() {
    this.player = videojs(
      this.target.nativeElement,
      this.options,
      function () {}
    );

    this.player.src({
      src: this.videoLink,

      type: 'video/mp4',
    });
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
