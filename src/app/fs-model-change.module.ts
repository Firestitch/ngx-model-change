import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsModelChangeDirective } from './directives/model-change.directive';



@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsModelChangeDirective,
  ],
  declarations: [
    FsModelChangeDirective,
  ],
})
export class FsModelChangeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsModelChangeModule,
      // providers: [FsComponentService]
    };
  }
}
