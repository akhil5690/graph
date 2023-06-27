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
import {
    CymConfirmDialogModule
} from "../../../../../../common/cym-containers/cym-overlay/cym-confirm-dialog/cym-confirm-dialog.module";
import {
  CymConfirmPopupModule
} from "../../../../../../common/cym-containers/cym-overlay/cym-confirm-popup/cym-confirm-popup.module";
import {CymDialogModule} from "../../../../../../common/cym-containers/cym-overlay/cym-dialog/cym-dialog.module";
import {
  CymOverlayPanelModule
} from "../../../../../../common/cym-containers/cym-overlay/cym-overlay-panel/cym-overlay-panel.module";
import {CymSidebarModule} from "../../../../../../common/cym-containers/cym-overlay/cym-sidebar/cym-sidebar.module";
import {CymTooltipModule} from "../../../../../../common/cym-containers/cym-overlay/cym-tooltip/cym-tooltip.module";
import {CymInputModule} from "../../../../../../common/cym-component/form/cym-input/cym-input.module";
import {CymDropdownModule} from "../../../../../../common/cym-component/form/cym-dropdown/cym-dropdown.module";
import {CymToastModule} from "../../../../../../common/cym-containers/cym-pop-ups/cym-toast/cym-toast.module";
import {CymPasswordModule} from "../../../../../../common/cym-containers/cym-password/cym-password.module";
import {CymProfileModule} from "../../../../../../common/cym-containers/cym-profile/cym-profile.module";
import {
  CymCardDivisionModule
} from "../../../../../../common/cym-containers/cym-card-division/cym-card-division.module";
import {CymMenuModule} from "../../../../../../common/cym-containers/cym-menu/cym-menu.module";
import {CymColorPickerModule} from "../../../../../../common/cym-containers/cym-color-picker/cym-color-picker.module";
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
        CymConfirmDialogModule,
        CymConfirmPopupModule,
        CymDialogModule,
        CymOverlayPanelModule,
        CymSidebarModule,
        CymTooltipModule,
        CymInputModule,
        CymDropdownModule,
        CymToastModule,
        CymPasswordModule,
        CymProfileModule,
        CymCardDivisionModule,
        CymMenuModule,
        CymColorPickerModule,
    ],
  providers:[GraphService,HttpHandler],
  exports: [ContainerWidgetComponent]
})
export class ContainerWidgetModule { }
