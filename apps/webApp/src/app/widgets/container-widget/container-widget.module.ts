import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {SignInModule} from "../sign-in/sign-in.module";
import {GraphModule} from "../../../../../../common/cym-component/graph/graph.module";
import {HttpClientModule} from "@angular/common/http";
import {GraphService} from "../../../../../../common/cym-services/graph/graph.service";
import {WidgetFrameModule} from "../../../../../../common/cym-component/frames/widget-frame/widget-frame.module";
import {RightSidebarModule} from "../../../../../../common/cym-component/right-sidebar/right-sidebar.module";
import {HttpHandler} from "../../../../../../common/utils/httpHandler";
import {TabViewModule} from "primeng/tabview";
import {GraphEditorModule} from "../../../../../../common/cym-component/graph-editor/graph-editor.module";
import {ContainerWidgetComponent} from "./container-widget.component";
import {CymAccordionModule} from "../../../../../../common/cym-containers/cym-accordion/cym-accordion.module";
import {CymCardModule} from "../../../../../../common/cym-containers/cym-card/cym-card.module";
import {CymDividerModule} from "../../../../../../common/cym-containers/cym-divider/cym-divider.module";
import {CymFieldsetModule} from "../../../../../../common/cym-containers/cym-fieldset/cym-fieldset.module";
import {CymPanelModule} from "../../../../../../common/cym-containers/cym-panel/cym-panel.module";
import {CymSplitterModule} from "../../../../../../common/cym-containers/cym-splitter/cym-splitter.module";
import {CymScrollPanelModule} from "../../../../../../common/cym-containers/cym-scroll-panel/cym-scroll-panel.module";
import {CymTabViewModule} from "../../../../../../common/cym-containers/cym-tab-view/cym-tab-view.module";
import {CymToolbarModule} from "../../../../../../common/cym-containers/cym-toolbar/cym-toolbar.module";
import {CymDivModule} from "../../../../../../common/cym-containers/cym-div/cym-div.module";
@NgModule({
  declarations: [
    ContainerWidgetComponent,

  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    SignInModule,
    GraphModule,
    RightSidebarModule,
    HttpClientModule,
    WidgetFrameModule,
    TabViewModule,
    GraphEditorModule,
    CymAccordionModule,
    CymCardModule,
    CymDividerModule,
    CymFieldsetModule,
    CymPanelModule,
    CymSplitterModule,
    CymScrollPanelModule,
    CymTabViewModule,
    CymToolbarModule,
    CymDivModule,
  ],
  providers:[GraphService,HttpHandler],
  exports: [ContainerWidgetComponent]
})
export class ContainerWidgetModule { }
