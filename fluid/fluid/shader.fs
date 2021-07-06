#version 330 core
out vec4 FragColor;

in vec3 ourColor;
in vec2 TexCoord;

// texture samplers
uniform sampler2D tex;

void main() {
    FragColor = vec4(TexCoord.xy, 1, 1); // texture(tex, TexCoord);
}
