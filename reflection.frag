vec4 bluredSample(sampler2D tex, vec2 coord, float sampleStep, int sampleAmount) {
    vec4 sum = vec4(0., 0., 0., 0.);

    for(int x = -sampleAmount; x < sampleAmount; ++x) {
        for(int y = -sampleAmount; y < sampleAmount; ++y) {
            vec2 samplePoint = vec2(x, y)*sampleStep + coord;
            sum += texture2D(tex, samplePoint);
        }
    }

    return sum / pow(float(sampleAmount*2), 2.);
}

vec2 spheremapReflection(vec3 surfaceToCamera, vec3 vertexPos, vec3 normal) {
    // Reflected surface-to-camera vector
    vec3 reflection = normalize(reflect(-surfaceToCamera, normal));

    float yReflectionAngle = atan(reflection.z, reflection.x);

    float zReflectionAngle = acos(reflection.y);
    float zReflect = cos(zReflectionAngle);

    float uReflection = yReflectionAngle / (3.1415*2.);
    float vReflection = (zReflect + 1.) / 2.;

    return vec2(uReflection, vReflection);
}

vec3 metalReflection(vec3 cameraPos, vec3 vertexPos, vec3 normal, sampler2D tex) {
    // Vector from the surface of the object to the camera
    vec3 surfaceToCamera = normalize(cameraPos - vertexPos);

    vec2 reflectionCoords = spheremapReflection(surfaceToCamera, vertexPos, normal);

    vec3 color = bluredSample(tex, reflectionCoords, 0.01, 4).rgb;

    return color;
}

vec3 mirror(vec3 cameraPos, vec3 vertexPos, vec3 normal, sampler2D tex) {
    // Vector from the surface of the object to the camera
    vec3 surfaceToCamera = normalize(cameraPos - vertexPos);

    vec2 reflectionCoords = spheremapReflection(surfaceToCamera, vertexPos, normal);

    vec3 color = texture2D(tex, reflectionCoords).rgb;

    return color;

}


//void main (void) {
//    vec3 color = metalReflection(u_eye, v_position.xyz, v_normal, u_tex0);
//
//    gl_FragColor = vec4(color,1.0);
//}
