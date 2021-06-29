
AFRAME.registerComponent("gltf-material-override", {
    schema: {
        opacity: { type: "number", default: 1 },
        color: { type: "color", default: "#ff0" },
        emissive: { type: "color", default: "#fff" },
        emissiveIntensity: { type: "number", default: 0 },
        metalness: { type: "number", default: 0.95 },
        roughness: { type: "number", default: 0.5 },
        src: { type: 'map', default: '' },
        envMap: { type: 'map', default: '' },
        sphericalEnvMap: { type: 'map', default: '' },
        alphaTest: { type: 'number', default: 0.5 },
        fog: { type: 'boolean', default: true },
        depthTest: { type: 'boolean', default: true },
        transparent: { type: 'boolean', default: false },
        wireframe: { type: 'boolean', default: false },
        blending: { type: "string", default: 'normal', oneOf: ['none', 'normal', 'additive', 'subtractive', 'multiply'] },
        shader: { type: 'string', default: 'standard', oneOf: ['standard', 'flat'] },
        side: { type: 'string', default: 'front', oneOf: ['front', 'back', 'double'] },
        flipTextureY: { type: 'boolean', default: false },
        flipTextureX: { type: 'boolean', default: false }
    },
    init: function() {
        this.el.addEventListener("model-loaded", this.update.bind(this));
    },
    update: function() {
        var mesh = this.el.getObject3D("mesh");
        var data = this.data;
        if (!mesh) {
            return;
        }
        mesh.traverse(function(node) {
            if (node.isMesh) {
                console.log(node);
                node.material.opacity = data.opacity;
                node.material.color = new THREE.Color(data.color);
                node.material.emissive = new THREE.Color(data.emissive);
                node.material.emissiveIntensity = data.emissiveIntensity;
                node.material.metalness = data.metalness;
                node.material.roughness = data.roughness;
                node.material.src = data.src;
                node.material.envMap = data.envMap;
                node.material.sphericalEnvMap = data.sphericalEnvMap;
                node.material.alphaTest = data.alphaTest;
                node.material.fog = data.fog;
                node.material.depthTest = data.depthTest;
                node.material.transparent = data.transparent < 1.0;
                // node.material.shader = data.shader;
                node.material.side = data.side;
                node.material.flipTextureX = data.flipTextureX;
                node.material.flipTextureY = data.flipTextureY;
                node.material.blending = parseBlending(data.blending);
                node.material.needsUpdate = true;

            }
        });
    }
});

function parseBlending(blending) {
    switch (blending) {
        case 'none':
            {
                return THREE.NoBlending;
            }
        case 'additive':
            {
                return THREE.AdditiveBlending;
            }
        case 'subtractive':
            {
                return THREE.SubtractiveBlending;
            }
        case 'multiply':
            {
                return THREE.MultiplyBlending;
            }
        default:
            {
                return THREE.NormalBlending;
            }
    }
}