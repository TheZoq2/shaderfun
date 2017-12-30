#ifdef GL_ES
precision mediump float;
#endif

uniform mat4 u_modelMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_projectionMatrix;
uniform mat4 u_modelViewProjectionMatrix;
uniform mat3 u_normalMatrix;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec2 a_texcoord;

varying vec4 v_position;
varying vec3 v_normal;
varying vec2 v_texcoord;

varying vec3 v_cameraPosition;

void main(void) {
    //gl_Position = u_modelViewProjectionMatrix * a_position;
    gl_Position = u_projectionMatrix * u_viewMatrix * u_modelMatrix * a_position;

    v_position = u_modelMatrix * a_position;

    v_cameraPosition = (u_viewMatrix * u_modelMatrix)[3].xyz;

    v_normal = a_normal;
    v_texcoord = a_texcoord;
}
