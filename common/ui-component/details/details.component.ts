import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnChanges, OnInit {
  data !: any
  headers!: string[]

  @Input() type: string | undefined;// editor or graph
  @Input() info: any;
  @Output() property = new EventEmitter()
  edgeForm: { [key: string]: string } = {};
  nodeForm: { [key: string]: string } = {};

  ngOnChanges(): void {
    // this.headers = Object.keys(this.data[0]);
    this.getForm();
  }

  getForm() {
    if (this.info[0].source && this.info[0].target) {
      this.edgeForm = {
        id: this.info[0].id,
        label: this.info[0].label,
        source: this.info[0].source,
        target: this.info[0].target,
      };
    } else {
      this.nodeForm = {
        id: this.info[0].id,
        label: this.info[0].label,
        source: this.info[0].source,
        target: this.info[0].target,
      };
    }
  }

  ngOnInit(): void {
    this.data = [
      {
        "description": "In Django 3.2 before 3.2.19, 4.x before 4.1.9, and 4.2 before 4.2.1, it was possible to bypass " +
          "validation when using one form field to upload multiple files. This multiple upload has never been supported " +
          "by forms.FileField or forms.ImageField (only the last uploaded file was validated). However, Django's \"Uploading " +
          "multiple files\" documentation suggested otherwise.",
        "id": "arn:aws:1232342",
        "label": "CVE-2023-31047 - django",
        "groups": [
          {
            "overview": [
              {
                "account_id": "742352861411",
                "severity": "CRITICAL"
              }
            ],
            "affected_package": [
              {
                "name": "django",
                "installed_version": "0:4.1.7 /4.2.1"
              }
            ]
          }
        ]
      }
    ];
    this.headers = Object.keys(this.data[0]);
  }

  isSeverity(header: string) {
    return header === 'severity';
  }

  getStyleForSeverity(item: any, header: string) {
    if (this.isSeverity(header)) {
      // return {backgroundColor: this.data[0].vertex_color};
      return {backgroundColor: 'red'};
    }
    return;
  }


  typeOf(itemElement: any) {
    return typeof itemElement;
  }


  getHeader(i: any) {
    return Object.keys(i)
  }

  readable(groupItem: string) {
    return groupItem.replace('_', ' ')
  }

  submit(form: any) {
    console.log(form);
    this.property.emit(form)
  }
}
