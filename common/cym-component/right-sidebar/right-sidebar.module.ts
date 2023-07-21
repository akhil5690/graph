import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RightSidebarComponent} from "./right-sidebar.component";
import {TableModule} from "primeng/table";
import {TableComponent} from "../table/table.component";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {SignInModule} from "../../../apps/webApp/src/app/widgets/sign-in/sign-in.module";
import {AutoCompleteModule} from "primeng/autocomplete";
import {CheckboxModule} from "primeng/checkbox";
import {DetailsComponent} from "../details/details.component";
import {InputTextModule} from "primeng/inputtext";
import {CymDividerModule} from "../../cym-containers/cym-divider/cym-divider.module";

@NgModule({
    declarations: [
        RightSidebarComponent,
        TableComponent,
        DetailsComponent
    ],
    exports: [
        RightSidebarComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        DropdownModule,
        FormsModule,
        SignInModule,
        AutoCompleteModule,
        CheckboxModule,
        InputTextModule,
        CymDividerModule
    ]
})
export class RightSidebarModule { }
