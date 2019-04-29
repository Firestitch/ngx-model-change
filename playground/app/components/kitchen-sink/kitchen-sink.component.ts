import { Component } from '@angular/core';
import { ConfigureComponent } from '../configure';
import { FsExampleComponent } from '@firestitch/example';
import { FsMessage } from '@firestitch/message';

@Component({
  selector: 'kitchen-sink',
  templateUrl: 'kitchen-sink.component.html',
  styleUrls: ['kitchen-sink.component.scss']
})
export class KitchenSinkComponent {

  public blur = '';
  public delay = '';

  constructor(private message: FsMessage) {}

  delayChange() {
    this.message.success('Delay Change');
  }

  blurChange() {
    this.message.success('Blur Change');
  }
}