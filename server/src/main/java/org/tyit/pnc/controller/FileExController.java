/*
 * Copyright 2018 Yash D. Saraf, Raees R. Mulla and Sachin S. Negi.
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
package org.tyit.pnc.controller;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.tyit.pnc.service.FileExService;

/**
 *
 * @author Yash D. Saraf <yashdsaraf@gmail.com>
 */
@RestController
@RequestMapping("/file-ex")
public class FileExController {

  @Autowired
  private FileExService fileExService;

  @GetMapping
  public ResponseEntity<String> getFileTree(HttpServletRequest request) {
    try {
      return ResponseEntity.ok(fileExService.getFileTree(request.getSession()));
    } catch (Exception ex) {
      Logger.getLogger(FileExController.class.getName()).log(Level.SEVERE, null, ex);
      return new ResponseEntity(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping("/file")
  public ResponseEntity<String> getFile(HttpServletRequest request,
          @RequestParam("file") String fileName,
          @RequestParam("parent") String parent) {
    try {
      return ResponseEntity.ok(fileExService.getFile(request.getSession(), fileName, parent));
    } catch (Exception ex) {
      Logger.getLogger(FileExController.class.getName()).log(Level.SEVERE, null, ex);
      return new ResponseEntity(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping
  public ResponseEntity<String> create(HttpServletRequest request,
          @RequestParam("file") String fileName,
          @RequestParam("parent") String parent,
          @RequestParam("isDir") boolean isDir) {
    try {
      fileExService.create(request.getSession(), fileName, parent, isDir);
    } catch (Exception ex) {
      Logger.getLogger(FileExController.class.getName()).log(Level.SEVERE, null, ex);
      return new ResponseEntity(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok().build();
  }

  @DeleteMapping
  public ResponseEntity<String> delete(HttpServletRequest request,
          @RequestParam("file") String fileName,
          @RequestParam("parent") String parent) {
    try {
      fileExService.delete(request.getSession(), fileName, parent);
    } catch (Exception ex) {
      Logger.getLogger(FileExController.class.getName()).log(Level.SEVERE, null, ex);
      return new ResponseEntity(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok().build();
  }

  @PostMapping("/rename")
  public ResponseEntity<String> rename(HttpServletRequest request,
          @RequestParam("file") String filename,
          @RequestParam("parent") String parent,
          @RequestParam("newname") String newname) {
    try {
      fileExService.rename(request.getSession(), filename, parent, newname);
    } catch (Exception ex) {
      Logger.getLogger(FileExController.class.getName()).log(Level.SEVERE, null, ex);
      return new ResponseEntity(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok().build();
  }

  @PostMapping("/move")
  public ResponseEntity<String> move(HttpServletRequest request,
          @RequestParam("file") String filename,
          @RequestParam("oldparent") String oldParent,
          @RequestParam("newparent") String newParent) {
    try {
      fileExService.copy(request.getSession(), filename, oldParent, newParent, true);
    } catch (Exception ex) {
      Logger.getLogger(FileExController.class.getName()).log(Level.SEVERE, null, ex);
      return new ResponseEntity(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok().build();
  }

  @PostMapping("/copy")
  public ResponseEntity<String> copy(HttpServletRequest request,
          @RequestParam("file") String filename,
          @RequestParam("oldparent") String oldParent,
          @RequestParam("newparent") String newParent) {
    try {
      fileExService.copy(request.getSession(), filename, oldParent, newParent, false);
    } catch (Exception ex) {
      Logger.getLogger(FileExController.class.getName()).log(Level.SEVERE, null, ex);
      return new ResponseEntity(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok().build();
  }

}