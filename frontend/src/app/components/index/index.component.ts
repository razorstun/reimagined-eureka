/*
 * Copyright 2017 Yash D. Saraf, Raees R. Mulla and Sachin S. Negi.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core'
import {
  animate,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations'
import {ActivatedRoute} from '@angular/router'

import 'codemirror/mode/clike/clike'
import 'codemirror/mode/python/python'
import 'codemirror/mode/php/php'
import 'codemirror/mode/ruby/ruby'
import {FlashMessagesService} from 'angular2-flash-messages'

import {CoreService} from '../../services/core.service'
import {ProgressBarService} from '../../services/progress-bar.service'
import {isMobile} from '../../app.component'
import {Output} from '../../models/output'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass'],
  animations: [trigger('sidebarAnimation', [
    transition(':enter', [
      style({width: 0, opacity: 0}),
      animate(400, keyframes([
        style({width: '0', opacity: .25, offset: 0}),
        style({width: '*', opacity: .55, offset: .5}),
        style({width: '*', opacity: 1, offset: 1})
      ]))
    ]),
    transition(':leave', [
      style({width: '*', opacity: 1}),
      animate(300, keyframes([
        style({width: '*', opacity: 1, offset: 0}),
        style({width: '0', opacity: .55, offset: 1})
      ]))
    ])
  ])]
})
export class IndexComponent implements OnInit {

  @ViewChild('editor') editorView
  isNavOpen = true
  isMobile: boolean
  editorConfig = {lineNumbers: true, mode: ''}
  editor: any
  output: Output = {
    stderr: '',
    stdout: ''
  }
  openFile: string

  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService,
    private flashMessagesService: FlashMessagesService,
    private progressBarService: ProgressBarService
  ) {
    this.isMobile = isMobile
    this.openFile = route.snapshot.params.openfile
    this.editorConfig.mode = route.snapshot.params.mode
  }

  ngOnInit(): void {
    this.isNavOpen = !this.isMobile
  }

  ngAfterViewInit() {
    this.editor = this.editorView.instance
    this.editor.setSize(null, '57vh')
  }

  executeTool(tool: string) {
    switch(tool) {
      case 'run':
        this.output = {stderr:'', stdout:''}
        this.progressBarService.show(null, "Executing the project")
        let code = {}
        code[this.openFile] = this.editor.getValue()
        this.coreService.runProject(code).subscribe(
          (data: Output) => {
            this.output = data
            this.progressBarService.dismiss()
          },
          err => {
            this.progressBarService.dismiss()
            this.flashMessagesService.show(err, {
              cssClass: 'ui error message', timeout: 4000
            })
          }
        )
        break
    }
  }

}
