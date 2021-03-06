/*
Copyright (c) 2019 The Khronos Group Inc.
Use of this source code is governed by an MIT-style license that can be
found in the LICENSE.txt file.
*/

// ArgGenerators contains argument generators for WebGL functions.
// The argument generators are used for running random tests against the WebGL
// functions.
//
// ArgGenerators is an object consisting of functionName : argGen -properties.
//
// functionName is a WebGL context function name and the argGen is an argument
// generator object that encapsulates the requirements to run
// randomly generated tests on the WebGL function.
//
// An argGen object has the following methods:
//   - setup    -- set up state for testing the GL function, returns values
//                 that need cleanup in teardown. Run once before entering a
//                 test loop.
//   - teardown -- do cleanup on setup's return values after testing is complete
//   - generate -- generate a valid set of random arguments for the GL function
//   - returnValueCleanup -- do cleanup on value returned by the tested GL function
//   - cleanup  -- do cleanup on generated arguments from generate
//   - checkArgValidity -- check if passed args are valid. Has a call signature
//                         that matches generate's return value. Returns true
//                         if args are valid, false if not.
//
//   Example test loop that demonstrates how the function args and return
//   values flow together:
//
//   var setupArgs = argGen.setup();
//   for (var i=0; i<numberOfTests; i++) {
//     var generatedArgs = argGen.generate.apply(argGen, setupArgs);
//     var validArgs = argGen.checkArgValidity.apply(argGen, generatedArgs);
//     var rv = call the GL function with generatedArgs;
//     argGen.returnValueCleanup(rv);
//     argGen.cleanup.apply(argGen, generatedArgs);
//   }
//   argGen.teardown.apply(argGen, setupArgs);
//
ArgGenerators = {

// GL functions in alphabetical order

// G-2

  getAttribLocation : {
    generate : function() {
      var program = GL.createProgram();
      var name = randomName();
      GL.bindAttribLocation(program, randomVertexAttribute(), name);
      return [program, name];
    },
    checkArgValidity : function(program, name) {
      return GL.isProgram(program) && isValidName(name);
    },
    cleanup : function(program, name) {
      try { GL.deleteProgram(program); } catch(e) {}
    }
  },/*
  getParameter : {
    generate : function() { return [getParameterPname.random()]; },
    checkArgValidity : function(p) { return getParameterPname.has(p); }
  },
  getBufferParameter : {}, // FIXME
  getError : {
    generate : function() { return []; }
  },
  getFramebufferAttachmentParameter : {}, // FIXME
  getProgramParameter : {}, // FIXME
  getProgramInfoLog : {}, // FIXME
  getRenderbufferParameter : {}, // FIXME
  getShaderParameter : {}, // FIXME
  getShaderInfoLog : {}, // FIXME
  getShaderSource : {}, // FIXME
  getTexParameter : {}, // FIXME
  getUniform : {}, // FIXME
  getUniformLocation : {}, // FIXME
  getVertexAttrib : {}, // FIXME
  getVertexAttribOffset : {}, // FIXME

// H

  hint : {
    generate : function() { return [GL.GENERATE_MIPMAP_HINT, mipmapHint.random()]; },
    checkValidArgs : function(h, m) {
      return h == GL.GENERATE_MIPMAP_HINT && mipmapHint.has(m);
    },
    teardown : function(){ GL.hint(GL.GENERATE_MIPMAP_HINT, GL.DONT_CARE); }
  },

// I

  isBuffer : {
    generate : function() { return [GL.createBuffer()]; },
    cleanup : function(o) { try { GL.deleteBuffer(o); } catch(e) {} }
  },
  isEnabled : {
    generate : function() { return [enableCap.random()]; },
    checkArgValidity : function(c) { return enableCap.has(c); }
  },
  isFramebuffer : {
    generate : function() { return [GL.createFramebuffer()]; },
    cleanup : function(o) { try { GL.deleteFramebuffer(o); } catch(e) {} }
  },
  isProgram : {
    generate : function() { return [GL.createProgram()]; },
    cleanup : function(o) { try { GL.deleteProgram(o); } catch(e) {} }
  },
  isRenderbuffer : {
    generate : function() { return [GL.createRenderbuffer()]; },
    cleanup : function(o) { try { GL.deleteRenderbuffer(o); } catch(e) {} }
  },
  isShader : {
    generate : function() { return [GL.createShader(shaderType.random())]; },
    cleanup : function(o) { try { GL.deleteShader(o); } catch(e) {} }
  },
  isTexture : {
    generate : function() { return [GL.createTexture()]; },
    cleanup : function(o) { try { GL.deleteTexture(o); } catch(e) {} }
  }*/

};
