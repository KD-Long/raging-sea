
varying vec3 vDepthColor;
varying vec3 vSurfaceColor;
varying float vElevation;

varying float vColorOffset;
varying float vColorMultiplier;



void main(){
    vec3 color = mix(vDepthColor,vSurfaceColor,(vElevation+vColorOffset) * vColorMultiplier );
    gl_FragColor = vec4(color,1);

}