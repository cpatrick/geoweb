/**
 * @module ogs.vgl
 */

/**
 * Create a new instance of class interactorStyle
 *
 * @class vglModule.interactorStyle
 * @desc interactorStyle is a base class for all interactor styles
 * @returns {vglModule.interactorStyle}
 */
vglModule.interactorStyle = function() {

  if (!(this instanceof vglModule.interactorStyle)) {
    return new vglModule.interactorStyle();
  }
  vglModule.object.call(this);

  // Private member variables
  var m_that = this;
  var m_viewer = null;

  this.viewer = function() {
    return m_viewer;
  };

  this.setViewer = function(viewer) {
    if (viewer !== m_viewer) {
      m_viewer = viewer;
      $(m_viewer).on(vglModule.command.mousePressEvent, m_that.handleMouseDown);
      $(m_viewer).on(vglModule.command.mousePressEvent, m_that.handleMouseUp);
      $(m_viewer).on(vglModule.command.mouseMoveEvent, m_that.handleMouseMove);
      $(m_viewer).on(vglModule.command.keyPressEvent, m_that.handleKeyPress);
      $(m_viewer).on(vglModule.command.mouseContextMenuEvent,
                     m_that.handleContextMenu);
      this.modified();
    }
  };

  this.handleMouseDown = function(event) {
    console.log("mouse move2");
  };

  this.handleMouseUp = function(event) {
    console.log("mouse move2");
  };

  this.handleMouseMove = function(event) {
    console.log("mouse move2");
  };

  this.handleKeyPress = function(event) {
    console.log("mouse move2");
  };

  this.handleContextMenu = function(event) {
    return false;
  };

  return this;
};

inherit(vglModule.interactorStyle, vglModule.object);