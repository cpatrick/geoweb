//////////////////////////////////////////////////////////////////////////////
///
/// TODO: Move it somewhere else
///
//////////////////////////////////////////////////////////////////////////////

/// NOTE Refer JavaScript patterns
function inherit(C, P) {
  var F = function () {};
  F.prototype = P.prototype;
  C.prototype = new F();
  C.uber = P.prototype;
  C.prototype.constructor = C;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

//////////////////////////////////////////////////////////////////////////////
//
// Data types
//
//////////////////////////////////////////////////////////////////////////////
var vglVertexAttributeKeys =
{
  "Position"            : 0,
  "Normal"              : 1,
  "TextureCoordinate"   : 2,
  "Color"               : 3,
  "Scalar"              : 4
};

var vglDataType =
{
  "Float"       : gl.FLOAT,
  "FloatVec2"   : gl.FLOAT_VEC2,
  "FloatVec3"   : gl.FLOAT_VEC3,
  "FloatVec4"   : gl.FLOAT_VEC4,
  "Int"         : gl.INT,
  "IntVec2"     : gl.INT_VEC2,
  "IntVec3"     : gl.INT_VEC3,
  "IntVec4"     : gl.INT_VEC4,
  "Bool"        : gl.BOOL,
  "BoolVec2"    : gl.BOOL_VEC2,
  "BoolVec3"    : gl.BOOL_VEC3,
  "BoolVec4"    : gl.BOOL_VEC4,
  "FloatMat2"   : gl.FLOAT_MAT2,
  "FloatMat3"  : gl.FLOAT_MAT3,
  "FloatMat4"   : gl.FLOAT_MAT4,
  "Sampler1D"   : gl.SAMPLER_1D,
  "Sampler2D"   : gl.SAMPLER_2D,
  "Sampler3D"   : gl.SAMPLER_3D,
  "SamplerCube" : gl.SAMPLER_CUBE,

  "Sampler1DShadow" : gl.SAMPLER_1D_SHADOW,
  "Sampler2DShadow" : gl.SAMPLER_2D_SHADOW,

  "Undefined" : 0x0
}

var vglPrimitiveRenderType =
{
  "Points"        : gl.POINTS,
  "LineStrip"     : gl.LINE_STRIP,
  "LineLoop"      : gl.LINE_LOOP,
  "Lines"         : gl.LINES,
  "TriangleStrip" : gl.TRIANGLE_STRIP,
  "TriangleFan"   : gl.TRIANGLE_FAN,
  "Triangles"     : gl.TRIANGLES
};

var vesPrimitiveIndicesValueType =
{
  "UnsignedShort" : gl.UNSIGNED_SHORT,
  "UnsignedInt" : gl.UNSIGNED_INT
};

//////////////////////////////////////////////////////////////////////////////
//
// vglPrimitive
//
//////////////////////////////////////////////////////////////////////////////

function vglPrimitive()
{
  this.m_indexCount = 0;
  this.m_primitiveType = 0;
  this.m_indicesValueType = 0;
  this.m_indices = 0;
}

/// Data
vglPrimitive.prototype.indices = function()
{
  return this.m_indices;
}

///
vglPrimitive.prototype.createIndices = function(type)
{
  // TODO Check for the type
  this.m_indices = new Uint16Array();
}

/// Return the number of indices
vglPrimitive.prototype.numberOfIndices = function()
{
  return this.m_indices.length;
}

/// Return size of indices in bytes
vglPrimitive.prototype.sizeInBytes = function()
{
  return this.m_indices.length * Uint16Array.BYTES_PER_ELEMENT;
}

/// Return primitive type
vglPrimitive.prototype.primitiveType = function()
{
  return this.m_primitiveType;
}
/// Set primitive type
vglPrimitive.prototype.setPrimitiveType = function(type)
{
  this.m_primitiveType = type;
}

///
vglPrimitive.prototype.indexCount = function()
{
  return this.m_indexCount;
}

/// Return indices value type
vglPrimitive.prototype.indicesValueType = function()
{
  return this.m_indicesValueType;
}
/// Set indices value type
vglPrimitive.prototype.setIndicesValueType = function(type)
{
  this.m_indicesValueType  = type;
}

/// Set indices from a array
vglPrimitive.prototype.setIndices = function(indicesArray)
{
  // TODO Check for the type
  this.m_indices = new Uint16Array(indicesArray);
}

/// Set index count (how many indices form a primitive)
vglPrimitive.prototype.setIndexCount = function(count)
{
  this.m_indexCount = count;
}

//////////////////////////////////////////////////////////////////////////////
//
// vglTriangleStrip
//
//////////////////////////////////////////////////////////////////////////////

function vglTriangleStrip()
{
  this.setPrimitiveType(vglPrimitiveRenderType.TriangleStrip);
  this.setIndicesValueType(vesPrimitiveIndicesValueType.UnsignedShort);
  this.setIndexCount(3);
}

inherit(vglTriangleStrip, vglPrimitive);

//////////////////////////////////////////////////////////////////////////////
//
// vglVertexData
//
//////////////////////////////////////////////////////////////////////////////

function vglVertexDataP3f()
{
    this.m_position = [];
}

function vglVertexDataP3N3f()
{
    this.m_position = [];
    this.m_normal = [];
}

function vglVertexDataP3T3f()
{
    this.m_position = [];
    this.m_texCoordinate = [];
}

//////////////////////////////////////////////////////////////////////////////
//
// vglSourceData
//
//////////////////////////////////////////////////////////////////////////////

function vglSourceData()
{
  ////////////////////////////////////////////////////////////////////////////
  function vglAttributeData()
  {
    /// Number of components per group
    this.m_numberOfComponents = 0;

    /// Type of data type (GL_FLOAT etc)
    this.m_dataType = 0;

    /// Size of data type
    this.m_dataTypeSize = 0;

    /// Specifies whether fixed-point data values should be normalized
    /// (true) or converted directly as fixed-point values (false)
    /// when they are accessed.
    this.m_normalized = false;

    /// Strides for each attribute.
    this.m_stride = 0;

    /// Offset
    this.m_offset = 0;
  }

  /// Return data
  this.data = function()
  {
    console.log(this.m_data);
    this.m_glData = new Float32Array(this.m_data);
    return this.m_glData;
  }

  ///
  this.addAttribute = function(key, dataType, sizeOfDataType, offset, stride,
                               noOfComponents, normalized)
  {
    if ( (key in this.m_attributesMap) == false )
    {
      var newAttr = new vglAttributeData();
      newAttr.m_dataType = dataType;
      newAttr.m_dataTypeSize = sizeOfDataType;
      newAttr.m_offset = offset;
      newAttr.m_stride = stride;
      newAttr.m_numberOfComponents  = noOfComponents;
      newAttr.m_normalized = normalized;

      this.m_attributesMap[key] = newAttr;
    }
  }

  /// Return size of the data
  this.sizeOfArray = function()
  {
    return Object.size(this.m_data);
  }

  /// Return size of the data in bytes
  this.sizeInByes = function()
  {
    var sizeInBytes = 0;
    var keys = this.keys();

    for (var i = 0; i < keys.length(); ++i)
    {
      sizeInBytes += this.numberOfComponents(keys[i]) *
                       this.sizeOfAttributeDataType(keys[i]);
    }

    sizeInBytes *= this.sizeOfArray();

    return sizeInBytes;
  }

  /// Check if there is attribute exists of a given key type
  this.hasKey = function(key)
  {
    return (key in this.m_attributesMap);
  }
  /// Return keys of all attributes
  this.keys = function()
  {
    return Object.keys(this.m_attributesMap);
  }

  ///
  this.numberOfAttributes = function()
  {
    return Object.size(this.m_attributesMap);
  }

  ///
  this.numberOfComponents = function(key)
  {
    if (key in this.m_attributesMap)
    {
      return this.m_attributesMap[key].m_numberOfComponents;
    }

    return 0;
  }

  ///
  this.isAttributeNormalized = function(key)
  {
    if (key in this.m_attributesMap)
    {
      return this.m_attributesMap[key];
    }

    return false;
  }

  ///
  this.sizeOfAttributeDataType = function(key)
  {
    if (key in this.m_attributesMap)
    {
      return this.m_attributesMap[key].m_dataTypeSize;
    }

    return 0;
  }

  ///
  this.attributeDataType = function(key)
  {
    if (key in this.m_attributesMap)
    {
      return this.m_attributesMap[key].m_dataType;
    }

    return vglDataType.Undefined;
  }

  ///
  this.attributeOffset = function(key)
  {
    if (key in this.m_attributesMap)
    {
      return this.m_attributesMap[key].m_offset;
    }

    return 0;
  }

  ///
  this.attributeStride = function(key)
  {
    if (key in this.m_attributesMap)
    {
      return this.m_attributesMap[key].m_stride;
    }

    return 0;
  }

  ///
  this.pushBack = function(value)
  {
    // TODO FIX this
    this.m_data = this.m_data.concat(value.m_position);
    this.m_data = this.m_data.concat(value.m_texCoordinate);
  }

 this.m_attributesMap = {};
 this.m_data = [];
 this.m_glData = 0;
}

//////////////////////////////////////////////////////////////////////////////
//
// vglGeometryData
//
//////////////////////////////////////////////////////////////////////////////

function vglGeometryData()
{
    this.m_name = "";
    this.m_primitives = [];
    this.m_sources = [];
    this.m_bounds = [];
    this.m_computeBounds = true;

    /// Return ID of the geometry data
    this.name = function()
    {
      return this.m_name;
    }
    /// Set name of the geometry data
    this.setName = function(name)
    {
      this.m_name = name;
    }

    /// Add new source
    this.addSource = function(source)
    {
      // TODO Check if the incoming source has duplicate keys

      // NOTE This might not work on IE8 or lower
      if (this.m_sources.indexOf(source) == -1)
      {
        this.m_sources.push(source);
        return true;
      }

      return false;
    }
    /// Return source for a given index. Returns 0 if not found.
    this.source = function(index)
    {
      if (index < this.m_sources.length)
      {
        return this.m_sources[index];
      }

      return 0;
    }
    /// Return number of sources
    this.numberOfSources = function()
    {
      return this.m_sources.length;
    }

    /// Add new primitive
    this.addPrimitive = function(primitive)
    {
      if (this.m_primitives.indexOf(primitive) == -1)
      {
        this.m_primitives.push(primitive);
        return true;
      }

      return false;
    }
    /// Return primitive for a given index. Returns 0 if not found.
    this.primitive = function(index)
    {
      if (index < this.m_primitives.length)
      {
        return this.m_primitives[index];
      }

      return 0;
    }
    /// Return number of primitives
    this.numberOfPrimitives = function()
    {
      return this.m_primitives.length;
    }

    /// Return bounds [minX, maxX, minY, maxY, minZ, maxZ]
    this.bounds = function()
    {
      return this.m_bounds;
    }
    /// Set bounds
    this.setBounds = function(minX, maxX, minY, maxY, minZ, maxZ)
    {
      this.m_bounds[0] = minX;
      this.m_bounds[1] = maxX;
      this.m_bounds[2] = minY;
      this.m_bounds[3] = maxY;
      this.m_bounds[4] = minZ;
      this.m_bounds[5] = maxZ;
    }
}