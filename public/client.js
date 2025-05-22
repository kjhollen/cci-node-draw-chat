/* Draw remotely with other people!
 *
 * JavaScript code for a website that sets up p5.js and talks
 * to another client using socket.io.
 * 
 * update the setup, draw, and p5.js event functions as you need to
 * for your interactions. you can also mix this with the other JavaScript
 * methods we've been using for event handling, styling, etc.
 */

const SOCKET_URL = window.location.host;
const socket = io.connect(SOCKET_URL);

// will hold on to the p5.js canvas for us.
let p5Canvas;

// grab a few HTML elements that we'll need using regular JavaScript
const sendButton = document.getElementById("sendButton");
const chatHistory = document.getElementById("chatHistory");

// set up the sketch canvas and socket connection,
// including callback function for when the socket receives data.
function setup() {
  // set the canvas to be inside of our "localCanvas" div,
  // so that we can better plan for styling on the page
  // and account for other HTML elements we might add.
  p5Canvas = createCanvas(300, 200);
  p5Canvas.parent("localCanvas");
  
  background(51); 
  
  // sets up socket connection for communicating with server,
  // DO NOT DELETE!
  socket.on("image", onReceiveImage);
}

/**
 * JavaScript event listener for the send button, which grabs
 * the image data from the p5.js canvas and encodes it to send
 * over the web socket.
 */
sendButton.addEventListener("click", function(event) {
  // create an object for the data:
  let data = {
    // p5Canvas.elt gets the raw <canvas> element on the page,
    // and toDataURL() encodes the image data from the canvas
    // into a format that can be sent via socket.io
    src: p5Canvas.elt.toDataURL()
  };

  // send the message (name of message is image)
  socket.emit("image", data);

  // clear out our side: drawing is sent as a message.
  background(51);
});

function mouseDragged() {
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 10, 10);
}

