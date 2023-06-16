import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {SignInModule} from "../sign-in/sign-in.module";
import {GraphModule} from "../../../../../../common/ui-component/graph/graph.module";
import {HttpClientModule} from "@angular/common/http";
import {GraphService} from "../../../../../../common/ui-services/graph/graph.service";
import {WidgetFrameModule} from "../../../../../../common/ui-component/frames/widget-frame/widget-frame.module";
import {RightSidebarModule} from "../../../../../../common/ui-component/right-sidebar/right-sidebar.module";
import {HttpHandler} from "../../../../../../common/utils/httpHandler";
import {TabViewModule} from "primeng/tabview";
import {GraphEditorModule} from "../../../../../../common/ui-component/graph-editor/graph-editor.module";
import {ContainerWidgetComponent} from "./container-widget.component";
import {UiAccordionModule} from "../../../../../../common/ui-containers/ui-accordion/ui-accordion.module";
import {UiCardModule} from "../../../../../../common/ui-containers/ui-card/ui-card.module";
import {UiDividerModule} from "../../../../../../common/ui-containers/ui-divider/ui-divider.module";
import {UiFieldsetModule} from "../../../../../../common/ui-containers/ui-fieldset/ui-fieldset.module";
import {UiPanelModule} from "../../../../../../common/ui-containers/ui-panel/ui-panel.module";
import {UiSplitterModule} from "../../../../../../common/ui-containers/ui-splitter/ui-splitter.module";
import {UiScrollPanelModule} from "../../../../../../common/ui-containers/ui-scroll-panel/ui-scroll-panel.module";
import {UiTabViewModule} from "../../../../../../common/ui-containers/ui-tab-view/ui-tab-view.module";
import {UiToolbarModule} from "../../../../../../common/ui-containers/ui-toolbar/ui-toolbar.module";
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
    UiAccordionModule,
    UiCardModule,
    UiDividerModule,
    UiFieldsetModule,
    UiPanelModule,
    UiSplitterModule,
    UiScrollPanelModule,
    UiTabViewModule,
    UiToolbarModule,
  ],
  providers:[GraphService,HttpHandler],
  exports: [ContainerWidgetComponent]
})
export class ContainerWidgetModule { }
