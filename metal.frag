
#ifdef GL_ES
precision mediump float;
#endif

#include "reflection.frag"

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec3 u_eye;
uniform vec3 u_centre3d;

varying vec4 v_position;
varying vec3 v_normal;
varying vec2 v_texcoord;

uniform sampler2D u_diffuse;
uniform sampler2D u_normal;
uniform sampler2D u_specular;
uniform sampler2D u_sphere;

vec3 light_position = vec3(0,5,10);
float ambient = 0.2;

float shinyness = 5.;

varying vec3 v_cameraPosition;

void main (void) {
    vec3 surfaceToLight = light_position - v_position.xyz;

    float diffuse_intensity = clamp(dot(normalize(surfaceToLight), v_normal), 0., 1.) + ambient;

    vec3 normal = normalize(v_normal + texture2D(u_normal, v_texcoord).xyz * 0.3);
    //normal = v_normal;

    vec3 reflectionVector = reflect(-surfaceToLight, normal);
    vec3 surfaceToCamera = (u_eye - u_centre3d) - v_position.xyz;

    float specular_amount = texture2D(u_specular, v_texcoord).x * 0.7;
    //float specular_amount = 0.5;
    float specular = pow(max(0., dot(normalize(surfaceToCamera), normalize(reflectionVector))), shinyness);
    specular = specular * specular_amount;
    //specular = 0.;

    float reflectionAmount = 0.5;
    vec3 reflectedColor = metalReflection(u_eye, v_position.xyz, normal, u_sphere) * reflectionAmount * specular_amount * 1./0.7;

    //vec3 diffuseColor = vec3(0.4, 0.3, 0.2);
    vec3 diffuseColor = texture2D(u_diffuse, v_texcoord).rgb;
    vec3 color = (diffuseColor) * diffuse_intensity
        + specular
        + reflectedColor;
        ;
    //vec3 color = vec3(0.3, 0.3, 0.3) + specular;

    gl_FragColor = vec4(color,1.0);
}