// This function is called when the server sends this
// client a message (see setup() function for where this is configured)
function onReceiveImage(data) {
  // Input data (from server) processing here. --->

  console.log(data);

  // add image element to page, in a list item as part
  // of the chat-history unordered list:

  // the chat history is a ul (unordered list), so every
  // message it contains is an li (list item). we'll start
  // by making a new list item to contain the content and
  // assign it an appropriate class from our CSS.
  let newMessageElement = document.createElement("li");
  newMessageElement.classList.add("message");

  let newImg = document.createElement("img");
  newImg.src = data.src;

  newMessageElement.appendChild(newImg);
  chatHistory.appendChild(newMessageElement);

  // and autoscroll to the bottom of the chat history,
  // since our new message is displayed at the bottom
  // and we want to be able to see it
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function draw() {}

/* leave this here so that Glitch will not mark global p5.js functions as errors */
/* globals ADD, ALT, ARROW, AUDIO, AUTO, AXES, BACKSPACE, BASELINE, BEVEL, BEZIER, BLEND, BLUR, BOLD, BOLDITALIC, BOTTOM, BURN, CENTER, CHORD, CLAMP, CLOSE, CONTROL, CORNER, CORNERS, CROSS, CURVE, DARKEST, DEGREES, DEG_TO_RAD, DELETE, DIFFERENCE, DILATE, DODGE, DOWN_ARROW, ENTER, ERODE, ESCAPE, EXCLUSION, FALLBACK, FILL, GRAY, GRID, HALF_PI, HAND, HARD_LIGHT, HSB, HSL, IMAGE, IMMEDIATE, INVERT, ITALIC, LABEL, LANDSCAPE, LEFT, LEFT_ARROW, LIGHTEST, LINEAR, LINES, LINE_LOOP, LINE_STRIP, MIRROR, MITER, MOVE, MULTIPLY, NEAREST, NORMAL, OPAQUE, OPEN, OPTION, OVERLAY, P2D, PI, PIE, POINTS, PORTRAIT, POSTERIZE, PROJECT, QUADRATIC, QUADS, QUAD_STRIP, QUARTER_PI, RADIANS, RADIUS, RAD_TO_DEG, REMOVE, REPEAT, REPLACE, RETURN, RGB, RIGHT, RIGHT_ARROW, ROUND, SCREEN, SHIFT, SOFT_LIGHT, SQUARE, STROKE, SUBTRACT, TAB, TAU, TESS, TEXT, TEXTURE, THRESHOLD, TOP, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, TWO_PI, UP_ARROW, VIDEO, WAIT, WEBGL, accelerationX, accelerationY, accelerationZ, deltaTime, deviceOrientation, displayHeight, displayWidth, focused, frameCount, height, isKeyPressed, key, keyCode, keyIsPressed, mouseButton, mouseIsPressed, mouseX, mouseY, movedX, movedY, pAccelerationX, pAccelerationY, pAccelerationZ, pRotateDirectionX, pRotateDirectionY, pRotateDirectionZ, pRotationX, pRotationY, pRotationZ, pixels, pmouseX, pmouseY, pwinMouseX, pwinMouseY, rotationX, rotationY, rotationZ, touches, turnAxis, width, winMouseX, winMouseY, windowHeight, windowWidth, abs, acos, alpha, ambientLight, ambientMaterial, angleMode, append, applyMatrix, arc, arrayCopy, asin, atan, atan2, background, beginContour, beginShape, bezier, bezierDetail, bezierPoint, bezierTangent, bezierVertex, blend, blendMode, blue, boolean, box, brightness, byte, camera, ceil, char, circle, clear, clearStorage, color, colorMode, concat, cone, constrain, copy, cos, createA, createAudio, createButton, createCamera, createCanvas, createCapture, createCheckbox, createColorPicker, createDiv, createElement, createFileInput, createGraphics, createImage, createImg, createInput, createNumberDict, createP, createRadio, createSelect, createShader, createSlider, createSpan, createStringDict, createVector, createVideo, createWriter, cursor, curve, curveDetail, curvePoint, curveTangent, curveTightness, curveVertex, cylinder, day, debugMode, degrees, describe, describeElement, directionalLight, displayDensity, dist, downloadFile, ellipse, ellipseMode, ellipsoid, emissiveMaterial, endContour, endShape, erase, exitPointerLock, exp, fill, filter, float, floor, fract, frameRate, frustum, fullscreen, get, getFrameRate, getItem, getURL, getURLParams, getURLPath, green, gridOutput, hex, hour, httpDo, httpGet, httpPost, hue, image, imageMode, int, isLooping, join, keyIsDown, lerp, lerpColor, lightFalloff, lightness, lights, line, loadBytes, loadFont, loadImage, loadJSON, loadModel, loadPixels, loadShader, loadStrings, loadTable, loadXML, log, loop, mag, map, match, matchAll, max, millis, min, minute, model, month, nf, nfc, nfp, nfs, noCanvas, noCursor, noDebugMode, noErase, noFill, noLights, noLoop, noSmooth, noStroke, noTint, noise, noiseDetail, noiseSeed, norm, normalMaterial, orbitControl, ortho, perspective, pixelDensity, plane, point, pointLight, pop, popMatrix, popStyle, pow, print, push, pushMatrix, pushStyle, quad, quadraticVertex, radians, random, randomGaussian, randomSeed, rect, rectMode, red, redraw, registerPromisePreload, removeElements, removeItem, requestPointerLock, resetMatrix, resetShader, resizeCanvas, reverse, rotate, rotateX, rotateY, rotateZ, round, saturation, save, saveCanvas, saveFrames, saveGif, saveJSON, saveJSONArray, saveJSONObject, saveStrings, saveTable, scale, second, select, selectAll, set, setAttributes, setCamera, setFrameRate, setMoveThreshold, setShakeThreshold, shader, shearX, shearY, shininess, shorten, shuffle, sin, smooth, sort, specularColor, specularMaterial, sphere, splice, split, splitTokens, spotLight, sq, sqrt, square, storeItem, str, stroke, strokeCap, strokeJoin, strokeWeight, subset, tan, text, textAlign, textAscent, textDescent, textFont, textLeading, textOutput, textSize, textStyle, textWidth, texture, textureMode, textureWrap, tint, torus, translate, triangle, trim, unchar, unhex, updatePixels, vertex, writeFile, year */
