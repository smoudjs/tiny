import { PrimitiveShader } from '../shaders/PrimitiveShader';
import { PixiShader } from '../shaders/PixiShader';
import { ComplexPrimitiveShader } from '../shaders/ComplexPrimitiveShader';

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
* @class ShaderManager
* @constructor
* @private
*/
var ShaderManager = function()
{
    /**
     * @property maxAttibs
     * @type Number
     */
    this.maxAttibs = 10;

    /**
     * @property attribState
     * @type Array
     */
    this.attribState = [];

    /**
     * @property tempAttribState
     * @type Array
     */
    this.tempAttribState = [];

    for (var i = 0; i < this.maxAttibs; i++)
    {
        this.attribState[i] = false;
    }

    /**
     * @property stack
     * @type Array
     */
    this.stack = [];

};

ShaderManager.prototype.constructor = ShaderManager;

/**
* Initialises the context and the properties.
* 
* @method setContext 
* @param gl {WebGLContext} the current WebGL drawing context
*/
ShaderManager.prototype.setContext = function(gl)
{
    this.gl = gl;
    
    // the next one is used for rendering primitives
    this.primitiveShader = new PrimitiveShader(gl);

    // the next one is used for rendering triangle strips
    this.complexPrimitiveShader = new ComplexPrimitiveShader(gl);

    // this shader is used for the default sprite rendering
    this.defaultShader = new PixiShader(gl);

    // this shader is used for the fast sprite rendering
    // this.fastShader = new PIXI.PixiFastShader(gl);

    // the next one is used for rendering triangle strips
    // this.stripShader = new PIXI.StripShader(gl);
    this.setShader(this.defaultShader);
};

/**
* Takes the attributes given in parameters.
* 
* @method setAttribs
* @param attribs {Array} attribs 
*/
ShaderManager.prototype.setAttribs = function(attribs)
{
    // reset temp state
    var i;

    for (i = 0; i < this.tempAttribState.length; i++)
    {
        this.tempAttribState[i] = false;
    }

    // set the new attribs
    for (i = 0; i < attribs.length; i++)
    {
        var attribId = attribs[i];
        this.tempAttribState[attribId] = true;
    }

    var gl = this.gl;

    for (i = 0; i < this.attribState.length; i++)
    {
        if(this.attribState[i] !== this.tempAttribState[i])
        {
            this.attribState[i] = this.tempAttribState[i];

            if(this.tempAttribState[i])
            {
                gl.enableVertexAttribArray(i);
            }
            else
            {
                gl.disableVertexAttribArray(i);
            }
        }
    }
};

/**
* Sets the current shader.
* 
* @method setShader
* @param shader {Any}
*/
ShaderManager.prototype.setShader = function(shader)
{
    if(this._currentId === shader._UID)return false;
    
    this._currentId = shader._UID;

    this.currentShader = shader;

    this.gl.useProgram(shader.program);
    this.setAttribs(shader.attributes);

    return true;
};

/**
* Destroys this object.
* 
* @method destroy
*/
ShaderManager.prototype.destroy = function()
{
    this.attribState = null;

    this.tempAttribState = null;

    this.primitiveShader.destroy();

    this.complexPrimitiveShader.destroy();

    this.defaultShader.destroy();

    // this.fastShader.destroy();

    // this.stripShader.destroy();

    this.gl = null;
};

export { ShaderManager };