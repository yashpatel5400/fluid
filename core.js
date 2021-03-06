/*============== Creating a canvas ====================*/
var canvas = document.getElementById('canvas');
gl = canvas.getContext('webgl2');
      
/*======== Defining and storing the geometry ===========*/

var vertices = [
   -0.5,0.5,0.0,
   -0.5,-0.5,0.0,
   0.5,-0.5,0.0, 
];
         
indices = [0,1,2];

var vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

var Index_Buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

/*================ Shaders ====================*/
var vertCode =
   'attribute vec3 coordinates;' +
       
   'void main(void) {' +
      ' gl_Position = vec4(coordinates, 1.0);' +
   '}';
var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

//fragment shader source code
var fragCode =
   'void main(void) {' +
      ' gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' +
   '}';

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode); 
gl.compileShader(fragShader);

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

/*======= Associating shaders to buffer objects =======*/
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
var coord = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 
gl.enableVertexAttribArray(coord);

/*=========Drawing the triangle===========*/
gl.clearColor(0.5, 0.5, 0.5, 0.9);
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0,0,canvas.width,canvas.height);
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);