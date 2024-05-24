export function premultiplyTint(tint, alpha)
{
    if (alpha === 1.0)
    {
        return (alpha * 255 << 24) + tint._bgr;
    }
    if (alpha === 0.0)
    {
        return 0;
    }

    let R = ((tint.b * 255 * alpha) + 0.5) | 0;
    let G = ((tint.g * 255 * alpha) + 0.5) | 0;
    let B = ((tint.r * 255 * alpha) + 0.5) | 0;

    return (alpha * 255 << 24) + (R << 16) + (G << 8) + B;
}
