
varying vec2 vUv;

void main()
{

    
    //patern1
    // blue  vec4(0.0, 0.0, 1.0, 1.0);
    // cyan  vec4(0.0, 1.0, 1.0, 1.0);
    //white  vec4(1.0, 1.0, 1.0, 1.0);
    //purple vec4(1.0, 0.0, 1.0, 1.0);
    // gl_FragColor = vec4(strength, vUv.y, 1.0, 1.0);

    //patern 2
    // black   vec4(0.0, 0.0, 0.0, 1.0);
    // green   vec4(0.0, 1.0, 0.0, 1.0);
    // yellow  vec4(1.0, 1.0, 0.0, 1.0);
    // red     vec4(1.0, 0.0, 0.0, 1.0);
    // gl_FragColor = vec4(vUv.x, vUv.y, 0.0, 1.0);

    //patern3
    // black   vec4(0.0, 0.0, 0.0, 1.0);
    // white   vec4(1.0, 1.0, 1.0, 1.0);
    // gl_FragColor = vec4(vUv.x,vUv.x,vUv.x, 1.0);

    //patern4
    // float strength = vUv.y;
    
    //patern5
    // float strength = 1.0-vUv.y;
    
    //patern6
    // float strength = vUv.y*10.0;
    
    //patern7
    // float strength = mod(vUv.y*10.0, 1.0);
   
    //patern 8
    // float strength = mod(vUv.y*10.0, 1.0);
    // strength = step(0.5,strength);

    //patern 9
    // float strength = mod(vUv.y*10.0, 1.0);
    // strength = step(0.8,strength);
    
    //patern 10
    // float strength = mod(vUv.x*10.0, 1.0);
    // strength = step(0.8,strength);

    //patern 11  
    // float strength = step(0.8,mod(vUv.x*10.0, 1.0)) + step(0.8,mod(vUv.y*10.0, 1.0));

    //patern 12
    // float strength = step(0.8,mod(vUv.x*10.0, 1.0)) - step(0.2,mod(vUv.y*10.0, 1.0));
    // float strength = step(0.8,mod(vUv.x*10.0, 1.0)) * step(0.8,mod(vUv.y*10.0, 1.0));

    //patern 13
    //float strength = step(0.2,mod(vUv.x*10.0, 1.0)) * step(0.8,mod(vUv.y*10.0, 1.0));
    
    // //patern 15
    // float strength = step(0.2,mod(vUv.x*10.0, 1.0)) * step(0.8,mod(vUv.y*10.0+0.3, 1.0));
    // strength += step(0.8,mod(vUv.x*10.0+0.3, 1.0)) * step(0.2,mod(vUv.y*10.0, 1.0));

    //patern 16
    // float strength = abs(vUv.x-.5);

    //patern 17 
    // float strength = min(abs(vUv.x-.5) , abs(vUv.y-.5));

    //patern 18
    // float strength = max(abs(vUv.x-.5) , abs(vUv.y-.5));
    

    float strength = vUv.x;
    


    gl_FragColor = vec4(strength,strength,strength, 1.0);
}