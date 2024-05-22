import { device } from '../../utils/Device.js';
window.device = device;

export function canUploadSameBuffer() {
    // // Uploading the same buffer multiple times in a single frame can cause perf issues.
    // // Apparent on IOS so only check for that at the moment
    // // this check may become more complex if this issue pops up elsewhere.
    // const ios = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    return !device.apple.device || (device.os.version.major > 10);
}
// alert(JSON.stringify(device))
// alert(!device.apple.device || (device.os.version.major > 11))

export function maxRecommendedTextures(max) {
    if (device.tablet || device.phone) {
        if (device.os.version.major < 11) {
            // check if the res is iphone 6 or higher..
            return 8; // 4
        }
    }

    // desktop should be ok
    return max;
}
